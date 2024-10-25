import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './AddPricingModal.css';

const EditPricingModal = ({
  isEditing,
  setIsEditing,
  editingPricing,
  setEditingPricing,
  saveEditedPricing,
  countryEnums,
  currencyEnums,
}) => {
  // Synchronizacja 'from' i 'to' w przypadku edytowania
  useEffect(() => {
    if (editingPricing?.direction) {
      const [from, to] = editingPricing.direction.split('_');
      setEditingPricing((prev) => ({
        ...prev,
        from: from || '',
        to: to || '',
      }));
    }
  }, [editingPricing?.direction, setEditingPricing]);

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingPricing(null);
  };

  const addEditPriceType = () => {
    setEditingPricing((prev) => ({
      ...prev,
      priceTypes: [...prev.priceTypes, { deliveryType: '', priceForKg: 0, minPrice: 0 }],
    }));
  };

  const removeEditPriceType = (index) => {
    setEditingPricing((prev) => ({
      ...prev,
      priceTypes: prev.priceTypes.filter((_, i) => i !== index),
    }));
  };

  const handleEditPriceTypeChange = (index, field, value) => {
    const updatedPriceTypes = editingPricing.priceTypes?.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setEditingPricing((prev) => ({
      ...prev,
      priceTypes: updatedPriceTypes,
    }));
  };

  const isDeliveryTypeDuplicate = (deliveryType, index) => {
    return editingPricing.priceTypes.some((type, i) => type.deliveryType === deliveryType && i !== index);
  };

  const handleSave = () => {
    // Aktualizacja pola 'direction' przed zapisaniem
    if (editingPricing.from && editingPricing.to) {
      setEditingPricing((prev) => ({
        ...prev,
        direction: `${prev.from}_${prev.to}`,
      }));
    }

    saveEditedPricing(); // Wywołanie funkcji zapisu
  };

  return (
    <Modal
      isOpen={isEditing}
      onRequestClose={cancelEditing}
      contentLabel="Edit Pricing"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h3>Edit Pricing</h3>
        <button className="close-modal-button" onClick={cancelEditing}>&times;</button>
      </div>
      {editingPricing && (
        <>
          <fieldset className="fieldset">
            <legend className="legend">Basic Information</legend>
            <div className="direction-row">
              <div className="field-group">
                <label className="label">From</label>
                <select
                  name="from"
                  value={editingPricing.from || ''}
                  onChange={(e) => setEditingPricing({ ...editingPricing, from: e.target.value })}
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
                  value={editingPricing.courierKgFromHome}
                  onChange={(e) =>
                    setEditingPricing({
                      ...editingPricing,
                      courierKgFromHome: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="input2"
                />
              </div>
              <button
                className="reverse-button"
                onClick={() => {
                  setEditingPricing((prev) => ({
                    ...prev,
                    from: prev.to,
                    to: prev.from,
                    courierKgToHome: prev.courierKgFromHome,
                    courierKgFromHome: prev.courierKgToHome,
                  }));
                }}
              >
                &#8596;
              </button>
              <div className="field-group">
                <label className="label">To</label>
                <select
                  name="to"
                  value={editingPricing.to || ''}
                  onChange={(e) => setEditingPricing({ ...editingPricing, to: e.target.value })}
                  required
                  className="select"
                >
                  <option value="">Select Country</option>
                  {countryEnums?.__type?.enumValues?.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <label className="label2">Courier Kg To Home</label>
                <input
                  type="number"
                  value={editingPricing.courierKgToHome}
                  onChange={(e) =>
                    setEditingPricing({
                      ...editingPricing,
                      courierKgToHome: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="input2"
                />
              </div>
            </div>
            <div className="field-group2">
              <label className="label2">Courier Min Price</label>
              <input
                type="number"
                value={editingPricing.courierMinPrice}
                onChange={(e) =>
                  setEditingPricing({
                    ...editingPricing,
                    courierMinPrice: parseFloat(e.target.value) || 0,
                  })
                }
                className="input2"
              />
            </div>
            <div className="direction-row">
              <div className="field-group">
                <label className="label">Owner Type</label>
                <select
                  name="ownerType"
                  value={editingPricing.ownerType}
                  onChange={(e) => setEditingPricing({ ...editingPricing, ownerType: e.target.value })}
                  required
                  className="select"
                >
                  <option value="">Select Owner Type</option>
                  <option value="BISNES">Business</option>
                  <option value="PRIVAT">Private</option>
                </select>
              </div>
              <div className="field-group">
                <label className="label">Payment Currency</label>
                <select
                  name="paymentCurrency"
                  value={editingPricing.paymentCurrency}
                  onChange={(e) =>
                    setEditingPricing({ ...editingPricing, paymentCurrency: e.target.value })
                  }
                  required
                  className="select"
                >
                  <option value="">Select Currency</option>
                  {currencyEnums?.__type?.enumValues?.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="legend">Delivery Types & Prices</legend>
            {editingPricing.priceTypes?.map((type, index) => (
              <div key={index} className="delivery-type-block">
                <div className="field-group">
                  <label className="label">Delivery Type</label>
                  <select
                    value={type.deliveryType}
                    onChange={(e) => {
                      if (!isDeliveryTypeDuplicate(e.target.value, index)) {
                        handleEditPriceTypeChange(index, 'deliveryType', e.target.value);
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
                    onChange={(e) =>
                      handleEditPriceTypeChange(index, 'priceForKg', parseFloat(e.target.value) || 0)
                    }
                    className="input2"
                  />
                </div>
                <div className="field-group">
                  <label className="label">Min Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={type.minPrice}
                    onChange={(e) =>
                      handleEditPriceTypeChange(index, 'minPrice', parseFloat(e.target.value) || 0)
                    }
                    className="input2"
                  />
                </div>
                <button
                  className="remove-delivery-type-button"
                  onClick={() => removeEditPriceType(index)}
                >
                  &times;
                </button>
              </div>
            ))}
            <button className="add-delivery-type-button" onClick={addEditPriceType}>
              Add Delivery Type
            </button>
          </fieldset>
          <div className="modal-actions">
            <button onClick={handleSave}>Save Changes</button>
            <button className="cancel-button" onClick={cancelEditing}>
              Cancel
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default EditPricingModal;
