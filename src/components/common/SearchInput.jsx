
export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  onClear
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <span className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center">
        <i className="fa-solid fa-magnifying-glass text-sm"></i>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border transition-all duration-200
          bg-white dark:bg-[#0c1733]
          text-slate-800 dark:text-slate-100
          placeholder-slate-400 dark:placeholder-slate-500
          border-slate-200 dark:border-[#1e3568]
          hover:border-slate-300 dark:hover:border-[#2a4a8d]
          focus:outline-none focus:border-[#4b9efe] focus:ring-2 focus:ring-[#4b9efe]/20
          shadow-xs"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            if (onClear) onClear();
            else onChange('');
          }}
          className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-[#132248] transition-colors"
          title="Clear search"
        >
          <i className="fa-solid fa-xmark text-xs"></i>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
