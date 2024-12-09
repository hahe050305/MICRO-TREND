import React from 'react';
import './Filter.css';

function Filter({ onFilterChange }) {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter">
      <label htmlFor="category">Filter by Category:</label>
      <select id="category" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="beauty">Beauty</option>
      </select>
    </div>
  );
}

export default Filter;
