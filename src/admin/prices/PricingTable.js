// src/components/PricingTable.js
import React from 'react';
import './PricingTable.css';

const PricingTable = ({ filteredPricingData, startEditingPricing }) => {
  return (
    <table className="pricing-table">
      <thead>
        <tr>
          <th>Direction</th>
          <th>Payment Currency</th>
          <th>Owner Type</th>
          <th>Courier Min Price</th>
          <th>Courier Kg To Home</th>
          <th>Courier Kg From Home</th>
          <th>Delivery Types & Prices</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredPricingData?.map((pricing) => (
          <tr key={pricing._id}>
            <td>{pricing.direction}</td>
            <td>{pricing.paymentCurrency}</td>
            <td>{pricing.ownerType}</td>
            <td>{pricing.courierMinPrice}</td>
            <td>{pricing.courierKgToHome}</td>
            <td>{pricing.courierKgFromHome}</td>
            <td>
              {pricing.priceTypes?.map((type, typeIndex) => (
                type && (
                  <div key={typeIndex}>
                    {type.deliveryType}: Min Price: {type.minPrice}, Price per Kg: {type.priceForKg}
                  </div>
                )
              ))}
            </td>
            <td>
              <button onClick={() => startEditingPricing(pricing)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PricingTable;
