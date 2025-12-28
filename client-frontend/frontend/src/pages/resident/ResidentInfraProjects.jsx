import ResidentSidebar from '../../features/resident/ResidentSidebar';
import ResidentHeader from '../../features/resident/ResidentHeader';


import '../../styles/resident/global.css';
import '../../styles/resident/resInfraProjects.css';
import FilterDropdown from '../../components/FilterDropdown';
import SortDropdown from '../../components/SortDropdown';
import SortDirectionCard from '../../components/SortDirectionCard';
import SearchBar from '../../components/SearchBar';

import infraProj from '../../API/resident/infraProj';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  "In Progress": "status-inprogress",
  "Completed": "status-completed",
  "Planned": "status-planned",
  "Delayed": "status-delayed"
};

const ResidentInfraProjects = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(infraProj);

  // Type filter
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  // Zone filter
  const [showZoneFilter, setShowZoneFilter] = useState(false);
  const [selectedZone, setSelectedZone] = useState('');
  // Status filter
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  // Sort
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const value = e.target.value.toLowerCase();
      setFiltered(
        infraProj.filter(item =>
          Object.values(item).some(val =>
            String(val).toLowerCase().includes(value)
          )
        )
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') setFiltered(infraProj);
  };


  const typeOptions = ['Bridge', 'Building', 'Drainage', 'Road', 'Other'];
  const zoneOptions = ['Zone 1', 'Zone 2', 'Zone 3'];
  const statusOptions = ['Planned', 'In Progress', 'Completed', 'Delayed'];
  const sortOptions = ['Start Date', 'Progress', 'Status'];


  // Type filter handlers
  const handleTypeButtonClick = () => {
    setShowTypeFilter((prev) => !prev);
    setShowZoneFilter(false);
    setShowStatusFilter(false);
    setShowSort(false);
  };
  const handleTypeSelect = (type) => setSelectedType(type);
  const handleTypeFilterEnter = () => {
    setFiltered(
      infraProj.filter(item =>
        item.type && item.type.toLowerCase() === selectedType.toLowerCase()
      )
    );
    setShowTypeFilter(false);
  };
  const handleTypeFilterClose = () => {
    setShowTypeFilter(false);
    setSelectedType('');
    setFiltered(infraProj);
  };

  // Zone filter handlers
  const handleZoneButtonClick = () => {
    setShowZoneFilter((prev) => !prev);
    setShowTypeFilter(false);
    setShowStatusFilter(false);
    setShowSort(false);
  };
  const handleZoneSelect = (zone) => setSelectedZone(zone);
  const handleZoneFilterEnter = () => {
    setFiltered(
      infraProj.filter(item =>
        item.location && item.location.toLowerCase() === selectedZone.toLowerCase()
      )
    );
    setShowZoneFilter(false);
  };
  const handleZoneFilterClose = () => {
    setShowZoneFilter(false);
    setSelectedZone('');
    setFiltered(infraProj);
  };

  // Status filter handlers
  const handleStatusButtonClick = () => {
    setShowStatusFilter((prev) => !prev);
    setShowTypeFilter(false);
    setShowZoneFilter(false);
    setShowSort(false);
  };
  const handleStatusSelect = (status) => setSelectedStatus(status);
  const handleStatusFilterEnter = () => {
    setFiltered(
      infraProj.filter(item =>
        item.status && item.status.toLowerCase() === selectedStatus.toLowerCase()
      )
    );  
    setShowStatusFilter(false);
  };
  const handleStatusFilterClose = () => {
    setShowStatusFilter(false);
    setSelectedStatus('');
    setFiltered(infraProj);
  };

  // Sort handlers
  const handleSortButtonClick = () => {
    setShowSort((prev) => !prev);
    setShowTypeFilter(false);
    setShowZoneFilter(false);
    setShowStatusFilter(false);
  };
  const handleSortSelect = (sort) => {
    setSelectedSort(sort);
    if (sort !== 'Start Date') setSortDirection('');
  };
  const handleSortApply = () => {
    let sorted = [...filtered];
    if (selectedSort === 'Start Date') {
      sorted.sort((a, b) => {
        if (sortDirection === 'Old to New') {
          return new Date(a.startDate) - new Date(b.startDate);
        } else {
          return new Date(b.startDate) - new Date(a.startDate);
        }
      });
    } else if (selectedSort === 'Progress') {
      sorted.sort((a, b) => {
        if (sortDirection === 'Finish to Start') {
          return parseInt(b.progress) - parseInt(a.progress); // 100% to 0%
        } else {
          return parseInt(a.progress) - parseInt(b.progress); // 0% to 100%
        }
      });
    } else if (selectedSort === 'Status') {
      // Custom order for status
      const statusOrderIncreasing = ['Planned', 'Delayed', 'In Progress', 'Completed'];
      const statusOrderDecreasing = ['Completed', 'In Progress', 'Delayed', 'Planned'];
      const order = sortDirection === 'Decreasing' ? statusOrderDecreasing : statusOrderIncreasing;
      sorted.sort((a, b) => {
        return order.indexOf(a.status) - order.indexOf(b.status);
      });
    }
    setFiltered(sorted);
    setShowSort(false);
  };
  const handleSortClose = () => {
    setShowSort(false);
    setSelectedSort('');
    setSortDirection('');
  };

  return (
    <div className="dashboard-root">
      <ResidentHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <ResidentSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
      <div className="resource-form-header">Infrastructure Projects</div>
      <div className="resource-search-actions">
        <SearchBar
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        <button className="feedback-btn">Go to List of Feedback</button>
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
      <div className="resource-table-container">
        <table className="incident-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Location/Zone</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Start Date</th>
              <th>Target End Date</th>
              <th>Budget</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={idx} onClick={() => navigate('/residentInfraProjectsDet', { state: { project: item } })} style={{ cursor: 'pointer' }}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.location}</td>
                <td>
                  <span className={`status-chip ${statusColors[item.status] || ""}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.progress}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResidentInfraProjects;