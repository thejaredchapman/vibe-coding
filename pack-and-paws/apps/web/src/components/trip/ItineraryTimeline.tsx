import { motion } from 'framer-motion';
import { MapPin, Hotel, Activity, FileText } from 'lucide-react';
import { useTripItinerary } from '../../hooks/useQueries';

interface ItineraryTimelineProps {
  tripId: string;
}

export default function ItineraryTimeline({ tripId }: ItineraryTimelineProps) {
  const { data: days = [], isLoading } = useTripItinerary(tripId);

  if (isLoading) {
    return <div className="text-center py-8 text-slate-400 text-sm">Loading itinerary...</div>;
  }

  if (days.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <MapPin className="h-12 w-12 mx-auto mb-3 text-slate-300" />
        <p className="text-sm">No itinerary days yet.</p>
        <p className="text-xs mt-1">Use the Trip Planner to add stops and save them here!</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-sand-200" />

      <div className="space-y-6">
        {days.map((day: any, i: number) => (
          <motion.div
            key={day.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative flex gap-4"
          >
            {/* Day number circle */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest-500 text-white flex items-center justify-center font-display font-bold text-sm z-10">
              D{day.dayNumber}
            </div>

            {/* Content card */}
            <div className="card-flat flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-display font-bold text-slate-800">
                    {day.city?.name}, {day.city?.state}
                  </h4>
                  {day.city?.dogFriendlinessScore && (
                    <span className="text-xs text-amber-600">Dog Score: {day.city.dogFriendlinessScore}/10</span>
                  )}
                </div>
              </div>

              {day.hotel && (
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <Hotel className="h-3.5 w-3.5" />
                  <span>{day.hotel.name}</span>
                  {day.hotel.petFee > 0 && (
                    <span className="text-xs text-amber-600">(${day.hotel.petFee} pet fee)</span>
                  )}
                </div>
              )}

              {day.activities?.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                    <Activity className="h-3 w-3" /> Activities
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {day.activities.map((activity: string, j: number) => (
                      <span key={j} className="px-2 py-0.5 bg-forest-50 text-forest-700 rounded text-xs">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {day.notes && (
                <div className="flex items-start gap-1.5 text-sm text-slate-500">
                  <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <p>{day.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
