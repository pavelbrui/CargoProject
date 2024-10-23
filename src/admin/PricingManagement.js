// src/components/PricingManagement.js
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRICINGS, GET_ENUM } from '../graphql/queries';
import { UPDATE_DIRECTION_PRICING, ADD_NEW_PRICING } from '../graphql/mutations';
import './PricingManagement.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PricingManagement = () => {
  const [pricingData, setPricingData] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPricing, setNewPricing] = useState({
    from: '',
    to: '',
    paymentCurrency: 'USD',
    ownerType: 'BISNES',
    priceTypes: [{ deliveryType: 'AIR', priceForKg: 0, minPrice: 0 }],
    courierMinPrice: 0,
    courierKgToHome: 0,
    courierKgFromHome: 0,
  });
  const [editingPricing, setEditingPricing] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filterOwnerType, setFilterOwnerType] = useState('');
  const [filterPaymentCurrency, setFilterPaymentCurrency] = useState('');

  const teamId = localStorage.getItem('currentTeamId');
  const token = localStorage.getItem('token');

  // Queries
  const { data: countryEnums, loading: loadingCountries, error: errorCountries } = useQuery(GET_ENUM, {
    variables: { enumName: "Country" },
  });
  const { data: currencyEnums, loading: loadingCurrencies, error: errorCurrencies } = useQuery(GET_ENUM, {
    variables: { enumName: "CountryCurrency" },
  });

  const { data, loading, error, refetch } = useQuery(GET_PRICINGS, {
    variables: { teamId },
    context: { headers: { Authorization: `${token}` } },
    fetchPolicy: 'network-only',
  });

  // Mutations
  const [updatePricing] = useMutation(UPDATE_DIRECTION_PRICING, {
    context: { headers: { Authorization: `${token}` } },
    onCompleted: () => {
      setIsEditing(false);
      refetch();
    },
  });

  const [addPricing] = useMutation(ADD_NEW_PRICING, {
    context: { headers: { Authorization: `${token}` } },
    onCompleted: () => {
      setIsAddingNew(false);
      refetch();
    },
  });

  useEffect(() => {
    if (data && data.admin && data.admin.getPricings) {
      setPricingData(data.admin.getPricings);
    }
  }, [data]);

  const startEditingPricing = (pricing) => {
    setEditingPricing(pricing);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingPricing(null);
  };

  const saveEditedPricing = () => {
    if (!editingPricing || !editingPricing._id) {
      console.error('Error: Pricing ID is missing for the update.');
      return;
    }

    const input = {
      direction: `${editingPricing.from}_${editingPricing.to}`,
      paymentCurrency: editingPricing.paymentCurrency,
      ownerType: editingPricing.ownerType,
      priceTypes: editingPricing.priceTypes?.map(({ __typename, ...rest }) => rest),
      courierMinPrice: editingPricing.courierMinPrice,
      courierKgToHome: editingPricing.courierKgToHome,
      courierKgFromHome: editingPricing.courierKgFromHome,
    };

    updatePricing({ variables: { teamId, _id: editingPricing._id, price: input } });
  };

  const handleEditInputChange = (field, value) => {
    if (editingPricing) {
      setEditingPricing((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleEditPriceTypeChange = (index, field, value) => {
    if (editingPricing) {
      const updatedPriceTypes = editingPricing.priceTypes?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      setEditingPricing((prev) => ({
        ...prev,
        priceTypes: updatedPriceTypes,
      }));
    }
  };

  const handleNewPricingChange = (field, value) => {
    setNewPricing((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewPriceTypeChange = (index, field, value) => {
    const updatedPriceTypes = newPricing.priceTypes?.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setNewPricing((prev) => ({
      ...prev,
      priceTypes: updatedPriceTypes,
    }));
  };

  const addNewPriceType = () => {
    setNewPricing((prev) => ({
      ...prev,
      priceTypes: [...prev.priceTypes, { deliveryType: 'AIR', priceForKg: 0, minPrice: 0 }],
    }));
  };

  const saveNewPricing = () => {
    const input = {
      direction: `${newPricing.from}_${newPricing.to}`,
      paymentCurrency: newPricing.paymentCurrency,
      ownerType: newPricing.ownerType,
      priceTypes: newPricing.priceTypes,
      courierMinPrice: newPricing.courierMinPrice,
      courierKgToHome: newPricing.courierKgToHome,
      courierKgFromHome: newPricing.courierKgFromHome,
    };

    addPricing({ variables: { teamId, input } });
  };

  const filteredPricingData = pricingData.filter((pricing) => {
    if (!pricing || !pricing.direction) return false;
    const matchesFilterText = filterText ? pricing.direction.includes(filterText) : true;
    const matchesOwnerType = filterOwnerType ? pricing.ownerType === filterOwnerType : true;
    const matchesPaymentCurrency = filterPaymentCurrency ? pricing.paymentCurrency === filterPaymentCurrency : true;
    return matchesFilterText && matchesOwnerType && matchesPaymentCurrency;
  });

  if (loading || loadingCountries || loadingCurrencies) return <p>Loading...</p>;
  if (error || errorCountries || errorCurrencies) return <p>Error: {error?.message || errorCountries?.message || errorCurrencies?.message}</p>;

  return (
    <div className="pricing-management-container">
      <h2>Pricing Management</h2>

      {/* Filter Input */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by direction..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <select
          value={filterOwnerType}
          onChange={(e) => setFilterOwnerType(e.target.value)}
        >
          <option value="">Filter by Owner Type</option>
          <option value="BISNES">BISNES</option>
          <option value="PRIVAT">PRIVAT</option>
        </select>
        <select
          value={filterPaymentCurrency}
          onChange={(e) => setFilterPaymentCurrency(e.target.value)}
        >
          <option value="">Filter by Payment Currency</option>
          {currencyEnums?.__type?.enumValues?.map(({ name }) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* Pricing Table */}
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

      {/* Add New Pricing Modal */}
      <Modal
        isOpen={isAddingNew}
        onRequestClose={() => setIsAddingNew(false)}
        contentLabel="Add New Pricing"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>Add New Pricing</h3>
        {/* Modal content for adding new pricing */}
        <fieldset>
          <legend>Basic Information</legend>
          <label>
            From
            <select value={newPricing.from} onChange={(e) => handleNewPricingChange('from', e.target.value)}>
              <option value="">Select Country</option>
              {countryEnums?.__type?.enumValues?.map(({ name }) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>
          <label>
            To
            <select value={newPricing.to} onChange={(e) => handleNewPricingChange('to', e.target.value)}>
              <option value="">Select Country</option>
              {countryEnums?.__type?.enumValues?.map(({ name }) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>
          <label>
            Payment Currency
            <select value={newPricing.paymentCurrency} onChange={(e) => handleNewPricingChange('paymentCurrency', e.target.value)}>
              {currencyEnums?.__type?.enumValues?.map(({ name }) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>
        </fieldset>
        <fieldset>
          <legend>Courier Information</legend>
          <label>
            Courier Kg To Home
            <input type="number" value={newPricing.courierKgToHome} onChange={(e) => handleNewPricingChange('courierKgToHome', parseFloat(e.target.value) || 0)} />
          </label>
          <label>
            Courier Kg From Home
            <input type="number" value={newPricing.courierKgFromHome} onChange={(e) => handleNewPricingChange('courierKgFromHome', parseFloat(e.target.value) || 0)} />
          </label>
        </fieldset>
        <fieldset>
          <legend>Delivery Types & Prices</legend>
          {newPricing.priceTypes?.map((type, index) => (
            <div key={index}>
              <label>
                Delivery Type
                <select value={type.deliveryType} onChange={(e) => handleNewPriceTypeChange(index, 'deliveryType', e.target.value)}>
                  <option value="AIR">Air</option>
                  <option value="SEA">Sea</option>
                  <option value="TRAIN">Train</option>
                </select>
              </label>
              <label>
                Price per Kg
                <input type="number" value={type.priceForKg} onChange={(e) => handleNewPriceTypeChange(index, 'priceForKg', parseFloat(e.target.value) || 0)} />
              </label>
            </div>
          ))}
          <button onClick={addNewPriceType}>Add Delivery Type</button>
        </fieldset>
        <button onClick={saveNewPricing}>Save New Pricing</button>
        <button onClick={() => setIsAddingNew(false)}>Cancel</button>
      </Modal>

      {/* Button to Add New Pricing */}
      <button className="add-new-pricing" onClick={() => setIsAddingNew(true)}>Add New Pricing</button>

      {/* Edit Pricing Modal */}
      <Modal
        isOpen={isEditing}
        onRequestClose={cancelEditing}
        contentLabel="Edit Pricing"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>Edit Pricing</h3>
        {editingPricing && (
          <>
            <fieldset>
              <legend>Basic Information</legend>
              <label>
                From
                <input type="text" value={editingPricing.from} onChange={(e) => handleEditInputChange('from', e.target.value)} />
              </label>
              <label>
                To
                <input type="text" value={editingPricing.to} onChange={(e) => handleEditInputChange('to', e.target.value)} />
              </label>
              <label>
                Payment Currency: {editingPricing.paymentCurrency}
              </label>
            </fieldset>
            <fieldset>
              <legend>Courier Information</legend>
              <label>
                Courier Kg To Home
                <input type="number" value={editingPricing.courierKgToHome} onChange={(e) => handleEditInputChange('courierKgToHome', parseFloat(e.target.value) || 0)} />
              </label>
              <label>
                Courier Kg From Home
                <input type="number" value={editingPricing.courierKgFromHome} onChange={(e) => handleEditInputChange('courierKgFromHome', parseFloat(e.target.value) || 0)} />
              </label>
            </fieldset>
            <fieldset>
              <legend>Delivery Types & Prices</legend>
              {editingPricing.priceTypes?.map((type, index) => (
                <div key={index}>
                  <label>
                    Delivery Type
                    <select value={type.deliveryType} onChange={(e) => handleEditPriceTypeChange(index, 'deliveryType', e.target.value)}>
                      <option value="AIR">Air</option>
                      <option value="SEA">Sea</option>
                      <option value="TRAIN">Train</option>
                    </select>
                  </label>
                  <label>
                    Price per Kg
                    <input type="number" value={type.priceForKg} onChange={(e) => handleEditPriceTypeChange(index, 'priceForKg', parseFloat(e.target.value) || 0)} />
                  </label>
                </div>
              ))}
            </fieldset>
            <button onClick={saveEditedPricing}>Save Changes</button>
            <button onClick={cancelEditing}>Cancel</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PricingManagement;
