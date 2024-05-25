import React from 'react';
import LogoutButton from './LogoutButton';

const ProtectedPage = ({ setAuth }) => {
    return (
        <div>
            <h2>Protected Page</h2>
            <p>This is a protected page. You are successfully logged in!</p>
            <LogoutButton setAuth={setAuth} />
        </div>
    );
};

export default ProtectedPage;
