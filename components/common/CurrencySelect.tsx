import { Check, ChevronDown, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

interface CurrencyOption {
  currency: string;
  code: string;
  country: string;
  countryName: string;
  buyRate: number;
  sellRate: number;
}
interface CurrencySelectProps {
  value: string; // The selected currency code
  onChange: (currencyCode: string) => void;
  options: CurrencyOption[];
  id?: string;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange, options, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.code === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) =>
      [opt.code, opt.currency, opt.countryName].some((field) => field?.toLowerCase().includes(q))
    );
  }, [options, query]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        id={id}
        type="button"
        className="flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 text-left transition-colors hover:border-ink/25"
        onClick={() => {
          if (!isOpen) setQuery('');
          setIsOpen(!isOpen);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className={`flag-icon flag-icon-${selectedOption?.country} shrink-0 rounded-[3px] text-base`} aria-hidden="true" />
          <span className="font-semibold text-ink">{selectedOption?.code}</span>
          <span className="truncate text-sm text-muted">{selectedOption?.currency}</span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-white shadow-float animate-fade-up">
          <div className="flex items-center gap-2 border-b border-line px-3">
            <Search className="h-4 w-4 text-subtle" aria-hidden="true" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search currency or country"
              aria-label="Search currency or country"
              className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-subtle"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto p-1.5">
            {filtered.map((option) => {
              const selected = option.code === value;
              return (
                <li key={option.code} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-canvas ${
                      selected ? 'bg-canvas' : ''
                    }`}
                    onClick={() => {
                      onChange(option.code);
                      setIsOpen(false);
                    }}
                  >
                    <span className={`flag-icon flag-icon-${option.country} shrink-0 rounded-[3px] text-base`} aria-hidden="true" />
                    <span className="w-10 shrink-0 text-sm font-semibold text-ink">{option.code}</span>
                    <span className="truncate text-sm text-muted">
                      {option.currency} · {option.countryName}
                    </span>
                    {selected && <Check className="ml-auto h-4 w-4 shrink-0 text-ink" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No currencies match “{query}”.</li>}
          </ul>
        </div>
      )}
    </div>
  );
};
