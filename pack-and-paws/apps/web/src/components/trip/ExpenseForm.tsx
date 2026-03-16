import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign } from 'lucide-react';
import { useAddExpense } from '../../hooks/useMutations';

const CATEGORIES = [
  { value: 'lodging', label: 'Lodging' },
  { value: 'food', label: 'Food' },
  { value: 'gas', label: 'Gas' },
  { value: 'activities', label: 'Activities' },
  { value: 'pet', label: 'Pet' },
  { value: 'other', label: 'Other' },
];

interface ExpenseFormProps {
  tripId: string;
  onClose: () => void;
}

export default function ExpenseForm({ tripId, onClose }: ExpenseFormProps) {
  const [category, setCategory] = useState('food');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const addExpense = useAddExpense(tripId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    addExpense.mutate(
      { category, amount: parseFloat(amount), description },
      { onSuccess: onClose },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-forest-600" />
            <h3 className="font-display text-lg font-bold text-slate-800">Add Expense</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-sand-100 rounded-lg">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-forest-300 focus:border-forest-400 outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-forest-300 focus:border-forest-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this expense for?"
              className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-forest-300 focus:border-forest-400 outline-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 py-2.5">
              Cancel
            </button>
            <button
              type="submit"
              disabled={addExpense.isPending}
              className="btn-accent flex-1 py-2.5"
            >
              {addExpense.isPending ? 'Adding...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
