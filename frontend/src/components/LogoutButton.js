import React from 'react';
import './LogoutButton.css';

const LogoutButton = ({ setAuth }) => {
    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('authToken');

        // Google logout
        if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.disableAutoSelect();
        }

        // Update auth state
        setAuth(false);

        // Redirect to login page
        window.location.href = '/login';
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;
