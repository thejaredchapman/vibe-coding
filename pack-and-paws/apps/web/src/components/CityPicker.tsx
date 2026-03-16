import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Search } from 'lucide-react';

interface City {
  id: string;
  name: string;
  state: string;
}

interface CityPickerProps {
  cities: City[];
  value: string;
  onChange: (cityId: string) => void;
  placeholder: string;
  excludeId?: string;
}

export default function CityPicker({ cities, value, onChange, placeholder, excludeId }: CityPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const selected = cities.find((c) => c.id === value);

  const filtered = cities
    .filter((c) => c.id !== excludeId)
    .filter((c) =>
      `${c.name} ${c.state}`.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-sand-200 bg-white text-left hover:border-forest-300 transition-colors"
      >
        <MapPin className="h-4 w-4 text-forest-500 flex-shrink-0" />
        <span className={`flex-1 truncate ${selected ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
          {selected ? `${selected.name}, ${selected.state}` : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white rounded-xl border border-sand-200 shadow-xl max-h-64 overflow-hidden">
          <div className="p-2 border-b border-sand-100">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sand-50">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cities..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-48">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-400 text-center">No cities found</div>
            ) : (
              filtered.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => {
                    onChange(city.id);
                    setOpen(false);
                    setSearch('');
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-forest-50 transition-colors flex items-center gap-2 ${
                    city.id === value ? 'bg-forest-50 text-forest-700 font-medium' : 'text-slate-700'
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                  {city.name}, {city.state}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
