import { motion } from 'framer-motion';
import { Star, MapPin, ExternalLink, DollarSign, Dog, Leaf, Coffee, PawPrint } from 'lucide-react';

interface VenueCardProps {
  venue: any;
  type: 'hotel' | 'restaurant' | 'cafe' | 'dogPark' | 'park';
  index: number;
}

const typeConfig = {
  hotel: { icon: '🏨', color: 'border-l-amber-500', accent: 'text-amber-600' },
  restaurant: { icon: '🍽️', color: 'border-l-terracotta-500', accent: 'text-terracotta-600' },
  cafe: { icon: '☕', color: 'border-l-sand-500', accent: 'text-sand-700' },
  dogPark: { icon: '🐕', color: 'border-l-forest-400', accent: 'text-forest-600' },
  park: { icon: '🏞️', color: 'border-l-forest-600', accent: 'text-forest-700' },
};

export default function VenueCard({ venue, type, index }: VenueCardProps) {
  const config = typeConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`card-flat border-l-4 ${config.color} p-4 hover:shadow-md transition-all`}
    >
      <div className="flex gap-4">
        {/* Icon or Image */}
        <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-sand-50 to-sand-100 flex items-center justify-center text-2xl">
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-slate-800 truncate">
              {venue.name}
            </h3>
            {venue.rating && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-slate-700">{venue.rating}</span>
              </div>
            )}
          </div>

          {venue.address && (
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" /> {venue.address}
            </p>
          )}

          {/* Type-specific info */}
          <div className="mt-2 flex flex-wrap gap-2">
            {/* Hotel specific */}
            {type === 'hotel' && (
              <>
                <span className="badge bg-amber-50 text-amber-700">
                  <DollarSign className="h-3 w-3" /> {venue.priceRange}
                </span>
                {venue.maxDogWeight > 0 && (
                  <span className="badge bg-forest-50 text-forest-700">
                    <Dog className="h-3 w-3" /> Up to {venue.maxDogWeight} lbs
                  </span>
                )}
                {venue.maxDogWeight === 0 && (
                  <span className="badge bg-forest-50 text-forest-700">
                    <Dog className="h-3 w-3" /> All sizes welcome
                  </span>
                )}
                {venue.petFee > 0 && (
                  <span className="badge bg-sand-50 text-sand-700">
                    Pet fee: ${venue.petFee}
                  </span>
                )}
              </>
            )}

            {/* Restaurant specific */}
            {type === 'restaurant' && (
              <>
                <span className="badge bg-terracotta-50 text-terracotta-700">{venue.cuisine}</span>
                <span className="badge bg-amber-50 text-amber-700">{venue.priceRange}</span>
                {venue.hasDogMenu && (
                  <span className="badge bg-forest-100 text-forest-700">
                    <PawPrint className="h-3 w-3" /> Dog Menu
                  </span>
                )}
                {venue.outdoorSeating && (
                  <span className="badge bg-sand-50 text-sand-700">Outdoor Seating</span>
                )}
              </>
            )}

            {/* Cafe specific */}
            {type === 'cafe' && (
              <>
                {venue.hasOutdoorPatio && (
                  <span className="badge bg-sand-50 text-sand-700">
                    <Coffee className="h-3 w-3" /> Patio
                  </span>
                )}
                {venue.dogTreats && (
                  <span className="badge bg-forest-50 text-forest-700">
                    <PawPrint className="h-3 w-3" /> Dog Treats
                  </span>
                )}
              </>
            )}

            {/* Dog Park specific */}
            {type === 'dogPark' && (
              <>
                {venue.offLeash && (
                  <span className="badge bg-forest-100 text-forest-700">Off-Leash</span>
                )}
                {venue.fenced && (
                  <span className="badge bg-amber-50 text-amber-700">Fenced</span>
                )}
                <span className="badge bg-sand-50 text-sand-700">{venue.acres} acres</span>
              </>
            )}

            {/* Park specific */}
            {type === 'park' && (
              <>
                {venue.dogTrails?.length > 0 && (
                  <span className="badge bg-forest-50 text-forest-700">
                    <Leaf className="h-3 w-3" /> {venue.dogTrails.length} dog trails
                  </span>
                )}
              </>
            )}
          </div>

          {/* Dog policy */}
          <p className="text-xs text-slate-500 mt-2 italic">
            {venue.dogPolicy}
          </p>

          {/* Amenities (hotels & dog parks) */}
          {venue.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {venue.amenities.slice(0, 4).map((a: string) => (
                <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                  {a}
                </span>
              ))}
              {venue.amenities.length > 4 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">
                  +{venue.amenities.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action button */}
        {venue.website && (
          <a
            href={venue.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 rounded-lg hover:bg-sand-100 text-slate-400 hover:text-forest-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
