import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Calendar, MapPin, DollarSign, Package, Trash2,
} from 'lucide-react';
import { useTrip, useTripExpenses } from '../hooks/useQueries';
import { useDeleteExpense, useUpdateTrip } from '../hooks/useMutations';
import { useTripStore } from '../stores/tripStore';
import TripStatusBadge from '../components/trip/TripStatusBadge';
import ExpenseForm from '../components/trip/ExpenseForm';
import PackingChecklist from '../components/trip/PackingChecklist';
import ItineraryTimeline from '../components/trip/ItineraryTimeline';

const EXPENSE_CATEGORY_COLORS: Record<string, string> = {
  lodging: 'bg-blue-100 text-blue-700',
  food: 'bg-amber-100 text-amber-700',
  gas: 'bg-slate-100 text-slate-700',
  activities: 'bg-forest-100 text-forest-700',
  pet: 'bg-terracotta-100 text-terracotta-700',
  other: 'bg-sand-100 text-sand-700',
};

const TABS = [
  { key: 'itinerary', label: 'Itinerary', icon: MapPin },
  { key: 'budget', label: 'Budget', icon: DollarSign },
  { key: 'packing', label: 'Packing', icon: Package },
] as const;

export default function TripDashboardPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const { data: trip, isLoading } = useTrip(tripId!);
  const { data: expenses = [] } = useTripExpenses(tripId!);
  const deleteExpense = useDeleteExpense(tripId!);
  const updateTrip = useUpdateTrip(tripId!);
  const { activeTab, setActiveTab, showExpenseForm, openExpenseForm, closeExpenseForm } = useTripStore();

  if (isLoading) {
    return <div className="text-center py-20 text-slate-400">Loading trip...</div>;
  }

  if (!trip) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Trip not found.</p>
        <Link to="/dashboard" className="text-forest-600 hover:underline text-sm mt-2 inline-block">Back to Dashboard</Link>
      </div>
    );
  }

  const totalExpenses = expenses.reduce((sum: number, e: any) => sum + e.amount, 0);
  const expensesByCategory = expenses.reduce((acc: Record<string, number>, e: any) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const STATUS_OPTIONS: Array<{ value: string; label: string }> = [
    { value: 'planning', label: 'Planning' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-sand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-3 mb-3">
            <Link to="/dashboard" className="p-2 hover:bg-sand-100 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="font-display text-2xl font-bold text-slate-800">{trip.name}</h1>
                <TripStatusBadge status={trip.status} />
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <select
              value={trip.status}
              onChange={(e) => updateTrip.mutate({ status: e.target.value })}
              className="text-sm border border-sand-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-forest-300"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-3">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-sand-50 text-forest-700 border-b-2 border-forest-500'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-sand-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'itinerary' && <ItineraryTimeline tripId={tripId!} />}

        {activeTab === 'budget' && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="card-flat p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-slate-800">Trip Budget</h3>
                <div className="text-2xl font-bold text-forest-700">${totalExpenses.toFixed(2)}</div>
              </div>
              {Object.keys(expensesByCategory).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(expensesByCategory).map(([cat, total]) => (
                    <span key={cat} className={`px-3 py-1 rounded-full text-xs font-medium ${EXPENSE_CATEGORY_COLORS[cat] || 'bg-sand-100 text-sand-700'}`}>
                      {cat}: ${(total as number).toFixed(2)}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => openExpenseForm()} className="btn-accent text-sm py-2 px-4">
              <DollarSign className="h-4 w-4" /> Add Expense
            </button>

            {/* Expense list */}
            {expenses.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">No expenses yet. Start tracking your trip costs!</div>
            ) : (
              <div className="space-y-2">
                {expenses.map((expense: any, i: number) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="card-flat p-4 flex items-center gap-4 group"
                  >
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${EXPENSE_CATEGORY_COLORS[expense.category] || ''}`}>
                      {expense.category}
                    </span>
                    <span className="flex-1 text-sm text-slate-700">{expense.description}</span>
                    <span className="text-sm font-medium text-slate-800">${expense.amount.toFixed(2)}</span>
                    <span className="text-xs text-slate-400">{expense.paidBy?.name}</span>
                    <button
                      onClick={() => deleteExpense.mutate(expense.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-opacity"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Expense Form Modal */}
            <AnimatePresence>
              {showExpenseForm && <ExpenseForm tripId={tripId!} onClose={closeExpenseForm} />}
            </AnimatePresence>
          </div>
        )}

        {activeTab === 'packing' && <PackingChecklist tripId={tripId!} />}
      </div>
    </div>
  );
}
