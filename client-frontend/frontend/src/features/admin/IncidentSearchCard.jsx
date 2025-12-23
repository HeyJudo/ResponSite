import { useState } from 'react';
import SearchBar from '../../components/SearchBar';

const IncidentSearchCard = ({ data, onFilteredChange }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    if (value === '') {
      onFilteredChange(data);
    } else {
      // Filter as user types
      const filtered = data.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(value.toLowerCase())
        )
      );
      onFilteredChange(filtered);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const value = e.target.value.toLowerCase();
      const filtered = data.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(value)
        )
      );
      onFilteredChange(filtered);
    }
  };

  return (
    <div className="incident-search-container">
      <SearchBar
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
    </div>
  );
};

export default IncidentSearchCard;
