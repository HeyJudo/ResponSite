const SearchBar = ({ placeholder = 'Search', value, onChange, onKeyDown }) => {
  return (
    <div className="search-input-wrapper">
      <span className="search-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="7" stroke="#888" strokeWidth="2"/>
          <line x1="14.4142" y1="14" x2="18" y2="17.5858" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </span>
      <input
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default SearchBar;
