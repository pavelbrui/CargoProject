// src/admin/UserFilters.js
import React from 'react';
import './UserFilters.css';

const UserFilters = ({
  country, role, status,
  countryEnums, roleEnums, statusEnums,
  setCountry, setRole, setStatus,
  handleDateFilterChange,
  dateFilter = { from: '', to: '' } // Default value
}) => {
  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div className="filter-container">
      <label>
        Country:
        <select value={country} onChange={handleFilterChange(setCountry)} className="select-field">
          <option value="">Select Country</option>
          {countryEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label>
        Role:
        <select value={role} onChange={handleFilterChange(setRole)} className="select-field">
          <option value="">Select Role</option>
          {roleEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label>
        Status:
        <select value={status} onChange={handleFilterChange(setStatus)} className="select-field">
          <option value="">Select Status</option>
          {statusEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label>
        From Date:
        <input
          type="date"
          value={dateFilter?.from || ''} // Optional chaining to avoid errors
          onChange={(e) => handleDateFilterChange('from', e.target.value)}
          className="date-filter-input"
        />
      </label>
      <label>
        To Date:
        <input
          type="date"
          value={dateFilter?.to || ''} // Optional chaining to avoid errors
          onChange={(e) => handleDateFilterChange('to', e.target.value)}
          className="date-filter-input"
        />
      </label>
    </div>
  );
};

export default UserFilters;
