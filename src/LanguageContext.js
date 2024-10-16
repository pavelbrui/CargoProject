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
        courierService: "Courier Service",
        // Existing translations
        fromCountry: "From Country",
        toCountry: "To Country",
        deliveryType: "Delivery Type",
        paymentCurrency: "Payment from", // Restored paymentCurrency
        ownerType: "Owner Type",
        fromDoor: "From Door",
        toDoor: "To Door",
        element: "Element #",
        length: "Length (cm)",
        width: "Width (cm)",
        height: "Height (cm)",
        weight: "Weight (kg)",
        description: "Description",
        addElement: "Add element",
        removeElement: "Remove element",
        calculatePrice: "Calculate Price",
        totalPrice: "Total Price",
        userEmail: "Email",
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
        orderSuccess: "Your order has been sent!",
        orderDetails: "Order Details",
        from: "From",
        to: "To",
        elements: "Order Elements",
        close: "Close",

        // New tooltips and options
        ownerTypeTooltip: "Specify whether the shipment is personal or for business purposes.",
        fromCountryTooltip: "Select the country where the shipment will be sent from.",
        toCountryTooltip: "Select the country where the shipment will be received.",
        paymentCurrencyTooltip: "Choose the currency for payment.",
        deliveryTypeTooltip: "Choose how you want your shipment to be delivered.",
        usa: "USA",
        canada: "Canada",
        poland: "Poland",
        belarus: "Belarus",
        russia: "Russia",
        israel: "Israel",
    },
    pl: {
        // Existing translations
        fromCountry: "Kraj nadania",
        toCountry: "Kraj odbioru",
        deliveryType: "Typ dostawy",
        paymentCurrency: "Płatność od", // Restored "paymentCurrency"
        ownerType: "Typ właściciela",
        fromDoor: "Od drzwi",
        toDoor: "Do drzwi",
        element: "Paczka #",
        length: "Długość (cm)",
        width: "Szerokość (cm)",
        height: "Wysokość (cm)",
        weight: "Waga (kg)",
        description: "Opis",
        addElement: "Dodaj element",
        removeElement: "Usuń element",
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
        orderSuccess: "Twoje zamówienie zostało wysłane!",
        orderDetails: "Szczegóły zamówienia",
        from: "Od",
        to: "Do",
        elements: "Elementy zamówienia",
        close: "Zamknij",

        // New tooltips and options
        ownerTypeTooltip: "Określ, czy przesyłka jest osobista, czy biznesowa.",
        fromCountryTooltip: "Wybierz kraj, z którego przesyłka będzie wysyłana.",
        toCountryTooltip: "Wybierz kraj, do którego przesyłka będzie dostarczona.",
        paymentCurrencyTooltip: "Wybierz walutę płatności.",
        deliveryTypeTooltip: "Wybierz, jak chcesz, aby przesyłka była dostarczona.",
        usa: "USA",
        canada: "Kanada",
        poland: "Polska",
        belarus: "Białoruś",
        russia: "Rosja",
        israel: "Izrael",
    },
    ru: {
        // Existing translations
        fromCountry: "Страна отправления",
        toCountry: "Страна получения",
        deliveryType: "Тип доставки",
        paymentCurrency: "Оплата из", // Restored "paymentCurrency"
        ownerType: "Тип владельца",
        fromDoor: "От двери",
        toDoor: "До двери",
        element: "Посылка #",
        length: "Длина (см)",
        width: "Ширина (см)",
        height: "Высота (см)",
        weight: "Вес (кг)",
        description: "Описание",
        addElement: "Добавить элемент",
        removeElement: "Удалить элемент",
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
        orderSuccess: "Ваш заказ был отправлен!",
        orderDetails: "Детали заказа",
        from: "От",
        to: "До",
        elements: "Элементы заказа",
        close: "Закрыть",

        // New tooltips and options
        ownerTypeTooltip: "Укажите, является ли отправление личным или для бизнеса.",
        fromCountryTooltip: "Выберите страну, из которой будет отправлено отправление.",
        toCountryTooltip: "Выберите страну, в которую будет доставлено отправление.",
        paymentCurrencyTooltip: "Выберите валюту для оплаты.",
        deliveryTypeTooltip: "Выберите, каким образом вы хотите доставить отправление.",
        usa: "USA",
        canada: "Канада",
        poland: "Польша",
        belarus: "Беларусь",
        russia: "Россия",
        israel: "Израиль",
    },
};

