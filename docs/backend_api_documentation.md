Sure, here is the formatted documentation:

# Authentication API Documentation

## Base URL
`http://localhost:8080/auth`

---

### Test Route
### **GET** `/test`

#### **Description:**  
Tests if the authentication routes are working.

**Response:**
- `200 OK` - Auth route is working!

---

### Registration
### **POST** `/register`

#### **Description:**  
Registers a new user.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "your_password"
}
```

**Response:**
- `201 Created`
  ```json
  { "message": "User registered successfully" }
  ```
- `400 Bad Request`
  ```json
  { "message": "Password is required" }
  ```
  ```json
  { "message": "User already exists" }
  ```
- `500 Internal Server Error`
  ```json
  { "message": "Server error" }
  ```

---

### Login
### **POST** `/login`

#### **Description:**
Logs in a user.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "your_password"
}
```

**Response:**
- `200 OK`
  ```json
  { "message": "Logged in successfully", "token": "your_jwt_token" }
  ```
- `400 Bad Request`
  ```json
  { "message": "Incorrect email or password" }
  ```
- `500 Internal Server Error`
  ```json
  { "message": "Server error" }
  ```

---

### Google Sign-In
### **POST** `/google`

#### **Description:**
Logs in a user using Google Sign-In.

**Request Body:**
```json
{
  "id_token": "google_id_token"
}
```

**Response:**
- `200 OK`
  ```json
  { "success": true, "token": "your_jwt_token" }
  ```
- `401 Unauthorized`
  ```json
  { "success": false, "message": "Invalid token" }
  ```
- `500 Internal Server Error`
  ```json
  { "message": "Server error" }
  ```

---

### Password Reset Request
### **POST** `/request-reset`

#### **Description:**
Requests a password reset link.

**Request Body:**
```json
{
  "email": "john.doe@example.com"
}
```

**Response:**
- `200 OK`
  ```json
  { "message": "Password reset link sent to your email" }
  ```
- `400 Bad Request`
  ```json
  { "message": "User with this email does not exist" }
  ```
- `500 Internal Server Error`
  ```json
  { "message": "Server error" }
  ```

---

### Password Reset
### **POST** `/reset-password`

#### **Description:**
Resets a user's password.

**Request Body:**
```json
{
  "token": "reset_token",
  "newPassword": "new_password"
}
```

**Response:**
- `200 OK`
  ```json
  { "message": "Password reset successfully" }
  ```
- `400 Bad Request`
  ```json
  { "message": "Invalid or expired token" }
  ```
- `500 Internal Server Error`
  ```json
  { "message": "Server error" }
  ```

---

### Protected Route
### **GET** `/protected`

#### **Description:**
Accesses a protected route.

**Headers:**
- `Authorization: Bearer your_jwt_token`

**Response:**
- `200 OK`
  ```json
  { "message": "Hello World!", "user": { "id": "user_id" } }
  ```
- `401 Unauthorized`
  ```json
  { "message": "Unauthorized" }
  ```

---

### Logout
### **GET** `/logout`

#### **Description:**
Logs out a user.

**Response:**
- `200 OK`
  ```json
  { "message": "Logged out successfully" }
  ```

---

## Models

### User Model

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  googleId: { type: String, default: null, sparse: true },
  image: { type: String, default: null },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
```

---

Ensure your environment variables are correctly set for Gmail and JWT secret in your `.env` file:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongo_db_uri
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_SECRET=your_google_client_secret
REACT_APP_GOOGLE_CLIENT_ID=your_react_google_client_id
GOOGLE_CLIENT_ID=your_google_client_id
```