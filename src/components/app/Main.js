import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// decode credentials
import jwtDecode from 'jwt-decode';

// navbar
const Header = lazy(() => import('../Navbar/Header'));

// pages 
const LandingPage = lazy(() => import('../../pages/homepage/LandingPage'));
const Login = lazy(() => import('../../pages/register/Login'));
const Signup = lazy(() => import('../../pages/register/Signup'));
const Client = lazy(() => import( '../../pages/client/Client'));
const Credit = lazy(() => import('../../pages/Credit-Officer/Credit'));
const Supervisor = lazy(() => import('../../pages/supervisor/Supervisor'));
const Office = lazy(() => import('../../pages/office/Office'));
const ErrorPage = lazy(() => import('../../pages/errorPage/ErrorPage'));
const Unauthorized = lazy(() => import('../../pages/anauthorized/Unauthorized'));
const ThankYouPage = lazy(() => import('../../pages/thankyou/ThankYouPage'));

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
    <Suspense fallback={<div>Loading...</div>} >
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
    </Suspense>
    </div>
);
}

export default Main;
