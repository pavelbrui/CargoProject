import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import MyOrders from './pages/MyOrders';
import Register from './pages/Register';
import { LanguageProvider, useLanguage } from './LanguageContext'; // Import kontekstu

const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="language-selector">
            <label htmlFor="language">Language:</label>
            <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="pl">Polski</option>
                <option value="ru">Русский</option>
            </select>
        </div>
    );
};

function App() {
    return (
        <LanguageProvider>
            <Router>
                <header className="app-header">
                    <nav>
                        <ul className="nav-list">
                            <li className="nav-item a">PL-CARGO</li>
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    New Order
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/my_orders"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    My Orders
                                </NavLink>
                            </li>
                            {/* <li className="nav-item"><NavLink to="/register" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Register</NavLink></li> */}
                        </ul>
                    </nav>

                    {/* Komponent wyboru języka */}
                    <LanguageSelector />
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/my_orders" element={<MyOrders />} />
                        <Route path="/register" element={<Register />} /> 
                    </Routes>
                </main>
            </Router>
        </LanguageProvider>
    );
}

export default App;
