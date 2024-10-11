import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import MyOrders from './pages/MyOrders';
//import Login from './pages/Login';
//import Register from './pages/Register';
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
                            <li className="nav-item"><Link to="/">New Order</Link></li>
                            <li className="nav-item"><Link to="/my_orders">My orders</Link></li>
                           {/* <li className="nav-item"><Link to="/register">Register</Link></li>*/}
                        </ul>
                    </nav>

                    {/* Komponent wyboru języka */}
                    <LanguageSelector />
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/my_orders" element={<MyOrders />} />
                       {/* <Route path="/register" element={<Register />} /> */}
                    </Routes>
                </main>
            </Router>
        </LanguageProvider>
    );
}

export default App;
