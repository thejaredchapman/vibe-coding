import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, Clock, MapPin, Car, ChevronRight, PawPrint, X,
} from 'lucide-react';
import { Map, Marker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useRoutes, useRouteDetail } from '../hooks/useQueries';
import LoadingSpinner from '../components/LoadingSpinner';
import MapPolyline from '../components/MapPolyline';
import { DIFFICULTY_COLORS } from '../lib/constants';

const routeColors = [
  '#e36d4a', '#3a8068', '#f59e0b', '#6366f1',
  '#ec4899', '#14b8a6', '#f97316', '#8b5cf6',
];

function FitBoundsHelper({ waypoints }: { waypoints: any[] }) {
  const map = useMap();
  if (map && waypoints?.length) {
    const bounds = new google.maps.LatLngBounds();
    waypoints.forEach((wp: any) => bounds.extend({ lat: wp.lat, lng: wp.lng }));
    map.fitBounds(bounds, 80);
  }
  return null;
}

export default function RouteExplorerPage() {
  const { data: routesData, isLoading } = useRoutes();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const { data: routeDetail } = useRouteDetail(selectedRouteId || '');
  const [selectedWaypoint, setSelectedWaypoint] = useState<any>(null);

  const routes = routesData?.data || [];

  const handleRouteSelect = useCallback((routeId: string) => {
    const newId = selectedRouteId === routeId ? null : routeId;
    setSelectedRouteId(newId);
    setSelectedWaypoint(null);
  }, [selectedRouteId]);

  if (isLoading) return <LoadingSpinner message="Mapping out adventures..." />;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="lg:w-[420px] overflow-y-auto border-r border-sand-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50">
              <Compass className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Route Explorer</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{routes.length} scenic dog-friendly road trips</p>
            </div>
          </div>

          {/* Route List */}
          <div className="space-y-3">
            {routes.map((route: any, idx: number) => (
              <motion.button
                key={route.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleRouteSelect(route.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedRouteId === route.id
                    ? 'border-forest-500 bg-forest-50 dark:bg-forest-900/30 shadow-md'
                    : 'border-sand-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-sand-300 dark:hover:border-slate-600 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: routeColors[idx % routeColors.length] }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-slate-800 dark:text-white text-sm">{route.name}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Car className="h-3 w-3" /> {route.totalMiles} mi
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {route.estimatedDays} days
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        DIFFICULTY_COLORS[route.difficulty as keyof typeof DIFFICULTY_COLORS] || DIFFICULTY_COLORS.moderate
                      }`}>
                        {route.difficulty}
                      </span>
                    </div>

                    {route.cities?.length > 0 && (
                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        {route.cities.map((city: any, i: number) => (
                          <span key={city.id} className="flex items-center text-[10px] text-slate-400">
                            {i > 0 && <ChevronRight className="h-3 w-3 mx-0.5" />}
                            <MapPin className="h-2.5 w-2.5 mr-0.5" />
                            {city.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <Map
          defaultCenter={{ lat: 39.5, lng: -98.35 }}
          defaultZoom={4}
          style={{ width: '100%', height: '100%' }}
          disableDefaultUI={false}
          gestureHandling="greedy"
        >
          {/* Route polylines */}
          {routes.map((route: any, idx: number) => {
            const coordinates = route.cities?.map((c: any) => ({ lat: c.lat, lng: c.lng })) || [];
            if (coordinates.length < 2) return null;

            return (
              <MapPolyline
                key={route.id}
                path={coordinates}
                strokeColor={routeColors[idx % routeColors.length]}
                strokeWeight={selectedRouteId === route.id ? 5 : 3}
                strokeOpacity={selectedRouteId && selectedRouteId !== route.id ? 0.3 : 0.8}
                onClick={() => handleRouteSelect(route.id)}
              />
            );
          })}

          {/* Waypoint markers for selected route */}
          {routeDetail?.waypoints?.map((wp: any) => (
            <Marker
              key={wp.id}
              position={{ lat: wp.lat, lng: wp.lng }}
              onClick={() => setSelectedWaypoint(wp)}
            />
          ))}

          {selectedWaypoint && (
            <InfoWindow
              position={{ lat: selectedWaypoint.lat, lng: selectedWaypoint.lng }}
              onCloseClick={() => setSelectedWaypoint(null)}
            >
              <div style={{ padding: '6px', maxWidth: '220px' }}>
                <strong style={{ fontSize: '14px' }}>{selectedWaypoint.name}</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  Day {selectedWaypoint.dayNumber}
                </div>
                {selectedWaypoint.driveTimeFromPrev > 0 && (
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                    Drive: {Math.round(selectedWaypoint.driveTimeFromPrev / 60)}h {selectedWaypoint.driveTimeFromPrev % 60}m
                  </div>
                )}
                <div style={{ fontSize: '11px', color: '#555', marginTop: '6px' }}>
                  {selectedWaypoint.description}
                </div>
                {selectedWaypoint.nearbyDogStops?.length > 0 && (
                  <div style={{ marginTop: '8px', fontSize: '11px', color: '#3a8068' }}>
                    <strong>Nearby Dog Stops:</strong><br />
                    {selectedWaypoint.nearbyDogStops.join(', ')}
                  </div>
                )}
              </div>
            </InfoWindow>
          )}

          {/* Fit bounds when route detail loads */}
          {routeDetail && selectedRouteId && (
            <FitBoundsHelper waypoints={routeDetail.waypoints} />
          )}
        </Map>

        {/* Route Detail Panel */}
        <AnimatePresence>
          {routeDetail && selectedRouteId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 lg:left-4 lg:right-auto lg:w-96 max-h-[50vh] overflow-y-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-sand-200 dark:border-slate-700 p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">{routeDetail.name}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{routeDetail.description}</p>
                </div>
                <button
                  onClick={() => setSelectedRouteId(null)}
                  className="p-1 rounded-lg hover:bg-sand-100 dark:hover:bg-slate-700 text-slate-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {routeDetail.highlights?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Highlights</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {routeDetail.highlights.map((h: string) => (
                      <span key={h} className="badge-forest text-[10px]">{h}</span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Waypoints</h3>
                <div className="space-y-2">
                  {routeDetail.waypoints?.map((wp: any, idx: number) => (
                    <div key={wp.id} className="flex gap-3 p-2 rounded-lg hover:bg-sand-50 dark:hover:bg-slate-700 transition-colors">
                      <div className="w-7 h-7 rounded-full bg-forest-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{wp.name}</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>Day {wp.dayNumber}</span>
                          {wp.driveTimeFromPrev > 0 && (
                            <span className="flex items-center gap-0.5">
                              <Car className="h-2.5 w-2.5" />
                              {Math.floor(wp.driveTimeFromPrev / 60)}h {wp.driveTimeFromPrev % 60}m
                            </span>
                          )}
                        </div>
                        {wp.nearbyDogStops?.length > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-forest-600 dark:text-forest-400">
                            <PawPrint className="h-2.5 w-2.5" />
                            {wp.nearbyDogStops.slice(0, 2).join(' · ')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
