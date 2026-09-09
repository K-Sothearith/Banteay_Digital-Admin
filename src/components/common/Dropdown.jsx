import { useState, useRef, useEffect } from 'react';

export const Dropdown = ({
  options = [],
  value,
  onChange,
  label,
  placeholder = 'Select option',
  className = '',
  buttonClassName = '',
  menuClassName = '',
  align = 'left'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => 
    (typeof opt === 'object' ? opt.value : opt) === value
  );

  const displayLabel = selectedOption
    ? typeof selectedOption === 'object' ? selectedOption.label : selectedOption
    : placeholder;

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center justify-between gap-2 px-3.5 py-2 text-sm font-medium rounded-xl border transition-all duration-150 cursor-pointer
          bg-white dark:bg-[#0c1733] 
          text-slate-700 dark:text-slate-200 
          border-slate-200 dark:border-[#1e3568]
          hover:border-[#4b9efe]/60 dark:hover:border-[#4b9efe]/60
          focus:outline-none focus:ring-2 focus:ring-[#4b9efe]/30
          shadow-xs ${buttonClassName}`}
        aria-expanded={isOpen}
      >
        <span className="truncate">{displayLabel}</span>
        <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 text-slate-400 ${isOpen ? 'rotate-180 text-[#4b9efe]' : ''}`}></i>
      </button>

      {/* Dropdown Menu Container: Strict 5px margin bottom & rounded border */}
      {isOpen && (
        <div
          style={{ marginTop: '5px' }}
          className={`custom-dropdown-menu absolute z-50 w-full min-w-[140px] p-1.5 
            ${align === 'right' ? 'right-0' : 'left-0'} 
            bg-white dark:bg-[#0c1733] 
            border border-slate-200 dark:border-[#1e3568] 
            rounded-xl shadow-lg backdrop-blur-md ${menuClassName}`}
        >
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {options.map((option, idx) => {
              const optVal = typeof option === 'object' ? option.value : option;
              const optLabel = typeof option === 'object' ? option.label : option;
              const isSelected = optVal === value;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onChange(optVal);
                    setIsOpen(false);
                  }}
                  className={`custom-dropdown-item w-full flex items-center justify-between px-3 py-2 text-sm text-left font-medium rounded-lg border transition-colors cursor-pointer
                    ${
                      isSelected
                        ? 'bg-[#012475]/10 dark:bg-[#4b9efe]/20 text-[#012475] dark:text-[#4b9efe] border-[#4b9efe]/40 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-[#132248] hover:border-slate-200 dark:hover:border-[#1e3568]'
                    }`}
                >
                  <span className="truncate">{optLabel}</span>
                  {isSelected && (
                    <i className="fa-solid fa-check text-xs text-[#012475] dark:text-[#4b9efe]"></i>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
