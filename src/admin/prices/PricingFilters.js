// src/components/PricingFilters.js
import React from 'react';
import './PricingFilters.css';

const PricingFilters = ({
  filterText,
  setFilterText,
  filterOwnerType,
  setFilterOwnerType,
  filterPaymentCurrency,
  setFilterPaymentCurrency,
  currencyEnums,
}) => {
  return (
    <div className="filter-container">
      <div className="filter-group">
        <div className="filter-item">
          <label htmlFor="filter-direction" className="filter-label">Direction</label>
          <input
            id="filter-direction"
            type="text"
            placeholder="Filter by direction..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-item">
          <label htmlFor="filter-owner" className="filter-label">Owner Type</label>
          <select
            id="filter-owner"
            value={filterOwnerType}
            onChange={(e) => setFilterOwnerType(e.target.value)}
            className="filter-select"
          >
            <option value="">Filter by Owner Type</option>
            <option value="BISNES">BISNES</option>
            <option value="PRIVAT">PRIVAT</option>
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="filter-currency" className="filter-label">Payment Currency</label>
          <select
            id="filter-currency"
            value={filterPaymentCurrency}
            onChange={(e) => setFilterPaymentCurrency(e.target.value)}
            className="filter-select"
          >
            <option value="">Filter by Payment Currency</option>
            {currencyEnums?.__type?.enumValues?.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PricingFilters;
