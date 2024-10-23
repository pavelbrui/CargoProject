// src/components/OrderFilters.js
import React from 'react';
import './OrderFilters.css';

const OrderFilters = ({
  fromCountry,
  toCountry,
  deliveryType,
  ownerType,
  fromDoor,
  toDoor,
  status,
  dateFilter,
  countryEnums,
  deliveryTypeEnums,
  ownerTypeEnums,
  statusEnums,
  handleDateFilterChange,
  setFromCountry,
  setToCountry,
  setDeliveryType,
  setOwnerType,
  setFromDoor,
  setToDoor,
  setStatus,
  handleSwapCountries,
}) => {
  return (
    <div className="filter-container">
      <label>
        From Country:
        <select value={fromCountry} onChange={(e) => setFromCountry(e.target.value)} className="select-field">
          <option value="">Select Country</option>
          {countryEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <button className="swap-countries-button" onClick={handleSwapCountries}>
        ↔
      </button>
      <label>
        To Country:
        <select value={toCountry} onChange={(e) => setToCountry(e.target.value)} className="select-field">
          <option value="">Select Country</option>
          {countryEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label>
        Delivery Type:
        <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} className="select-field">
          <option value="">Select Delivery Type</option>
          {deliveryTypeEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label>
        Owner Type:
        <select value={ownerType} onChange={(e) => setOwnerType(e.target.value)} className="select-field">
          <option value="">Select Owner Type</option>
          {ownerTypeEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label>
        From Door:
        <input
          type="checkbox"
          checked={fromDoor}
          onChange={(e) => setFromDoor(e.target.checked ? 'true' : '')}
          className="checkbox-field"
        />
      </label>
      <label>
        To Door:
        <input
          type="checkbox"
          checked={toDoor}
          onChange={(e) => setToDoor(e.target.checked ? 'true' : '')}
          className="checkbox-field"
        />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="select-field">
          <option value="">Select Status</option>
          {statusEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <input
        type="date"
        placeholder="From Date"
        value={dateFilter.from}
        onChange={(e) => handleDateFilterChange('from', e.target.value)}
        className="date-filter-input"
      />
      <input
        type="date"
        placeholder="To Date"
        value={dateFilter.to}
        onChange={(e) => handleDateFilterChange('to', e.target.value)}
        className="date-filter-input"
      />
    </div>
  );
};

export default OrderFilters;
