import { motion } from 'framer-motion';
import { Map, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { useCities } from '../hooks/useQueries';
import { useUiStore } from '../stores/uiStore';
import CityCard from '../components/CityCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { REGIONS } from '../lib/constants';

export default function CityGuidePage() {
  const selectedRegion = useUiStore((s) => s.selectedRegion);
  const setSelectedRegion = useUiStore((s) => s.setSelectedRegion);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useCities(selectedRegion);

  const cities = data?.data?.filter((city: any) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-forest-100 dark:bg-forest-900/50">
            <Map className="h-6 w-6 text-forest-600 dark:text-forest-400" />
          </div>
          <h1 className="section-title">Dog-Friendly City Guides</h1>
        </div>
        <p className="section-subtitle">
          Explore 200 of America's most paw-some destinations, each with curated hotels,
          restaurants, cafes, parks, and dog parks.
        </p>
      </motion.div>

      {/* Search + Region filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-200 dark:border-slate-600 bg-white dark:bg-slate-800
                       text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-forest-300 dark:focus:ring-forest-600 focus:border-forest-400 dark:focus:border-forest-500 outline-none
                       placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Region filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-slate-400" />
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedRegion === region
                  ? 'bg-forest-600 text-white shadow-md shadow-forest-600/25'
                  : 'bg-white dark:bg-slate-800 border border-sand-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-sand-50 dark:hover:bg-slate-700 hover:border-sand-300 dark:hover:border-slate-500'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cities grid */}
      {isLoading ? (
        <LoadingSpinner message="Sniffing out the best cities..." />
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-terracotta-500 font-medium">Failed to load cities. Please try again.</p>
        </div>
      ) : cities.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 dark:text-slate-400">No cities match your search. Try a different filter!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.map((city: any, i: number) => (
            <CityCard key={city.id} city={city} index={i} />
          ))}
        </div>
      )}

      {/* Results count */}
      {!isLoading && cities.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-slate-400 mt-8"
        >
          Showing {cities.length} dog-friendly {cities.length === 1 ? 'city' : 'cities'}
        </motion.p>
      )}
    </div>
  );
}
