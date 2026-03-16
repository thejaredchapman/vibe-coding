import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Hotel, UtensilsCrossed, Coffee, Trees, PawPrint, Sun, Calendar } from 'lucide-react';
import DogScoreBadge from './DogScoreBadge';
import { getClimateInfo } from '../lib/climateInfo';

interface CityCardProps {
  city: {
    id: string;
    name: string;
    state: string;
    region: string;
    dogFriendlinessScore: number;
    description: string;
    heroImage: string;
    climate: string;
    hotelCount: number;
    parkCount: number;
    restaurantCount: number;
    cafeCount: number;
    dogParkCount: number;
  };
  index: number;
}

const regionGradients: Record<string, string> = {
  'West Coast': 'from-blue-400 via-cyan-400 to-teal-500',
  'Pacific Northwest': 'from-emerald-500 via-green-500 to-forest-600',
  'Mountain West': 'from-slate-400 via-stone-400 to-amber-500',
  'Southwest': 'from-orange-400 via-terracotta-500 to-red-500',
  'Midwest': 'from-amber-400 via-yellow-500 to-green-500',
  'Southeast': 'from-rose-400 via-pink-400 to-purple-400',
  'Northeast': 'from-indigo-400 via-blue-400 to-slate-500',
};

export default function CityCard({ city, index }: CityCardProps) {
  const gradient = regionGradients[city.region] || 'from-forest-400 to-forest-600';
  const [imgError, setImgError] = useState(false);
  const climateInfo = getClimateInfo(city.climate, city.region);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/cities/${city.id}`} className="block group">
        <div className="card overflow-hidden">
          {/* Hero gradient (fallback for missing images) */}
          <div className={`relative h-48 bg-gradient-to-br ${gradient} overflow-hidden`}>
            {city.heroImage && !imgError && (
              <img
                src={city.heroImage}
                alt={city.name}
                loading="lazy"
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Score badge */}
            <div className="absolute top-3 right-3">
              <DogScoreBadge score={city.dogFriendlinessScore} />
            </div>

            {/* City name overlay */}
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="font-display text-xl font-bold text-white drop-shadow-lg">
                {city.name}
              </h3>
              <div className="flex items-center gap-1 text-white/80 text-sm">
                <MapPin className="h-3 w-3" />
                {city.state}
              </div>
            </div>
          </div>

          {/* Card body */}
          <div className="p-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
              {city.description}
            </p>

            {/* Weather & Best Time */}
            <div className="flex flex-col gap-1.5 mb-3 text-xs">
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <Sun className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{climateInfo.weatherSummary}</span>
              </div>
              <div className="flex items-center gap-1.5 text-forest-600 dark:text-forest-400">
                <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">Best: {climateInfo.bestTime}</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Hotel className="h-3.5 w-3.5 text-amber-500" />
                {city.hotelCount}
              </span>
              <span className="flex items-center gap-1">
                <Trees className="h-3.5 w-3.5 text-forest-500" />
                {city.parkCount}
              </span>
              <span className="flex items-center gap-1">
                <UtensilsCrossed className="h-3.5 w-3.5 text-terracotta-500" />
                {city.restaurantCount}
              </span>
              <span className="flex items-center gap-1">
                <Coffee className="h-3.5 w-3.5 text-sand-600" />
                {city.cafeCount}
              </span>
              <span className="flex items-center gap-1">
                <PawPrint className="h-3.5 w-3.5 text-forest-400" />
                {city.dogParkCount}
              </span>
            </div>

            {/* Region badge */}
            <div className="mt-3">
              <span className="badge-forest text-[10px] uppercase tracking-wider">
                {city.region}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
