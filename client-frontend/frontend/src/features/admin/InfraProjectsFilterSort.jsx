import FilterDropdown from '../../components/FilterDropdown';
import SortDropdown from '../../components/SortDropdown';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { typeOptions, zoneOptions, statusOptions, sortOptions } from './admInfraProjects.constants';

const InfraProjectsFilterSort = ({ filters, onAddProject }) => {
  const navigate = useNavigate();
  const {
    search,
    handleSearchChange,
    handleSearchKeyDown,
    showTypeFilter,
    handleTypeButtonClick,
    selectedType,
    handleTypeSelect,
    handleTypeFilterEnter,
    handleTypeFilterClose,
    showZoneFilter,
    handleZoneButtonClick,
    selectedZone,
    handleZoneSelect,
    handleZoneFilterEnter,
    handleZoneFilterClose,
    showStatusFilter,
    handleStatusButtonClick,
    selectedStatus,
    handleStatusSelect,
    handleStatusFilterEnter,
    handleStatusFilterClose,
    showSort,
    handleSortButtonClick,
    selectedSort,
    handleSortSelect,
    handleSortApply,
    handleSortClose,
    sortDirection,
    setSortDirection,
  } = filters;

  return (
    <>
      <div className="resource-search-actions">
        <SearchBar
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <Button variant="primary" onClick={onAddProject}>Add Project</Button>
          <button className="feedback-btn" onClick={() => navigate('/admListOfFeedbacks')}>Go to List of Feedback</button>
        </div>
      </div>
      <div className="filters-sort">
        <div className="filters">
          Filter:
          <div style={{ position: 'relative', display: 'inline-block', marginLeft: 10 }}>
            <button className="filter-btn" onClick={handleTypeButtonClick}>
              Type ▼
            </button>
            <FilterDropdown
              label="Filter by Type"
              options={typeOptions}
              selected={selectedType}
              onSelect={handleTypeSelect}
              onApply={handleTypeFilterEnter}
              onClose={handleTypeFilterClose}
              show={showTypeFilter}
            />
          </div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button className="filter-btn" onClick={handleZoneButtonClick}>
              Zone ▼
            </button>
            <FilterDropdown
              label="Filter by Zone"
              options={zoneOptions}
              selected={selectedZone}
              onSelect={handleZoneSelect}
              onApply={handleZoneFilterEnter}
              onClose={handleZoneFilterClose}
              show={showZoneFilter}
            />
          </div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button className="filter-btn" onClick={handleStatusButtonClick}>
              Status ▼
            </button>
            <FilterDropdown
              label="Filter by Status"
              options={statusOptions}
              selected={selectedStatus}
              onSelect={handleStatusSelect}
              onApply={handleStatusFilterEnter}
              onClose={handleStatusFilterClose}
              show={showStatusFilter}
            />
          </div>
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button className="sort-btn" onClick={handleSortButtonClick}>☰ Sort</button>
          <SortDropdown
            label="Sort By"
            options={sortOptions}
            selected={selectedSort}
            onSelect={handleSortSelect}
            onApply={handleSortApply}
            onClose={handleSortClose}
            show={showSort}
            sortDirection={sortDirection}
            onSortDirectionSelect={setSortDirection}
          />
        </div>
      </div>
    </>
  );
};

export default InfraProjectsFilterSort;
