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
      <div className="field-group-small-centered">
        <label>
          From:
          <select value={fromCountry} onChange={(e) => setFromCountry(e.target.value)} className="select-field">
            <option value="">Select</option>
            {countryEnums?.__type?.enumValues?.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <label className="checkbox-group-under-select">
          From door:
          <input
            type="checkbox"
            checked={fromDoor}
            onChange={(e) => setFromDoor(e.target.checked ? 'true' : '')}
            className="checkbox-field"
          />
        </label>
      </div>
      
      <button className="swap-countries-button" onClick={handleSwapCountries}>
        ↔
      </button>
      
      <div className="field-group-small-centered">
        <label>
          To:
          <select value={toCountry} onChange={(e) => setToCountry(e.target.value)} className="select-field">
            <option value="">Select</option>
            {countryEnums?.__type?.enumValues?.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <label className="checkbox-group-under-select">
          To door:
          <input
            type="checkbox"
            checked={toDoor}
            onChange={(e) => setToDoor(e.target.checked ? 'true' : '')}
            className="checkbox-field"
          />
        </label>
      </div>

      <label>
        Delivery:
        <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} className="select-field">
          <option value="">Select</option>
          {deliveryTypeEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label>
        Owner:
        <select value={ownerType} onChange={(e) => setOwnerType(e.target.value)} className="select-field">
          <option value="">Select</option>
          {ownerTypeEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="select-field">
          <option value="">Select</option>
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
