// src/components/PricingManagement.js
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRICINGS, GET_ENUM } from '../../graphql/queries';
import './PricingManagement.css';
import PricingTable from './PricingTable';
import PricingFilters from './PricingFilters';
import PricingModals from './PricingModals';

const PricingManagement = () => {
  const [pricingData, setPricingData] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPricing, setNewPricing] = useState({
    from: '',
    to: '',
    paymentCurrency: 'USD',
    ownerType: undefined,
    priceTypes: [{ deliveryType: 'AIR', priceForKg: 0, minPrice: 0 }],
    courierMinPriceFromHome: 0,
    courierMinPriceToHome: 0,
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

  useEffect(() => {
    if (data && data.admin && data.admin.getPricings) {
      setPricingData(data.admin.getPricings);
    }
  }, [data]);

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
      <PricingFilters
        filterText={filterText}
        setFilterText={setFilterText}
        filterOwnerType={filterOwnerType}
        setFilterOwnerType={setFilterOwnerType}
        filterPaymentCurrency={filterPaymentCurrency}
        setFilterPaymentCurrency={setFilterPaymentCurrency}
        countryEnums={countryEnums}
        currencyEnums={currencyEnums}
      />
      <PricingTable
        filteredPricingData={filteredPricingData}
        startEditingPricing={(pricing) => {
          setEditingPricing(pricing);
          setIsEditing(true);
        }}
      />
      <PricingModals
        isAddingNew={isAddingNew}
        setIsAddingNew={setIsAddingNew}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        newPricing={newPricing}
        setNewPricing={setNewPricing}
        handleNewPricingChange={handleNewPricingChange}
        handleNewPriceTypeChange={handleNewPriceTypeChange}
        editingPricing={editingPricing}
        setEditingPricing={setEditingPricing}
        refetch={refetch}
        countryEnums={countryEnums}
        currencyEnums={currencyEnums}
      />
      <button className="add-new-pricing" onClick={() => setIsAddingNew(true)}>Add New Pricing</button>
    </div>
  );
};

export default PricingManagement;
