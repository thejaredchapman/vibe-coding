import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Car, Clock, MapPin, ChevronRight, PawPrint, Star, X,
} from 'lucide-react';
import { useRoutes, useRouteDetail } from '../hooks/useQueries';
import LoadingSpinner from '../components/LoadingSpinner';
import { DIFFICULTY_COLORS } from '../lib/constants';

const difficultyLabels: Record<string, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  challenging: 'Challenging',
};

export default function CrossCountryPage() {
  const { data: routesData, isLoading } = useRoutes();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const { data: routeDetail } = useRouteDetail(selectedRouteId || '');

  const routes = (routesData?.data || []).filter(
    (r: any) => r.totalMiles >= 1000
  );

  if (isLoading) return <LoadingSpinner message="Mapping cross-country adventures..." />;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest-900 via-forest-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <PawPrint
              key={i}
              className="absolute text-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-sm font-medium mb-6">
              <Globe className="h-4 w-4" />
              {routes.length} Epic Cross-Country Routes
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Cross Country
              <br />
              <span className="text-gradient-sunset">Adventures</span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
              Multi-day road trips spanning the nation with dog-friendly stops,
              scenic detours, and tail-wagging destinations every mile of the way.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-12 md:h-16">
            <path
              d="M0,50 C360,80 720,20 1440,50 L1440,80 L0,80 Z"
              className="fill-sand-50 dark:fill-slate-900"
            />
          </svg>
        </div>
      </section>

      {/* Route Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {routes.map((route: any, i: number) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <button
                onClick={() => setSelectedRouteId(selectedRouteId === route.id ? null : route.id)}
                className={`w-full text-left card overflow-hidden group ${
                  selectedRouteId === route.id
                    ? 'ring-2 ring-forest-500 dark:ring-forest-400'
                    : ''
                }`}
              >
                {/* Card header gradient */}
                <div className="relative h-40 bg-gradient-to-br from-forest-700 via-forest-600 to-amber-600 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-xl font-bold text-white drop-shadow-lg">
                      {route.name}
                    </h3>
                    <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                      <MapPin className="h-3 w-3" />
                      {route.cities?.[0]?.name}
                      <ChevronRight className="h-3 w-3" />
                      {route.cities?.[route.cities.length - 1]?.name}
                    </div>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      DIFFICULTY_COLORS[route.difficulty as keyof typeof DIFFICULTY_COLORS] || DIFFICULTY_COLORS.moderate
                    }`}>
                      {difficultyLabels[route.difficulty] || route.difficulty}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                    {route.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Car className="h-4 w-4 text-terracotta-500" />
                      {route.totalMiles.toLocaleString()} mi
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-amber-500" />
                      {route.estimatedDays} days
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-forest-500" />
                      {route.cities?.length || 0} stops
                    </span>
                  </div>

                  {route.highlights?.slice(0, 3).map((h: string) => (
                    <div key={h} className="flex items-start gap-2 mb-1.5">
                      <Star className="h-3 w-3 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">{h}</span>
                    </div>
                  ))}
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Route Detail Modal */}
      <AnimatePresence>
        {routeDetail && selectedRouteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedRouteId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Detail header */}
              <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-sand-200 dark:border-slate-700 p-5 flex items-start justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">
                    {routeDetail.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {routeDetail.totalMiles?.toLocaleString()} miles &middot; {routeDetail.estimatedDays} days &middot; {routeDetail.difficulty}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRouteId(null)}
                  className="p-1.5 rounded-lg hover:bg-sand-100 dark:hover:bg-slate-700 text-slate-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {routeDetail.description}
                </p>

                {routeDetail.highlights?.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Highlights
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {routeDetail.highlights.map((h: string) => (
                        <span key={h} className="badge-forest text-[10px]">{h}</span>
                      ))}
                    </div>
                  </div>
                )}

                <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Waypoints
                </h3>
                <div className="space-y-2">
                  {routeDetail.waypoints?.map((wp: any, idx: number) => (
                    <div
                      key={wp.id}
                      className="flex gap-3 p-3 rounded-xl bg-sand-50 dark:bg-slate-700/50 hover:bg-sand-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-forest-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {wp.name}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                          <span>Day {wp.dayNumber}</span>
                          {wp.driveTimeFromPrev > 0 && (
                            <span className="flex items-center gap-0.5">
                              <Car className="h-2.5 w-2.5" />
                              {Math.floor(wp.driveTimeFromPrev / 60)}h {wp.driveTimeFromPrev % 60}m
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {wp.description}
                        </p>
                        {wp.nearbyDogStops?.length > 0 && (
                          <div className="flex items-center gap-1 mt-1.5 text-[10px] text-forest-600 dark:text-forest-400">
                            <PawPrint className="h-2.5 w-2.5" />
                            {wp.nearbyDogStops.slice(0, 3).join(' · ')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
