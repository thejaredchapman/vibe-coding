import { Link } from 'react-router-dom';
import { Hotel, UtensilsCrossed, PawPrint, MapPin, ExternalLink } from 'lucide-react';
import DogScoreBadge from './DogScoreBadge';

interface TripStop {
  city: {
    id: string;
    name: string;
    state: string;
    dogFriendlinessScore: number;
    region: string;
  };
  distanceFromRoute: number;
  hotelCount: number;
  restaurantCount: number;
  dogParkCount: number;
}

interface TripStopCardProps {
  stop: TripStop;
  index: number;
}

export default function TripStopCard({ stop, index }: TripStopCardProps) {
  const { city } = stop;

  return (
    <div className="card p-4 flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-slate-800 text-sm truncate">
            {city.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
            <MapPin className="h-3 w-3" />
            {city.state} · {city.region}
          </div>
        </div>
        <DogScoreBadge score={city.dogFriendlinessScore} size="sm" />
      </div>

      <div className="text-xs text-amber-600 font-medium mb-3">
        {stop.distanceFromRoute} mi from route
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1">
          <Hotel className="h-3 w-3" /> {stop.hotelCount}
        </span>
        <span className="flex items-center gap-1">
          <UtensilsCrossed className="h-3 w-3" /> {stop.restaurantCount}
        </span>
        <span className="flex items-center gap-1">
          <PawPrint className="h-3 w-3" /> {stop.dogParkCount}
        </span>
      </div>

      <Link
        to={`/cities/${city.id}`}
        className="mt-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-forest-50 text-forest-700 text-xs font-medium hover:bg-forest-100 transition-colors"
      >
        View City <ExternalLink className="h-3 w-3" />
      </Link>
    </div>
  );
}
