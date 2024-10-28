// src/components/PricingTable.js
import React from 'react';
import './PricingTable.css';

const PricingTable = ({ filteredPricingData, startEditingPricing }) => {
  const renderPriceTypesCompact = (priceTypes) => {
    return priceTypes?.map((type, index) => (
      <div key={index} className="price-type-compact">
        {type.deliveryType}: Min: {type.minPrice ? `$${type.minPrice.toFixed(2)}` : 'N/A'}, Kg: {type.priceForKg ? `$${type.priceForKg.toFixed(2)}` : 'N/A'}
      </div>
    ));
  };

  return (
    <div className="pricing-table-container">
      <table className="pricing-table">
        <thead>
          <tr>
            <th>Direction</th>
            <th>Payment Currency</th>
            <th>Owner Type</th>
            <th>Courier From (Min Price & Kg)</th>
            <th>Courier To (Min Price & Kg)</th>
            <th>Delivery Types & Prices</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPricingData?.length > 0 ? (
            filteredPricingData.map((pricing) => (
              <tr key={pricing._id}>
                <td>{pricing.direction}</td>
                <td>{pricing.paymentCurrency}</td>
                <td>{pricing.ownerType}</td>
                <td>
                  Min: {pricing.courierMinPriceFromHome ? `$${pricing.courierMinPriceFromHome.toFixed(2)}` : 'N/A'}, Kg: {pricing.courierKgFromHome ? `$${pricing.courierKgFromHome.toFixed(2)}` : 'N/A'}
                </td>
                <td>
                  Min: {pricing.courierMinPriceToHome ? `$${pricing.courierMinPriceToHome.toFixed(2)}` : 'N/A'}, Kg: {pricing.courierKgToHome ? `$${pricing.courierKgToHome.toFixed(2)}` : 'N/A'}
                </td>
                <td>{renderPriceTypesCompact(pricing.priceTypes)}</td>
                <td>
                  <button className="edit-button" onClick={() => startEditingPricing(pricing)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data-message">
                No pricing data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;

