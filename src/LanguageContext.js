import React, { createContext, useContext, useState } from 'react';

// Tworzenie kontekstu
const LanguageContext = createContext();

// Tworzenie dostawcy
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Domyślny język

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook do używania kontekstu
export const useLanguage = () => {
    return useContext(LanguageContext);
};


export const translationsOrderForm = {
    en: {
        fromCountry: "From Country",
        toCountry: "To Country",
        deliveryType: "Delivery Type",
        paymentCurrency: "Payment from", // Restored paymentCurrency
        ownerType: "Owner Type",
        fromDoor: "From Door",
        toDoor: "To Door",
        package: "#",
        length: "Length",
        width: "Width",
        height: "Height",
        weight: "Weight",
        description: "Description",
        addPackage: "Add element",
        removePackage: "Remove Package",
        calculatePrice: "Calculate Price",
        totalPrice: "Total Price",
        email: "Email",
        phoneNumber: "Phone Number",
        createOrder: "Create Order",
        airDelivery: "Air",
        seaDelivery: "Sea",
        trainDelivery: "Train",
        privateOwner: "Private",
        businessOwner: "Business",
        // Contact Info and Address translations
        contactInformation: "Contact Information",
        fromAddress: "From Address",
        toAddress: "To Address",
        flat: "Flat",
        phone: "Phone",
        addressGoogle: "Address (Google)",
        fullName: "Full Name", // Full Name remains added
        sendOrder: "Send order",
        kurier: "Kurier delievery"
    },
    pl: {
        fromCountry: "Kraj nadania",
        toCountry: "Kraj odbioru",
        deliveryType: "Typ dostawy",
        paymentCurrency: "Płatność od", // Restored paymentCurrency
        ownerType: "Typ właściciela",
        fromDoor: "Z drzwi",
        toDoor: "Do drzwi",
        package: "#",
        length: "Długość",
        width: "Szerokość",
        height: "Wysokość",
        weight: "Waga",
        description: "Opis",
        addPackage: "Dodaj element",
        removePackage: "Usuń paczkę",
        calculatePrice: "Oblicz cenę",
        totalPrice: "Cena całkowita",
        email: "Email",
        phoneNumber: "Numer telefonu",
        createOrder: "Złóż zamówienie",
        airDelivery: "Powietrzny",
        seaDelivery: "Morski",
        trainDelivery: "Kolejowy",
        privateOwner: "Prywatny",
        businessOwner: "Firmowy",
        // Contact Info and Address translations
        contactInformation: "Informacje kontaktowe",
        fromAddress: "Adres nadawcy",
        toAddress: "Adres odbiorcy",
        flat: "Mieszkanie",
        phone: "Telefon",
        addressGoogle: "Adres (Google)",
        fullName: "Imię i nazwisko", // Full Name remains added
        sendOrder: "Złóż zamówienie",
    },
    ru: {
        fromCountry: "Страна отправления",
        toCountry: "Страна получения",
        deliveryType: "Тип доставки",
        paymentCurrency: "Оплата из", // Restored paymentCurrency
        ownerType: "Тип владельца",
        fromDoor: "От двери",
        toDoor: "До двери",
        package: "#",
        length: "Длина",
        width: "Ширина",
        height: "Высота",
        weight: "Вес",
        description: "Описание",
        addPackage: "Добавить элемент",
        removePackage: "Удалить элемент",
        calculatePrice: "Рассчитать цену",
        totalPrice: "Общая цена",
        email: "Электронная почта",
        phoneNumber: "Номер телефона",
        createOrder: "Создать заказ",
        airDelivery: "Авиаперевозка",
        seaDelivery: "Морская перевозка",
        trainDelivery: "Железнодорожная перевозка",
        privateOwner: "Частный",
        businessOwner: "Бизнес",
        // Contact Info and Address translations
        contactInformation: "Контактная информация",
        fromAddress: "Адрес отправителя",
        toAddress: "Адрес получателя",
        flat: "Квартира",
        phone: "Телефон",
        addressGoogle: "Адрес (Google)",
        fullName: "Полное имя", // Full Name remains added
        sendOrder: "Отправить заказ",
    },
};
