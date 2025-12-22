import { useState } from 'react';
import { statusOrderIncreasing, statusOrderDecreasing } from './admInfraProjects.constants';

export const useInfraProjectsFilters = (initialData) => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(initialData);

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
        initialData.filter(item =>
          Object.values(item).some(val =>
            String(val).toLowerCase().includes(value)
          )
        )
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') setFiltered(initialData);
  };

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
      initialData.filter(item =>
        item.type && item.type.toLowerCase() === selectedType.toLowerCase()
      )
    );
    setShowTypeFilter(false);
  };

  const handleTypeFilterClose = () => {
    setShowTypeFilter(false);
    setSelectedType('');
    setFiltered(initialData);
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
      initialData.filter(item =>
        item.location && item.location.toLowerCase() === selectedZone.toLowerCase()
      )
    );
    setShowZoneFilter(false);
  };

  const handleZoneFilterClose = () => {
    setShowZoneFilter(false);
    setSelectedZone('');
    setFiltered(initialData);
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
      initialData.filter(item =>
        item.status && item.status.toLowerCase() === selectedStatus.toLowerCase()
      )
    );
    setShowStatusFilter(false);
  };

  const handleStatusFilterClose = () => {
    setShowStatusFilter(false);
    setSelectedStatus('');
    setFiltered(initialData);
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
          return parseInt(b.progress) - parseInt(a.progress);
        } else {
          return parseInt(a.progress) - parseInt(b.progress);
        }
      });
    } else if (selectedSort === 'Status') {
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

  return {
    search,
    setSearch,
    filtered,
    setFiltered,
    showTypeFilter,
    setShowTypeFilter,
    selectedType,
    handleTypeSelect,
    handleTypeButtonClick,
    handleTypeFilterEnter,
    handleTypeFilterClose,
    showZoneFilter,
    setShowZoneFilter,
    selectedZone,
    handleZoneSelect,
    handleZoneButtonClick,
    handleZoneFilterEnter,
    handleZoneFilterClose,
    showStatusFilter,
    setShowStatusFilter,
    selectedStatus,
    handleStatusSelect,
    handleStatusButtonClick,
    handleStatusFilterEnter,
    handleStatusFilterClose,
    showSort,
    setShowSort,
    selectedSort,
    handleSortSelect,
    sortDirection,
    setSortDirection,
    handleSortButtonClick,
    handleSortApply,
    handleSortClose,
    handleSearchKeyDown,
    handleSearchChange,
  };
};
