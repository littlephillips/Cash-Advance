import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// decode credentials
import jwtDecode from 'jwt-decode';

// navbar
const Header = lazy(() => import('../NavbarComponent/Header'));

// pages 
const LandingPage = lazy(() => import('../../pages/HomePage/LandingPage'));
const Login = lazy(() => import('../../pages/RegistrationPage/Login'));
const Signup = lazy(() => import('../../pages/RegistrationPage/Signup'));
const Client = lazy(() => import( '../../pages/ClientPage/Client'));
const Credit = lazy(() => import('../../pages/CreditOfficePage/Credit'));
const Supervisor = lazy(() => import('../../pages/SupervisorPage/Supervisor'));
const Office = lazy(() => import('../../pages/OfficePage/Office'));
const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage'));
const Unauthorized = lazy(() => import('../../pages/UnauthorizedPage/Unauthorized'));


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
    <Suspense fallback={<div>Loading...</div>}>
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
        <Route exact path="*" element={<ErrorPage />} />
        </Routes>
    </Suspense>
    </div>
);
}

export default Main;
