import React, { useEffect } from 'react';
import './GoogleLoginButton.css';

const GoogleLoginButton = ({ setAuth }) => {
    useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse
                });
                window.google.accounts.id.renderButton(
                    document.getElementById('google-signin-button'),
                    { theme: 'outline', size: 'large', shape: 'pill', text: 'signin_with' }
                );
            } else {
                console.error('Google API not loaded');
            }
        };

        const handleCredentialResponse = (response) => {
            console.log("Encoded JWT ID token: " + response.credential);
            fetch('http://localhost:8080/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_token: response.credential })
            }).then(response => response.json())
                .then(data => {
                    if (data.success) {
                        localStorage.setItem('authToken', data.token);
                        setAuth(true);
                        window.location.href = '/protected';
                    } else {
                        console.error('Login failed');
                    }
                });
        };

        if (window.google) {
            initializeGoogleSignIn();
        } else {
            window.addEventListener('load', initializeGoogleSignIn);
        }
    }, [setAuth]);

    return <div id="google-signin-button" className="google-login-button"></div>;
};

export default GoogleLoginButton;
