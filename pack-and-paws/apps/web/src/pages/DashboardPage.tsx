import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Plus, Calendar, DollarSign, Package, X } from 'lucide-react';
import { useTrips } from '../hooks/useQueries';
import { useCreateTrip } from '../hooks/useMutations';
import { useAuthStore } from '../stores/authStore';
import TripStatusBadge from '../components/trip/TripStatusBadge';

export default function DashboardPage() {
  const { isAuthenticated } = useAuthStore();
  const { data: trips = [], isLoading } = useTrips();
  const createTrip = useCreateTrip();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <LayoutDashboard className="h-16 w-16 text-sand-300 mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-slate-700 mb-2">Sign in to manage your trips</h2>
        <p className="text-slate-500">Create an account to start planning road trips, tracking expenses, and building packing lists.</p>
      </div>
    );
  }

  const grouped = {
    planning: trips.filter((t: any) => t.status === 'planning'),
    active: trips.filter((t: any) => t.status === 'active'),
    completed: trips.filter((t: any) => t.status === 'completed'),
    cancelled: trips.filter((t: any) => t.status === 'cancelled'),
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !startDate || !endDate) return;
    createTrip.mutate({ name, startDate, endDate }, {
      onSuccess: (trip) => {
        setShowForm(false);
        setName('');
        setStartDate('');
        setEndDate('');
        navigate(`/dashboard/${trip.id}`);
      },
    });
  };

  return (
    <div>
      <div className="bg-white border-b border-sand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-forest-100">
                <LayoutDashboard className="h-6 w-6 text-forest-600" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-800">My Trips</h1>
                <p className="text-sm text-slate-500">{trips.length} trip{trips.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-accent py-2.5 px-5">
              <Plus className="h-4 w-4" /> New Trip
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Trip Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <form onSubmit={handleCreate} className="card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-slate-800">Plan a New Trip</h3>
                  <button type="button" onClick={() => setShowForm(false)} className="p-1 hover:bg-sand-100 rounded-lg">
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Trip name (e.g., Summer Road Trip 2026)"
                  className="w-full border border-sand-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest-300"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forest-300" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forest-300" required />
                  </div>
                </div>
                <button type="submit" disabled={createTrip.isPending} className="btn-accent py-2.5 w-full">
                  {createTrip.isPending ? 'Creating...' : 'Create Trip'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="text-center py-12 text-slate-400">Loading your trips...</div>
        ) : trips.length === 0 ? (
          <div className="text-center py-16">
            <LayoutDashboard className="h-16 w-16 text-sand-300 mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold text-slate-700 mb-2">No trips yet</h2>
            <p className="text-slate-500 mb-6">Create your first trip to start planning!</p>
            <button onClick={() => setShowForm(true)} className="btn-accent py-2.5 px-6">
              <Plus className="h-4 w-4" /> Create Your First Trip
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {(['active', 'planning', 'completed', 'cancelled'] as const).map((status) => {
              const statusTrips = grouped[status];
              if (statusTrips.length === 0) return null;
              return (
                <div key={status}>
                  <h2 className="font-display text-lg font-bold text-slate-700 mb-3 capitalize">{status} Trips</h2>
                  <div className="space-y-3">
                    {statusTrips.map((trip: any, i: number) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link to={`/dashboard/${trip.id}`} className="block card hover:shadow-md transition-shadow p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-display font-bold text-slate-800">{trip.name}</h3>
                            <TripStatusBadge status={trip.status} />
                          </div>
                          <div className="flex items-center gap-5 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <DollarSign className="h-3.5 w-3.5" />
                              ${trip.totalExpenses.toFixed(2)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Package className="h-3.5 w-3.5" />
                              {trip.packingPacked}/{trip.packingTotal} packed
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
