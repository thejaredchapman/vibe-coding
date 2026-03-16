import { Request, Response, NextFunction } from 'express';
import { decode } from '@googlemaps/polyline-codec';
import prisma from '../lib/prisma';
import { tripPlanSchema, multiStopTripPlanSchema } from '../lib/validation';
import { AppError } from '../middleware/errorHandler';

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY || '';
const EARTH_RADIUS_MILES = 3958.8;

function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(a));
}

export async function planTrip(req: Request, res: Response, next: NextFunction) {
  try {
    const params = tripPlanSchema.parse(req.query);

    if (!GOOGLE_MAPS_KEY) {
      throw new AppError(500, 'GOOGLE_MAPS_KEY_MISSING', 'Google Maps API key not configured');
    }

    // Fetch start and end cities
    const [startCity, endCity] = await Promise.all([
      prisma.city.findUnique({ where: { id: params.startCityId } }),
      prisma.city.findUnique({ where: { id: params.endCityId } }),
    ]);

    if (!startCity) throw new AppError(404, 'START_CITY_NOT_FOUND', 'Start city not found');
    if (!endCity) throw new AppError(404, 'END_CITY_NOT_FOUND', 'End city not found');

    // Call Google Directions API
    const directionsUrl = new URL('https://maps.googleapis.com/maps/api/directions/json');
    directionsUrl.searchParams.set('origin', `${startCity.lat},${startCity.lng}`);
    directionsUrl.searchParams.set('destination', `${endCity.lat},${endCity.lng}`);
    directionsUrl.searchParams.set('key', GOOGLE_MAPS_KEY);

    const directionsRes = await fetch(directionsUrl.toString());
    const directionsData = await directionsRes.json();

    if (directionsData.status !== 'OK' || !directionsData.routes?.length) {
      throw new AppError(502, 'DIRECTIONS_FAILED', `Google Directions API error: ${directionsData.status}`);
    }

    const googleRoute = directionsData.routes[0];
    const leg = googleRoute.legs[0];

    // Decode polyline
    const decodedPoints = decode(googleRoute.overview_polyline.points);
    const polyline = decodedPoints.map(([lat, lng]: [number, number]) => ({ lat, lng }));

    // Sample every 10th point for distance calculations
    const sampledPoints = polyline.filter((_: any, i: number) => i % 10 === 0);
    if (sampledPoints.length === 0 && polyline.length > 0) {
      sampledPoints.push(polyline[0]);
    }

    // Fetch all cities from database
    const allCities = await prisma.city.findMany({
      include: {
        _count: {
          select: {
            hotels: true,
            restaurants: true,
            dogParks: true,
          },
        },
      },
    });

    // For each city, compute minimum distance to route and closest route position
    const citiesAlongRoute = allCities
      .filter((c) => c.id !== params.startCityId && c.id !== params.endCityId)
      .map((city) => {
        let minDist = Infinity;
        let closestIdx = 0;

        sampledPoints.forEach((pt: { lat: number; lng: number }, idx: number) => {
          const dist = haversineDistance(city.lat, city.lng, pt.lat, pt.lng);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        });

        return {
          city: {
            id: city.id,
            name: city.name,
            state: city.state,
            lat: city.lat,
            lng: city.lng,
            dogFriendlinessScore: city.dogFriendlinessScore,
            region: city.region,
          },
          distanceFromRoute: Math.round(minDist * 10) / 10,
          routePosition: sampledPoints.length > 1 ? closestIdx / (sampledPoints.length - 1) : 0.5,
          hotelCount: city._count.hotels,
          restaurantCount: city._count.restaurants,
          dogParkCount: city._count.dogParks,
        };
      })
      .filter((c) => c.distanceFromRoute <= params.radius)
      .sort((a, b) => a.routePosition - b.routePosition);

    res.json({
      route: {
        distanceMiles: Math.round(leg.distance.value / 1609.34),
        durationHours: Math.round((leg.duration.value / 3600) * 10) / 10,
        polyline,
        startCity: {
          id: startCity.id,
          name: startCity.name,
          state: startCity.state,
          lat: startCity.lat,
          lng: startCity.lng,
        },
        endCity: {
          id: endCity.id,
          name: endCity.name,
          state: endCity.state,
          lat: endCity.lat,
          lng: endCity.lng,
        },
      },
      suggestedStops: citiesAlongRoute,
    });
  } catch (err) {
    next(err);
  }
}

export async function planMultiStopTrip(req: Request, res: Response, next: NextFunction) {
  try {
    const params = multiStopTripPlanSchema.parse(req.query);
    const cityIds = params.cityIds.split(',').map((id) => id.trim()).filter(Boolean);

    if (cityIds.length < 2) {
      throw new AppError(400, 'INSUFFICIENT_CITIES', 'At least 2 cities are required');
    }

    if (!GOOGLE_MAPS_KEY) {
      throw new AppError(500, 'GOOGLE_MAPS_KEY_MISSING', 'Google Maps API key not configured');
    }

    // Fetch all requested cities
    const cities = await prisma.city.findMany({
      where: { id: { in: cityIds } },
    });

    // Maintain order from the query param
    const orderedCities = cityIds
      .map((id) => cities.find((c) => c.id === id))
      .filter(Boolean) as typeof cities;

    if (orderedCities.length < 2) {
      throw new AppError(404, 'CITIES_NOT_FOUND', 'Some cities were not found');
    }

    // Build waypoints for Google Directions (intermediate cities)
    const origin = orderedCities[0];
    const destination = orderedCities[orderedCities.length - 1];
    const waypoints = orderedCities.slice(1, -1);

    const directionsUrl = new URL('https://maps.googleapis.com/maps/api/directions/json');
    directionsUrl.searchParams.set('origin', `${origin.lat},${origin.lng}`);
    directionsUrl.searchParams.set('destination', `${destination.lat},${destination.lng}`);
    if (waypoints.length > 0) {
      directionsUrl.searchParams.set('waypoints', waypoints.map((w) => `${w.lat},${w.lng}`).join('|'));
    }
    directionsUrl.searchParams.set('key', GOOGLE_MAPS_KEY);

    const directionsRes = await fetch(directionsUrl.toString());
    const directionsData = await directionsRes.json();

    if (directionsData.status !== 'OK' || !directionsData.routes?.length) {
      throw new AppError(502, 'DIRECTIONS_FAILED', `Google Directions API error: ${directionsData.status}`);
    }

    const googleRoute = directionsData.routes[0];

    // Process each leg
    const legs = googleRoute.legs.map((leg: any, i: number) => {
      const legPolyline = decode(leg.steps.map((s: any) => s.polyline.points).join('')).map(
        ([lat, lng]: [number, number]) => ({ lat, lng })
      );

      return {
        startCity: {
          id: orderedCities[i].id,
          name: orderedCities[i].name,
          state: orderedCities[i].state,
          lat: orderedCities[i].lat,
          lng: orderedCities[i].lng,
        },
        endCity: {
          id: orderedCities[i + 1].id,
          name: orderedCities[i + 1].name,
          state: orderedCities[i + 1].state,
          lat: orderedCities[i + 1].lat,
          lng: orderedCities[i + 1].lng,
        },
        distanceMiles: Math.round(leg.distance.value / 1609.34),
        durationHours: Math.round((leg.duration.value / 3600) * 10) / 10,
        polyline: legPolyline,
      };
    });

    // Decode full overview polyline for stop suggestions
    const fullPolyline = decode(googleRoute.overview_polyline.points).map(
      ([lat, lng]: [number, number]) => ({ lat, lng })
    );
    const sampledPoints = fullPolyline.filter((_: any, i: number) => i % 10 === 0);

    // Fetch all cities to find suggested stops
    const allCities = await prisma.city.findMany({
      include: {
        _count: { select: { hotels: true, restaurants: true, dogParks: true } },
      },
    });

    const excludeIds = new Set(cityIds);
    const citiesAlongRoute = allCities
      .filter((c) => !excludeIds.has(c.id))
      .map((city) => {
        let minDist = Infinity;
        let closestIdx = 0;
        let closestLegIdx = 0;

        // Find closest point on the full polyline
        sampledPoints.forEach((pt: { lat: number; lng: number }, idx: number) => {
          const dist = haversineDistance(city.lat, city.lng, pt.lat, pt.lng);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        });

        // Determine which leg this point belongs to
        let cumulativePoints = 0;
        for (let i = 0; i < legs.length; i++) {
          cumulativePoints += Math.ceil(legs[i].polyline.length / 10);
          if (closestIdx <= cumulativePoints) {
            closestLegIdx = i;
            break;
          }
        }

        return {
          city: {
            id: city.id,
            name: city.name,
            state: city.state,
            lat: city.lat,
            lng: city.lng,
            dogFriendlinessScore: city.dogFriendlinessScore,
            region: city.region,
          },
          distanceFromRoute: Math.round(minDist * 10) / 10,
          routePosition: sampledPoints.length > 1 ? closestIdx / (sampledPoints.length - 1) : 0.5,
          hotelCount: city._count.hotels,
          restaurantCount: city._count.restaurants,
          dogParkCount: city._count.dogParks,
          legIndex: closestLegIdx,
        };
      })
      .filter((c) => c.distanceFromRoute <= params.radius)
      .sort((a, b) => a.routePosition - b.routePosition);

    const totalDistanceMiles = legs.reduce((sum: number, l: any) => sum + l.distanceMiles, 0);
    const totalDurationHours = Math.round(legs.reduce((sum: number, l: any) => sum + l.durationHours, 0) * 10) / 10;

    res.json({
      legs,
      totalDistanceMiles,
      totalDurationHours,
      suggestedStops: citiesAlongRoute,
    });
  } catch (err) {
    next(err);
  }
}
