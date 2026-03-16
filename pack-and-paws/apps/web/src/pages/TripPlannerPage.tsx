import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, PawPrint, Route, Plus, Check } from 'lucide-react';
import { Map, Marker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useCities, useTripPlan } from '../hooks/useQueries';
import CityPicker from '../components/CityPicker';
import TripStopCard from '../components/TripStopCard';
import LoadingSpinner from '../components/LoadingSpinner';
import MapPolyline from '../components/MapPolyline';
import SelectedStopsList from '../components/trip/SelectedStopsList';
import { useTripPlannerStore } from '../stores/tripPlannerStore';

function FitBoundsHelper({ tripData }: { tripData: any }) {
  const map = useMap();
  const lastKey = useRef('');

  if (!map || !tripData?.route) return null;

  const key = `${tripData.route.startCity.id}-${tripData.route.endCity.id}`;
  if (lastKey.current !== key) {
    lastKey.current = key;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: tripData.route.startCity.lat, lng: tripData.route.startCity.lng });
    bounds.extend({ lat: tripData.route.endCity.lat, lng: tripData.route.endCity.lng });
    tripData.suggestedStops?.forEach((stop: any) => {
      bounds.extend({ lat: stop.city.lat, lng: stop.city.lng });
    });
    map.fitBounds(bounds, 60);
  }

  return null;
}

export default function TripPlannerPage() {
  const [startCityId, setStartCityId] = useState('');
  const [endCityId, setEndCityId] = useState('');
  const [radius, setRadius] = useState(50);
  const [selectedStop, setSelectedStop] = useState<any>(null);

  const { data: citiesData } = useCities();
  const { data: tripData, isLoading: tripLoading, isError } = useTripPlan(startCityId, endCityId, radius);
  const { selectedStops, addStop } = useTripPlannerStore();

  const cities = citiesData?.data || [];
  const bothSelected = startCityId && endCityId;

  const selectedCityIds = new Set(selectedStops.map((s) => s.cityId));

  const handleAddStop = (stop: any) => {
    addStop({
      cityId: stop.city.id,
      cityName: stop.city.name,
      state: stop.city.state,
      lat: stop.city.lat,
      lng: stop.city.lng,
      dogFriendlinessScore: stop.city.dogFriendlinessScore,
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header + Controls */}
      <div className="bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-terracotta-100">
              <Route className="h-6 w-6 text-terracotta-600" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-800">Plan Your Road Trip Adventure</h1>
              <p className="text-sm text-slate-500">Pick start & end cities to discover dog-friendly stops along the way</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Start City</label>
              <CityPicker
                cities={cities}
                value={startCityId}
                onChange={setStartCityId}
                placeholder="Select departure city..."
                excludeId={endCityId}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">End City</label>
              <CityPicker
                cities={cities}
                value={endCityId}
                onChange={setEndCityId}
                placeholder="Select destination city..."
                excludeId={startCityId}
              />
            </div>
            <div className="min-w-[180px]">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Search Radius: {radius} mi
              </label>
              <input
                type="range"
                min={10}
                max={150}
                step={5}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-forest-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>10 mi</span>
                <span>150 mi</span>
              </div>
            </div>
          </div>

          {/* Trip stats */}
          {tripData?.route && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-6 mt-4 text-sm text-slate-600"
            >
              <span className="flex items-center gap-1.5">
                <Car className="h-4 w-4 text-forest-600" />
                {tripData.route.distanceMiles} miles
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-600" />
                {tripData.route.durationHours} hours
              </span>
              <span className="flex items-center gap-1.5">
                <PawPrint className="h-4 w-4 text-terracotta-500" />
                {tripData.suggestedStops?.length || 0} dog-friendly stops
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="h-[400px] md:h-[500px] relative">
        <Map
          defaultCenter={{ lat: 39.5, lng: -98.35 }}
          defaultZoom={4}
          style={{ width: '100%', height: '100%' }}
          disableDefaultUI={false}
          gestureHandling="greedy"
        >
          {/* Route polyline */}
          {tripData?.route?.polyline && (
            <MapPolyline
              path={tripData.route.polyline}
              strokeColor="#3b82f6"
              strokeWeight={4}
              strokeOpacity={0.8}
            />
          )}

          {/* Start marker */}
          {tripData?.route?.startCity && (
            <Marker
              position={{ lat: tripData.route.startCity.lat, lng: tripData.route.startCity.lng }}
              title={`Start: ${tripData.route.startCity.name}`}
            />
          )}

          {/* End marker */}
          {tripData?.route?.endCity && (
            <Marker
              position={{ lat: tripData.route.endCity.lat, lng: tripData.route.endCity.lng }}
              title={`End: ${tripData.route.endCity.name}`}
            />
          )}

          {/* Suggested stop markers */}
          {tripData?.suggestedStops?.map((stop: any) => (
            <Marker
              key={stop.city.id}
              position={{ lat: stop.city.lat, lng: stop.city.lng }}
              onClick={() => setSelectedStop(stop)}
              title={stop.city.name}
            />
          ))}

          {selectedStop && (
            <InfoWindow
              position={{ lat: selectedStop.city.lat, lng: selectedStop.city.lng }}
              onCloseClick={() => setSelectedStop(null)}
            >
              <div style={{ padding: '4px', maxWidth: '200px' }}>
                <strong style={{ fontSize: '14px' }}>{selectedStop.city.name}, {selectedStop.city.state}</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  Dog Score: {selectedStop.city.dogFriendlinessScore}/10
                </div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                  {selectedStop.distanceFromRoute} mi from route
                </div>
                <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>
                  {selectedStop.hotelCount} hotels · {selectedStop.restaurantCount} restaurants · {selectedStop.dogParkCount} dog parks
                </div>
              </div>
            </InfoWindow>
          )}

          {/* Fit bounds when trip loads */}
          <FitBoundsHelper tripData={tripData} />
        </Map>

        {/* Loading overlay */}
        {tripLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <LoadingSpinner message="Sniffing out the best route..." />
          </div>
        )}
      </div>

      {/* Content: Stops + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!bothSelected ? (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block"
            >
              <PawPrint className="h-16 w-16 text-sand-300 mx-auto mb-4" />
              <h2 className="font-display text-xl font-bold text-slate-700 mb-2">
                Where's your pack heading?
              </h2>
              <p className="text-slate-500 max-w-md mx-auto">
                Pick a start and end city above to discover dog-friendly stops along your route.
                We'll find the best places for your four-legged co-pilot!
              </p>
            </motion.div>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-slate-500">Could not plan this route. Please try different cities.</p>
          </div>
        ) : tripData?.suggestedStops?.length > 0 ? (
          <div className="flex gap-8">
            {/* Main: Suggested stops */}
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-xl font-bold text-slate-800 mb-5">
                Suggested Stops Along Your Route
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tripData.suggestedStops.map((stop: any, i: number) => (
                  <motion.div
                    key={stop.city.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative"
                  >
                    <TripStopCard stop={stop} index={i} />
                    {/* Add Stop button */}
                    <button
                      onClick={() => handleAddStop(stop)}
                      disabled={selectedCityIds.has(stop.city.id)}
                      className={`absolute top-2 right-2 p-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedCityIds.has(stop.city.id)
                          ? 'bg-forest-500 text-white cursor-default'
                          : 'bg-white/90 text-forest-700 hover:bg-forest-50 shadow-sm border border-sand-200'
                      }`}
                    >
                      {selectedCityIds.has(stop.city.id) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar: Selected stops */}
            <div className="w-72 shrink-0 hidden lg:block">
              <div className="sticky top-20">
                <SelectedStopsList />
              </div>
            </div>
          </div>
        ) : tripData && !tripLoading ? (
          <div className="text-center py-12">
            <PawPrint className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No dog-friendly stops found within {radius} miles of this route. Try increasing the search radius!</p>
          </div>
        ) : null}

        {/* Mobile selected stops (below the grid on small screens) */}
        {bothSelected && selectedStops.length > 0 && (
          <div className="lg:hidden mt-8">
            <SelectedStopsList />
          </div>
        )}
      </div>
    </div>
  );
}
