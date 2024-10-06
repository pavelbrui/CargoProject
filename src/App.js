import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Login from './pages/Login';
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
                            <li className="nav-item"><Link to="/">PL-CARGO</Link></li>
                           {/* <li className="nav-item"><Link to="/login">Login</Link></li>
                            <li className="nav-item"><Link to="/register">Register</Link></li>*/}
                        </ul>
                    </nav>

                    {/* Komponent wyboru języka */}
                    <LanguageSelector />
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                       {/* <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} /> */}
                    </Routes>
                </main>
            </Router>
        </LanguageProvider>
    );
}

export default App;
