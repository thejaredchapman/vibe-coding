import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import {
  ArrowLeft, Hotel, Trees, UtensilsCrossed, Coffee, PawPrint, MapPin,
  Sun, Calendar, CloudRain, Thermometer,
} from 'lucide-react';
import { Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import {
  useCityDetail, useCityHotels, useCityParks,
  useCityRestaurants, useCityCafes, useCityDogParks,
} from '../hooks/useQueries';
import DogScoreBadge from '../components/DogScoreBadge';
import VenueCard from '../components/VenueCard';
import FilterBar from '../components/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { CATEGORY_COLORS } from '../lib/constants';
import { getClimateInfo } from '../lib/climateInfo';

const tabs = [
  { key: 'hotels', label: 'Hotels', icon: Hotel, color: 'amber' },
  { key: 'parks', label: 'Parks', icon: Trees, color: 'forest' },
  { key: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed, color: 'terracotta' },
  { key: 'cafes', label: 'Cafes', icon: Coffee, color: 'sand' },
  { key: 'dog-parks', label: 'Dog Parks', icon: PawPrint, color: 'forest' },
];

export default function CityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('hotels');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedVenue, setSelectedVenue] = useState<any>(null);

  const { data: city, isLoading } = useCityDetail(id!);

  const hotelsQuery = useCityHotels(id!, activeTab === 'hotels' ? filters : undefined);
  const parksQuery = useCityParks(id!);
  const restaurantsQuery = useCityRestaurants(id!, activeTab === 'restaurants' ? filters : undefined);
  const cafesQuery = useCityCafes(id!);
  const dogParksQuery = useCityDogParks(id!, activeTab === 'dog-parks' ? filters : undefined);

  const getActiveData = () => {
    switch (activeTab) {
      case 'hotels': return { data: hotelsQuery.data?.data || [], type: 'hotel' as const, loading: hotelsQuery.isLoading };
      case 'parks': return { data: parksQuery.data?.data || [], type: 'park' as const, loading: parksQuery.isLoading };
      case 'restaurants': return { data: restaurantsQuery.data?.data || [], type: 'restaurant' as const, loading: restaurantsQuery.isLoading };
      case 'cafes': return { data: cafesQuery.data?.data || [], type: 'cafe' as const, loading: cafesQuery.isLoading };
      case 'dog-parks': return { data: dogParksQuery.data?.data || [], type: 'dogPark' as const, loading: dogParksQuery.isLoading };
      default: return { data: [], type: 'hotel' as const, loading: false };
    }
  };

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (value === undefined) delete next[key];
      else next[key] = value;
      return next;
    });
  }, []);

  if (isLoading) return <LoadingSpinner message="Loading city details..." />;
  if (!city) return <div className="text-center py-20 text-slate-500 dark:text-slate-400">City not found</div>;

  const activeData = getActiveData();
  const venuesWithCoords = activeData.data.filter((v: any) => v.lat && v.lng);

  return (
    <div>
      {/* City Hero */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-forest-800 to-forest-950 overflow-hidden">
        {city.heroImage && (
          <img
            src={city.heroImage}
            alt={city.name}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div>
            <Link to="/cities" className="flex items-center gap-1 text-white/60 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Cities
            </Link>
            <div className="flex items-center gap-4">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white">{city.name}</h1>
                <div className="flex items-center gap-2 text-white/70 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{city.state}</span>
                  <span className="text-white/30">|</span>
                  <span>{city.region}</span>
                </div>
              </div>
              <DogScoreBadge score={city.dogFriendlinessScore} size="lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24">
              <div className="w-full h-[400px] lg:h-[calc(100vh-8rem)] rounded-2xl overflow-hidden shadow-lg border border-sand-200 dark:border-slate-700">
                <Map
                  defaultCenter={{ lat: city.lat, lng: city.lng }}
                  defaultZoom={13}
                  style={{ width: '100%', height: '100%' }}
                  disableDefaultUI={false}
                  gestureHandling="greedy"
                >
                  {venuesWithCoords.map((venue: any) => {
                    return (
                      <Marker
                        key={venue.id}
                        position={{ lat: venue.lat, lng: venue.lng }}
                        onClick={() => setSelectedVenue(venue)}
                      />
                    );
                  })}

                  {selectedVenue && (
                    <InfoWindow
                      position={{ lat: selectedVenue.lat, lng: selectedVenue.lng }}
                      onCloseClick={() => setSelectedVenue(null)}
                    >
                      <div style={{ padding: '4px', maxWidth: '200px' }}>
                        <strong style={{ fontSize: '14px' }}>{selectedVenue.name}</strong>
                        {selectedVenue.rating && (
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                            Rating: {selectedVenue.rating}/5
                          </div>
                        )}
                        {selectedVenue.address && (
                          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                            {selectedVenue.address}
                          </div>
                        )}
                        {selectedVenue.dogPolicy && (
                          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px', fontStyle: 'italic' }}>
                            {selectedVenue.dogPolicy}
                          </div>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{city.description}</p>

            {/* Weather & Best Time to Visit */}
            {(() => {
              const climateInfo = getClimateInfo(city.climate || '', city.region);
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <h4 className="font-display font-semibold text-amber-800 dark:text-amber-300 text-sm">Weather</h4>
                    </div>
                    <p className="text-amber-700 dark:text-amber-400 text-sm leading-relaxed">{climateInfo.weatherSummary}</p>
                    {city.climate && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-amber-100 dark:bg-amber-800/50 text-amber-600 dark:text-amber-300 text-[10px] font-medium uppercase tracking-wider rounded-full">
                        {city.climate}
                      </span>
                    )}
                  </div>
                  <div className="bg-forest-50 dark:bg-forest-900/20 border border-forest-200 dark:border-forest-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-forest-600 dark:text-forest-400" />
                      <h4 className="font-display font-semibold text-forest-800 dark:text-forest-300 text-sm">Best Time to Visit</h4>
                    </div>
                    <p className="text-forest-700 dark:text-forest-400 text-sm font-medium mb-1">{climateInfo.bestTime}</p>
                    <p className="text-forest-600 dark:text-forest-500 text-xs leading-relaxed">{climateInfo.bestTimeReason}</p>
                  </div>
                </div>
              );
            })()}

            {/* Category Tabs */}
            <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                const count = tab.key === 'hotels' ? city.hotelCount
                  : tab.key === 'parks' ? city.parkCount
                  : tab.key === 'restaurants' ? city.restaurantCount
                  : tab.key === 'cafes' ? city.cafeCount
                  : city.dogParkCount;

                return (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key); setFilters({}); setSelectedVenue(null); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-forest-600 text-white shadow-md shadow-forest-600/25'
                        : 'bg-white dark:bg-slate-800 border border-sand-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-sand-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20' : 'bg-sand-100 dark:bg-slate-700'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Filters */}
            {(activeTab === 'hotels' || activeTab === 'restaurants' || activeTab === 'dog-parks') && (
              <FilterBar
                category={activeTab}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            )}

            {/* Venue cards */}
            {activeData.loading ? (
              <LoadingSpinner message="Loading listings..." />
            ) : activeData.data.length === 0 ? (
              <div className="text-center py-12">
                <PawPrint className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400">No results match your filters. Try adjusting them!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeData.data.map((venue: any, i: number) => (
                  <VenueCard key={venue.id} venue={venue} type={activeData.type} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
