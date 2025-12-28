import LguSidebar from '../../features/lgu/LguSidebar';
import LguHeader from '../../features/lgu/LguHeader';
import '../../styles/resident/global.css';
import '../../styles/admin/admInfraProjects.css';
import { useInfraProjectsFilters } from '../../features/admin/useInfraProjectsFilters';
import InfraProjectsTable from '../../features/admin/InfraProjectsTable';
import infraProj from '../../API/resident/infraProj';
import FilterDropdown from '../../components/FilterDropdown';
import SortDropdown from '../../components/SortDropdown';
import SearchBar from '../../components/SearchBar';
import { typeOptions, zoneOptions, statusOptions, sortOptions } from '../../features/admin/admInfraProjects.constants';

const LguInfraProjects = () => {
  const filters = useInfraProjectsFilters(infraProj);

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
    filtered,
  } = filters;

  return (
    <div className="dashboard-root">
      <LguHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <LguSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">
                Infrastructure Projects
              </div>
              <div className="resource-search-actions">
                <SearchBar
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                />
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
              <InfraProjectsTable data={filtered} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LguInfraProjects;