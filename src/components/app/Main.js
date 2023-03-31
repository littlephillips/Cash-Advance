import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// navbar
import Header from '../Navbar/Header';

// pages 
import LandingPage from '../../pages/homepage/LandingPage';
import Login from '../../pages/register/Login';
import Signup from '../../pages/register/Signup'
import Client from '../../pages/client/Client';
import Credit from '../../pages/Credit-Officer/Credit';
import Supervisor from '../../pages/supervisor/Supervisor';
import Office from '../../pages/office/Office';
import ErrorPage from '../../pages/errorPage/ErrorPage';
import Unauthorized from '../../pages/anauthorized/Unauthorized';
import ThankYouPage from '../../pages/thankyou/ThankYouPage'

// decode credentials
import jwtDecode from 'jwt-decode';


function Main() {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const location = useLocation();

useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 > Date.now()) {
        setIsAuthenticated(true);
    } else {
        localStorage.removeItem('token');
    }
    }
}, []);

const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
}

const shouldShowHeader = location.pathname === "/";

return (
    <div>
    {shouldShowHeader && <Header />}
    <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route exact path="/signup" element={<Signup />} />
        {isAuthenticated && (
        <>
            <Route exact path="/credit" element={<Credit isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
            <Route exact path="/supervisor" element={<Supervisor isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
            <Route exact path="/office" element={<Office isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
            <Route exact path="/client" element={<Client isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
        </>
        )}
        <Route exact path="/unauthorized" element={<Unauthorized />} />
        <Route exact path="/thankyou" element={<ThankYouPage/>} />
        <Route exact path="*" element={<ErrorPage />} />
    </Routes>
    </div>
);
}

export default Main;
