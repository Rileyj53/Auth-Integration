import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedPage from './components/ProtectedPage';
import RequestResetPassword from './components/RequestResetPassword';

// Function to check if the user is authenticated
const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        if (exp * 1000 < Date.now()) {
            localStorage.removeItem('authToken');
            return false;
        }
    } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('authToken');
        return false;
    }

    return true;
};

// Private Route component to protect routes
const PrivateRoute = ({ element, auth }) => {
    return auth ? element : <Navigate to="/login" />;
};

function App() {
    const [auth, setAuth] = useState(isAuthenticated());

    useEffect(() => {
        const handleStorageChange = () => {
            setAuth(isAuthenticated());
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setAuth={setAuth} />} />
                <Route path="/register" element={<Register setAuth={setAuth} />} />
                <Route path="/protected" element={<PrivateRoute auth={auth} element={<ProtectedPage setAuth={setAuth} />} />} />
                <Route path="/request-reset-password" element={<RequestResetPassword />} />
                <Route path="/" element={auth ? <Navigate to="/protected" /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
