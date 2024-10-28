// src/components/PricingModals.js
import React from 'react';
import AddPricingModal from './AddPricingModal';
import EditPricingModal from './EditPricingModal';
import { useMutation } from '@apollo/client';
import { ADD_NEW_PRICING, UPDATE_DIRECTION_PRICING } from '../../graphql/mutations';

const PricingModals = ({
  isAddingNew,
  setIsAddingNew,
  isEditing,
  setIsEditing,
  newPricing,
  setNewPricing,
  handleNewPricingChange,
  handleNewPriceTypeChange,
  editingPricing,
  setEditingPricing,
  refetch,
  countryEnums,
  currencyEnums,
}) => {
  const [addPricing] = useMutation(ADD_NEW_PRICING, {
    context: { headers: { Authorization: localStorage.getItem('token') } },
  });

  const [updatePricing] = useMutation(UPDATE_DIRECTION_PRICING, {
    context: { headers: { Authorization: localStorage.getItem('token') } },
  });

  const saveNewPricing = () => {
    if (!newPricing.from || !newPricing.to) {
      console.error('Error: From and To fields are required.');
      return;
    }

    const input = {
      direction: `${newPricing.from}_${newPricing.to}`,
      paymentCurrency: newPricing.paymentCurrency,
      ownerType: newPricing.ownerType,
      priceTypes: newPricing.priceTypes,
      courierMinPriceFromHome: newPricing.courierMinPriceFromHome,
      courierMinPriceToHome: newPricing.courierMinPriceToHome,
      courierKgToHome: newPricing.courierKgToHome,
      courierKgFromHome: newPricing.courierKgFromHome,
    };

    addPricing({ variables: { teamId: localStorage.getItem('currentTeamId'), input } })
      .then(() => {
        setIsAddingNew(false);
        refetch();
      })
      .catch((err) => {
        console.error('Error adding new pricing:', err);
      });
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
      courierMinPriceFromHome: editingPricing.courierMinPriceFromHome,
      courierMinPriceToHome: editingPricing.courierMinPriceToHome,
      courierKgToHome: editingPricing.courierKgToHome,
      courierKgFromHome: editingPricing.courierKgFromHome,
    };

    updatePricing({ variables: { teamId: localStorage.getItem('currentTeamId'), _id: editingPricing._id, price: input } })
      .then(() => {
        setIsEditing(false);
        refetch();
      })
      .catch((err) => {
        console.error('Error updating pricing:', err);
      });
  };

  return (
    <>
      <AddPricingModal
        isAddingNew={isAddingNew}
        setIsAddingNew={setIsAddingNew}
        newPricing={newPricing}
        setNewPricing={setNewPricing}
        handleNewPricingChange={handleNewPricingChange}
        handleNewPriceTypeChange={handleNewPriceTypeChange}
        saveNewPricing={saveNewPricing}
        countryEnums={countryEnums}
        currencyEnums={currencyEnums}
      />
      <EditPricingModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingPricing={editingPricing}
        setEditingPricing={setEditingPricing}
        saveEditedPricing={saveEditedPricing}
        countryEnums={countryEnums}
        currencyEnums={currencyEnums}
      />
    </>
  );
};

export default PricingModals;
