# Frontend Documentation

## Routes

### `/login`

**Description:**  
The login page where users can log in with their email and password or use the Google Sign-In button to log in using their Google account.

**Functionality:**
- Users can enter their email and password to log in.
- Users can use the "Forgot password?" link to navigate to the password reset request page.
- Users can use the "Don't have an account? Sign up" link to navigate to the registration page.
- A Google Sign-In button allows users to log in with their Google account.

### `/register`

**Description:**  
The registration page where users can create a new account by providing their first name, last name, email, and password.

**Functionality:**
- Users can enter their first name, last name, email, and password to register a new account.
- Users can use the "Already have an account? Sign in" link to navigate to the login page.
- A Google Sign-In button allows users to register and log in with their Google account.

### `/protected`

**Description:**  
A protected page that is only accessible to authenticated users. Users must be logged in to view this page.

**Functionality:**
- Displays a message indicating that the user is successfully logged in.
- Includes a logout button that logs the user out and redirects them to the login page.

### `/request-reset-password`

**Description:**  
The password reset request page where users can request a password reset by providing their email address.

**Functionality:**
- Users can enter their email address to request a password reset.
- Sends a password reset link to the provided email address if it exists in the database.

### `/reset-password/:token`

**Description:**  
The password reset page where users can reset their password using the token provided in the password reset email.

**Functionality:**
- Users can enter a new password to reset their password.
- Verifies the reset token and updates the user's password in the database if the token is valid.

## Components

### `GoogleLoginButton`

**Description:**  
Component for the Google Sign-In button, which allows users to log in with their Google account.

### `Login`

**Description:**  
Component for the login page, which includes form validation and error handling for user login.

### `LogoutButton`

**Description:**  
Component for the logout button, which logs the user out and redirects them to the login page.

### `ProtectedPage`

**Description:**  
Component for the protected page, which is only accessible to authenticated users.

### `Register`

**Description:**  
Component for the registration page, which includes form validation and error handling for user registration.

### `RequestResetPassword`

**Description:**  
Component for the password reset request page, which allows users to request a password reset.

## App.js

**Description:**  
Main application file that defines the routes and authentication logic.

**Routes:**
- `/login`: Login page
- `/register`: Registration page
- `/protected`: Protected page
- `/request-reset-password`: Password reset request page
- `/reset-password/:token`: Password reset page
