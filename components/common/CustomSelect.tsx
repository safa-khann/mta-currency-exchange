import { Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode; // Add icon prop
  color?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  buttonstyling?: string;
  placeholder?: string;
  showIconInButton?: boolean; // Control whether to show icon in button
}

export function CustomSelect({ 
  value, 
  onChange, 
  options, 
  className = '', 
  buttonstyling = '',
  placeholder = 'Select',
  showIconInButton = true // Default to true
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use first option as selected if no value is provided
//   const selectedOption = options.find(opt => opt.value === value) || options[0];
const selectedOption = options.find(opt => opt.value === value);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (options.length === 1 && !value) {
      onChange(options[0].value);
    }
  }, [options, value, onChange]);


  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected option display */}
      <button
        type="button"
        className={`${buttonstyling}
          w-full transition-all duration-200 cursor-pointer flex items-center justify-between
          
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {/* Show icon if provided and showIconInButton is true */}
          {showIconInButton && selectedOption?.icon && (
            <span className="flex-shrink-0">
              {selectedOption.icon}
            </span>
          )}
          <span className="font-medium truncate">
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 ml-2 text-gray-800 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && options.length > 0 && (
        <div className="absolute z-80 mt-1 w-full bg-white border border-gray-200 shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`
                w-full p-2 text-left text-xs 
                flex items-center justify-between
                hover:bg-gray-50 cursor-pointer
                transition-colors duration-150
               
              `}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                {/* Show icon in dropdown items */}
                {option.icon && (
                  <span className="flex-shrink-0">
                    {option.icon}
                  </span>
                )}
                {option.label}
              </div>
              {option.value === value && (
                <Check className="w-4 h-4 text-gray-800" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

        //  className={`
        //   w-full sm:w-48 md:w-32 px-4 py-2.5 text-xs sm:text-sm
        //   flex items-center justify-between
        //   border border-gray-300 rounded-lg 
        //   bg-white text-gray-700
        //   hover:border-gray-400 
        //   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        //   transition-all duration-200
        // `}