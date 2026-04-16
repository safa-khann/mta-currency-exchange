import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Custom Select Component
interface CurrencyOption {
  currency: string;
  code: string;
  country: string;
  countryName:string;
  buyRate: number;
  sellRate: number;
}
interface CurrencySelectProps {
  value: string;  // The selected currency code
  onChange: (currencyCode: string) => void;  // Callback function
  options: CurrencyOption[];  // Array of currency options
}
export const CurrencySelect : React.FC<CurrencySelectProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  

  const selectedOption = options.find(opt => opt.code === value);

  return (
    <div className="w-full sm:w-auto z-50 relative cursor-pointer" ref={dropdownRef}>
      <button
        type="button"
        className="w-full text-sm cursor-pointer leading-tight px-2 py-2 border bg-grayblue-l flex items-center justify-between transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className={`flag-icon flag-icon-${selectedOption?.country} text-md`}></span>
          <span className='text-xs text-black sm:text-sm'>{selectedOption?.code}-{selectedOption?.countryName}</span>
        </div>
        <ChevronDown className={`w-4 h-4 ml-2 text-gray-800 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white w-full sm:w-60 md:w-90 border custom-scrollbar border-gray-300 shadow-lg z-100 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.code}
              className="px-2 py-2 cursor-pointer hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => {
                onChange(option.code);
                setIsOpen(false);
              }}
            >
              <span className={`flag-icon flag-icon-${option.country} text-lg w-30`}></span>
              <span className='text-black text-xs'>{option.countryName} - {option.currency} ({option.code})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};