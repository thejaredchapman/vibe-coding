import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Trash2, Package, Dog, X } from 'lucide-react';
import { useTripPacking } from '../../hooks/useQueries';
import { useAddPackingItem, useTogglePacked, useDeletePackingItem, useAddDefaultPackingItems } from '../../hooks/useMutations';

const CATEGORY_LABELS: Record<string, string> = {
  clothing: 'Clothing',
  toiletries: 'Toiletries',
  electronics: 'Electronics',
  dog_essentials: 'Dog Essentials',
  dog_food: 'Dog Food',
  documents: 'Documents',
  other: 'Other',
};

const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }));

interface PackingChecklistProps {
  tripId: string;
}

export default function PackingChecklist({ tripId }: PackingChecklistProps) {
  const { data: items = [] } = useTripPacking(tripId);
  const togglePacked = useTogglePacked(tripId);
  const deleteItem = useDeletePackingItem(tripId);
  const addItem = useAddPackingItem(tripId);
  const addDefaults = useAddDefaultPackingItems(tripId);

  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('other');
  const [newForDog, setNewForDog] = useState(false);

  const grouped = items.reduce((acc: Record<string, any[]>, item: any) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const totalItems = items.length;
  const packedCount = items.filter((i: any) => i.packed).length;
  const progress = totalItems > 0 ? Math.round((packedCount / totalItems) * 100) : 0;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    addItem.mutate({ item: newItem.trim(), category: newCategory, forDog: newForDog }, {
      onSuccess: () => { setNewItem(''); setShowForm(false); },
    });
  };

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="card-flat p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Packing Progress</span>
          <span className="text-sm text-slate-500">{packedCount}/{totalItems} items</span>
        </div>
        <div className="h-2 bg-sand-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-forest-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button onClick={() => setShowForm(true)} className="btn-accent text-sm py-2 px-4">
          <Plus className="h-4 w-4" /> Add Item
        </button>
        {totalItems === 0 && (
          <button
            onClick={() => addDefaults.mutate()}
            disabled={addDefaults.isPending}
            className="btn-secondary text-sm py-2 px-4"
          >
            <Package className="h-4 w-4" /> Add Dog Essentials
          </button>
        )}
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAdd}
            className="card-flat p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">New Item</span>
              <button type="button" onClick={() => setShowForm(false)} className="p-1 hover:bg-sand-100 rounded">
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Item name..."
              className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forest-300"
              autoFocus
            />
            <div className="flex gap-3">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 border border-sand-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forest-300"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <label className="flex items-center gap-1.5 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" checked={newForDog} onChange={(e) => setNewForDog(e.target.checked)} className="accent-forest-600" />
                <Dog className="h-4 w-4" /> For Dog
              </label>
            </div>
            <button type="submit" disabled={addItem.isPending} className="btn-accent text-sm py-2 w-full">
              {addItem.isPending ? 'Adding...' : 'Add Item'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Grouped items */}
      {Object.entries(grouped).map(([category, categoryItems]) => (
        <div key={category} className="card-flat overflow-hidden">
          <div className="px-4 py-3 bg-sand-50 border-b border-sand-200">
            <h4 className="text-sm font-semibold text-slate-700">{CATEGORY_LABELS[category] || category}</h4>
          </div>
          <ul className="divide-y divide-sand-100">
            {(categoryItems as any[]).map((item) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-sand-50 group">
                <button
                  onClick={() => togglePacked.mutate(item.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    item.packed ? 'bg-forest-500 border-forest-500' : 'border-slate-300 hover:border-forest-400'
                  }`}
                >
                  {item.packed && <Check className="h-3 w-3 text-white" />}
                </button>
                <span className={`flex-1 text-sm ${item.packed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {item.item}
                </span>
                {item.forDog && <Dog className="h-3.5 w-3.5 text-amber-500" />}
                <button
                  onClick={() => deleteItem.mutate(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-400" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {totalItems === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm">
          No packing items yet. Add items or start with dog essentials!
        </div>
      )}
    </div>
  );
}
