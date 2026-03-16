import { motion } from 'framer-motion';
import { SlidersHorizontal, Dog, DollarSign, Star, Users } from 'lucide-react';

interface FilterBarProps {
  category: string;
  filters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
}

export default function FilterBar({ category, filters, onFilterChange }: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-flat p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal className="h-4 w-4 text-forest-600" />
        <span className="text-sm font-semibold text-slate-700">Filters</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Dog weight filter (hotels) */}
        {category === 'hotels' && (
          <>
            <div className="flex items-center gap-2">
              <Dog className="h-4 w-4 text-amber-500" />
              <label className="text-xs text-slate-500">Max Dog Weight</label>
              <select
                value={filters.maxWeight || ''}
                onChange={(e) => onFilterChange('maxWeight', e.target.value || undefined)}
                className="text-sm border border-sand-200 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-forest-300 focus:border-forest-400 outline-none"
              >
                <option value="">Any Size</option>
                <option value="25">Under 25 lbs</option>
                <option value="50">Under 50 lbs</option>
                <option value="75">Under 75 lbs</option>
                <option value="100">Under 100 lbs</option>
              </select>
            </div>
            <button
              onClick={() => onFilterChange('familyFriendly', filters.familyFriendly ? undefined : true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filters.familyFriendly
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'bg-sand-100 text-slate-600 hover:bg-sand-200'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              Family-Sized Rooms
            </button>
          </>
        )}

        {/* Price filter (hotels, restaurants) */}
        {(category === 'hotels' || category === 'restaurants') && (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-forest-500" />
            <label className="text-xs text-slate-500">Price</label>
            <div className="flex gap-1">
              {['$', '$$', '$$$', '$$$$'].map((p) => (
                <button
                  key={p}
                  onClick={() => onFilterChange('priceRange', filters.priceRange === p ? undefined : p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    filters.priceRange === p
                      ? 'bg-forest-600 text-white shadow-sm'
                      : 'bg-sand-100 text-slate-600 hover:bg-sand-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dog menu filter (restaurants) */}
        {category === 'restaurants' && (
          <button
            onClick={() => onFilterChange('dogMenu', filters.dogMenu ? undefined : true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filters.dogMenu
                ? 'bg-terracotta-500 text-white shadow-sm'
                : 'bg-sand-100 text-slate-600 hover:bg-sand-200'
            }`}
          >
            <span>Has Dog Menu</span>
          </button>
        )}

        {/* Off-leash filter (dog parks) */}
        {category === 'dog-parks' && (
          <>
            <button
              onClick={() => onFilterChange('offLeash', filters.offLeash ? undefined : true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filters.offLeash
                  ? 'bg-forest-500 text-white shadow-sm'
                  : 'bg-sand-100 text-slate-600 hover:bg-sand-200'
              }`}
            >
              Off-Leash Only
            </button>
            <button
              onClick={() => onFilterChange('fenced', filters.fenced ? undefined : true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filters.fenced
                  ? 'bg-forest-500 text-white shadow-sm'
                  : 'bg-sand-100 text-slate-600 hover:bg-sand-200'
              }`}
            >
              Fenced
            </button>
          </>
        )}

        {/* Rating filter */}
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-400" />
          <label className="text-xs text-slate-500">Min Rating</label>
          <select
            value={filters.minRating || ''}
            onChange={(e) => onFilterChange('minRating', e.target.value || undefined)}
            className="text-sm border border-sand-200 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-forest-300 focus:border-forest-400 outline-none"
          >
            <option value="">Any</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
            <option value="3.5">3.5+</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
