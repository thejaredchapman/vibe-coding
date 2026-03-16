import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, X, MapPin, Save } from 'lucide-react';
import { useTripPlannerStore } from '../../stores/tripPlannerStore';
import { useCreateTripFromPlan } from '../../hooks/useMutations';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import DayAssigner from './DayAssigner';

export default function SelectedStopsList() {
  const {
    selectedStops, removeStop, moveStopUp, moveStopDown, assignDay,
    tripName, setTripName, startDate, setStartDate, endDate, setEndDate, clearStops,
  } = useTripPlannerStore();
  const { isAuthenticated } = useAuthStore();
  const createFromPlan = useCreateTripFromPlan();
  const navigate = useNavigate();

  const maxDay = selectedStops.reduce((max, s) => Math.max(max, s.dayNumber), 1);

  const handleSave = () => {
    if (!tripName || !startDate || !endDate || selectedStops.length === 0) return;
    createFromPlan.mutate(
      {
        name: tripName,
        startDate,
        endDate,
        stops: selectedStops.map((s) => ({
          cityId: s.cityId,
          dayNumber: s.dayNumber,
        })),
      },
      {
        onSuccess: (trip) => {
          clearStops();
          navigate(`/dashboard/${trip.id}`);
        },
      },
    );
  };

  if (selectedStops.length === 0) {
    return (
      <div className="card-flat p-4 text-center">
        <MapPin className="h-8 w-8 text-sand-300 mx-auto mb-2" />
        <p className="text-sm text-slate-500">Click "Add Stop" on suggested cities to build your itinerary</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-display font-bold text-slate-800 text-sm">Selected Stops ({selectedStops.length})</h3>

      <div className="space-y-1.5">
        <AnimatePresence>
          {selectedStops.map((stop, i) => (
            <motion.div
              key={stop.cityId}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card-flat p-3 flex items-center gap-2"
            >
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveStopUp(i)}
                  disabled={i === 0}
                  className="p-0.5 hover:bg-sand-100 rounded disabled:opacity-30"
                >
                  <ChevronUp className="h-3 w-3" />
                </button>
                <button
                  onClick={() => moveStopDown(i)}
                  disabled={i === selectedStops.length - 1}
                  className="p-0.5 hover:bg-sand-100 rounded disabled:opacity-30"
                >
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-700 truncate">
                  {stop.cityName}, {stop.state}
                </div>
                <span className="text-[10px] text-amber-600">Score: {stop.dogFriendlinessScore}/10</span>
              </div>

              <DayAssigner
                dayNumber={stop.dayNumber}
                maxDay={maxDay}
                onChange={(day) => assignDay(i, day)}
              />

              <button onClick={() => removeStop(stop.cityId)} className="p-1 hover:bg-red-50 rounded">
                <X className="h-3.5 w-3.5 text-red-400" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Save as Trip form */}
      {isAuthenticated && selectedStops.length >= 2 && (
        <div className="card-flat p-4 space-y-3 mt-4">
          <h4 className="text-sm font-semibold text-slate-700">Save as Trip</h4>
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            placeholder="Trip name..."
            className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forest-300"
          />
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-sand-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-forest-300" />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-sand-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-forest-300" />
          </div>
          <button
            onClick={handleSave}
            disabled={!tripName || !startDate || !endDate || createFromPlan.isPending}
            className="btn-accent text-sm py-2 w-full disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {createFromPlan.isPending ? 'Saving...' : 'Save as Trip'}
          </button>
        </div>
      )}
    </div>
  );
}
