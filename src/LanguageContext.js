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
        package: "Package #",
        length: "Length (cm)", // Added (cm)
        width: "Width (cm)", // Added (cm)
        height: "Height (cm)", // Added (cm)
        weight: "Weight (kg)", // Added (kg)
        description: "Description",
        addElement: "Add element", // Changed "Add package" to "Add element"
        removeElement: "Remove element", // Changed "Remove Package" to "Remove element"
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
        contactInformation: "Contact Information",
        fromAddress: "From Address",
        toAddress: "To Address",
        flat: "Flat",
        phone: "Phone",
        addressGoogle: "Address (Google)",
        fullName: "Full Name",
        sendOrder: "Send order",
        kurier: "Courier delivery" // Changed "Kurier" to "Courier delivery"
    },
    pl: {
        fromCountry: "Kraj nadania",
        toCountry: "Kraj odbioru",
        deliveryType: "Typ dostawy",
        paymentCurrency: "Płatność od", // Restored "paymentCurrency"
        ownerType: "Typ właściciela",
        fromDoor: "Kurierska dostawa od drzwi",
        toDoor: "Kurierska dostawa do drzwi",
        package: "Paczka #", // Clarified "Paczka #"
        length: "Długość (cm)", // Added (cm)
        width: "Szerokość (cm)", // Added (cm)
        height: "Wysokość (cm)", // Added (cm)
        weight: "Waga (kg)", // Added (kg)
        description: "Opis",
        addElement: "Dodaj element", // Changed "Dodaj paczkę" to "Dodaj element"
        removeElement: "Usuń element", // Changed "Usuń paczkę" to "Usuń element"
        calculatePrice: "Oblicz cenę",
        totalPrice: "Cena całkowita",
        userEmail: "Email",
        phoneNumber: "Numer telefonu",
        createOrder: "Złóż zamówienie",
        airDelivery: "Powietrzny",
        seaDelivery: "Morski",
        trainDelivery: "Kolejowy",
        privateOwner: "Prywatny",
        businessOwner: "Firmowy",
        contactInformation: "Informacje kontaktowe",
        fromAddress: "Adres nadawcy",
        toAddress: "Adres odbiorcy",
        flat: "Mieszkanie",
        phone: "Telefon",
        addressGoogle: "Adres (Google)",
        fullName: "Imię i nazwisko",
        sendOrder: "Złóż zamówienie",
    },
    ru: {
        fromCountry: "Страна отправления",
        toCountry: "Страна получения",
        deliveryType: "Тип доставки",
        paymentCurrency: "Оплата из", // Restored "paymentCurrency"
        ownerType: "Тип владельца",
        fromDoor: "От двери",
        toDoor: "До двери",
        package: "Посылка #", // Clarified "Посылка #"
        length: "Длина (см)", // Added (см)
        width: "Ширина (см)", // Added (см)
        height: "Высота (см)", // Added (см)
        weight: "Вес (кг)", // Added (кг)
        description: "Описание",
        addElement: "Добавить элемент", // Changed "Добавить пакет" to "Добавить элемент"
        removeElement: "Удалить элемент", // Changed "Удалить пакет" to "Удалить элемент"
        calculatePrice: "Рассчитать цену",
        totalPrice: "Общая цена",
        userEmail: "Электронная почта",
        phoneNumber: "Номер телефона",
        createOrder: "Создать заказ",
        airDelivery: "Авиаперевозка",
        seaDelivery: "Морская перевозка",
        trainDelivery: "Железнодорожная перевозка",
        privateOwner: "Частный",
        businessOwner: "Бизнес",
        contactInformation: "Контактная информация",
        fromAddress: "Адрес отправителя",
        toAddress: "Адрес получателя",
        flat: "Квартира",
        phone: "Телефон",
        addressGoogle: "Адрес (Google)",
        fullName: "Полное имя",
        sendOrder: "Отправить заказ",
    },
};

