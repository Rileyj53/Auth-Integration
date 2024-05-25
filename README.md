# Simple auth flow with Google account integration

This is a simple signup/login flow with Google integration. The project consists of a backend server and a frontend application, providing user authentication through traditional login and Google OAuth.

## Setup

### Prerequisites
- Node.js (v14.x or later)
- MongoDB
- npm (comes with Node.js)

### Install Dependencies
1. Install backend dependencies:
    ```bash
    npm install
    ```

2. Navigate to the frontend directory and install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```

### Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
```plaintext
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

### Start the Application
1. Start the backend server:
    ```bash
    npm start
    ```

2. Start the frontend application:
    ```bash
    cd frontend
    npm start
    ```

### Access the Application
Open your browser and navigate to `http://localhost:3000`.

## Project Structure
- `backend/`: Contains the backend code including routes, models, and configuration.
- `frontend/`: Contains the frontend React application.
- `docs/`: Contains API documentation and other relevant documentation files.

## API Documentation
Detailed API documentation can be found in the `docs` directory. This includes all available routes and the required request/response formats.

## Key Features
- User registration and login
- Google OAuth integration for login
- Password reset functionality
- Protected routes accessible only by authenticated users

## Development
For development, the backend server runs on `http://localhost:8080` and the frontend development server runs on `http://localhost:3000`. Ensure both servers are running concurrently for full functionality.

## Deployment
To deploy this application, ensure you have set up the environment variables on your production server. Both the backend and frontend can be deployed separately according to the preferred deployment strategy (e.g., Docker, Heroku, AWS).
