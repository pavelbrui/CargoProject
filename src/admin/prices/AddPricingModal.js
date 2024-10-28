// src/components/AddPricingModal.js
import React from 'react';
import Modal from 'react-modal';
import './AddPricingModal.css';

const AddPricingModal = ({
  isAddingNew,
  setIsAddingNew,
  newPricing,
  handleNewPricingChange,
  handleNewPriceTypeChange,
  saveNewPricing,
  setNewPricing,
  countryEnums,
  currencyEnums,
}) => {
  const addNewPriceType = () => {
    setNewPricing((prev) => ({
      ...prev,
      priceTypes: [...prev.priceTypes, { deliveryType: '', priceForKg: 0, minPrice: 0 }],
    }));
  };

  const removePriceType = (index) => {
    setNewPricing((prev) => ({
      ...prev,
      priceTypes: prev.priceTypes.filter((_, i) => i !== index),
    }));
  };

  const handleReverse = () => {
    setNewPricing((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
      courierKgToHome: prev.courierKgFromHome,
      courierKgFromHome: prev.courierKgToHome,
      courierMinPriceToHome:  prev.courierMinPriceFromHome,
      courierMinPriceFromHome: prev.courierMinPriceToHome,
    }));
  };

  const isDeliveryTypeDuplicate = (deliveryType, index) => {
    return newPricing.priceTypes.some((type, i) => type.deliveryType === deliveryType && i !== index);
  };

  return (
    <Modal
      isOpen={isAddingNew}
      onRequestClose={() => setIsAddingNew(false)}
      contentLabel="Add New Pricing"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h3>Add New Pricing</h3>
        <button className="close-modal-button2" onClick={() => setIsAddingNew(false)}>&times;</button>
      </div>
      <fieldset className="fieldset">
        <legend className="legend">Basic Information</legend>
        <div className="direction-row">
          <div className="field-group">
            <label className="label">From</label>
            <select
              name="from"
              value={newPricing.from}
              onChange={(e) => handleNewPricingChange('from', e.target.value)}
              required
              className="select"
            >
              <option value="">Select Country</option>
              {countryEnums?.__type?.enumValues?.map(({ name }) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <label className="label2">Courier Kg From Home</label>
            <input
              type="number"
              value={newPricing.courierKgFromHome}
              onChange={(e) => handleNewPricingChange('courierKgFromHome', parseFloat(e.target.value) || 0)}
              className="input2"
            />
            <label className="label2">Courier Min Price</label>
          <input
            type="number"
            value={newPricing.courierMinPriceFromHome}
            onChange={(e) => handleNewPricingChange('courierMinPriceFromHome', parseFloat(e.target.value) || 0)}
            className="input2"
          />
          </div>
          
          <button className="reverse-button" onClick={handleReverse}>&#8596;</button>
          <div className="field-group">
            <label className="label">To</label>
            <select
              name="to"
              value={newPricing.to}
              onChange={(e) => handleNewPricingChange('to', e.target.value)}
              required
              className="select"
            >
              <option value="">Select Country</option>
              {countryEnums?.__type?.enumValues?.map(({ name }) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <label className="label2">Courier Kg To Home</label>
            <input
              type="number"
              value={newPricing.courierKgToHome}
              onChange={(e) => handleNewPricingChange('courierKgToHome', parseFloat(e.target.value) || 0)}
              className="input2"
            />
            <label className="label2">Courier Min Price</label>
          <input
            type="number"
            value={newPricing.courierMinPriceToHome}
            onChange={(e) => handleNewPricingChange('courierMinPriceToHome', parseFloat(e.target.value) || 0)}
            className="input2"
          />
          </div>
        </div>
        <div className="field-group2">
          
        </div>
        <div className="direction-row">
          <div className="field-group">
            <label className="label">Owner Type</label>
            <select
              name="ownerType"
              value={newPricing.ownerType}
              onChange={(e) => handleNewPricingChange('ownerType', e.target.value)}
              required
              className="select"
            >
              <option value="BISNES">Business</option>
              <option value="PRIVAT">Private</option>
            </select>
          </div>
          <div className="field-group">
            <label className="label">Payment Currency</label>
            <select
              name="paymentCurrency"
              value={newPricing.paymentCurrency}
              onChange={(e) => handleNewPricingChange('paymentCurrency', e.target.value)}
              required
              className="select"
            >
              <option value="">Select Currency</option>
              {currencyEnums?.__type?.enumValues?.map(({ name }) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="legend">Delivery Types & Prices</legend>
        {newPricing.priceTypes?.map((type, index) => (
          <div key={index} className="delivery-type-block">
            <div className="field-group">
              <label className="label">Delivery Type</label>
              <select
                value={type.deliveryType}
                onChange={(e) => {
                  if (!isDeliveryTypeDuplicate(e.target.value, index)) {
                    handleNewPriceTypeChange(index, 'deliveryType', e.target.value);
                  }
                }}
                required
                className="select"
              >
                <option value="">Select Type</option>
                <option value="AIR">Air</option>
                <option value="SEA">Sea</option>
                <option value="TRAIN">Train</option>
              </select>
            </div>
            <div className="field-group">
              <label className="label">Price per Kg</label>
              <input
                type="number"
                step="0.01"
                value={type.priceForKg}
                onChange={(e) => handleNewPriceTypeChange(index, 'priceForKg', parseFloat(e.target.value) || 0)}
                className="input2"
              />
            </div>
            <div className="field-group">
              <label className="label">Min Price</label>
              <input
                type="number"
                step="0.01"
                value={type.minPrice}
                onChange={(e) => handleNewPriceTypeChange(index, 'minPrice', parseFloat(e.target.value) || 0)}
                className="input2"
              />
            </div>
            <button className="remove-delivery-type-button" onClick={() => removePriceType(index)}>
              &times;
            </button>
          </div>
        ))}
        <button className="add-delivery-type-button" onClick={addNewPriceType}>Add Delivery Type</button>
      </fieldset>
      <div className="modal-actions">
        <button onClick={saveNewPricing}>Save New Pricing</button>
        <button className="cancel-button" onClick={() => setIsAddingNew(false)}>Cancel</button>
      </div>
    </Modal>
  );
};

export default AddPricingModal;
