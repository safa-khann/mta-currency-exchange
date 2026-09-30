import { Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  buttonstyling?: string;
  placeholder?: string;
  showIconInButton?: boolean;
  id?: string;
  invalid?: boolean;
}

export function CustomSelect({
  value,
  onChange,
  options,
  className = '',
  buttonstyling = '',
  placeholder = 'Select',
  showIconInButton = true,
  id,
  invalid = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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

  // A single option is selected automatically (e.g. one branch, one payment method).
  useEffect(() => {
    if (options.length === 1 && !value) {
      onChange(options[0].value);
    }
  }, [options, value, onChange]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        id={id}
        type="button"
        className={`flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-xl border bg-white px-4 text-left text-[0.9375rem] transition-colors ${
          invalid ? 'border-danger' : 'border-line hover:border-ink/25'
        } ${buttonstyling}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-center gap-2">
          {showIconInButton && selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          <span className={`truncate ${selectedOption ? 'text-ink' : 'text-subtle'}`}>
            {selectedOption?.label || placeholder}
          </span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && options.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-float animate-fade-up"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-canvas"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span className="flex items-center gap-2">
                  {option.icon && <span className="shrink-0">{option.icon}</span>}
                  {option.label}
                </span>
                {option.value === value && <Check className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
