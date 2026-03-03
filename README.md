# User Authentication Using Bearer Token

A demo application demonstrating user authentication using JWT (JSON Web Token) with Bearer Token in a Node.js/Express application with MongoDB.

## Features

- **User Registration** - Create new user accounts with username, email, and password
- **User Login** - Authenticate users and generate JWT Bearer tokens
- **Password Security** - Passwords are securely hashed using bcrypt
- **Protected Routes** - Middleware to verify Bearer tokens for protected endpoints
- **Role-Based Access Control** - Admin-only routes for sensitive operations
- **Token-Based Sessions** - JWT tokens stored in user documents

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

## Project Structure

```
UserAuthenticationUsingBearerToken/
├── controllers/
│   └── userController.js      # User controller functions
├── database/
│   └── dbConfig.js            # MongoDB connection
├── middleware/
│   ├── adminMiddleware.js     # Admin authorization middleware
│   └── authMiddleware.js      # Authentication middleware
├── models/
│   └── userSchema.js          # Mongoose user schema
├── views/
│   └── userRouter.js          # Express routes
├── .gitignore
├── index.js                   # Server entry point
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd UserAuthenticationUsingBearerToken
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Register User
- **Endpoint**: `POST /api/auth/register`
- **Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**: User created successfully

### Login User
- **Endpoint**: `POST /api/auth/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**: Returns JWT token

### Get All Users (Admin Only)
- **Endpoint**: `GET /api/auth/getdata`
- **Headers**:
```http
Authorization: Bearer <your_jwt_token>
```
- **Response**: Returns list of all users (admin only)

## Middleware

### authMiddleware
Verifies the Bearer token from the Authorization header and attaches the user to the request object.

### adminMiddleware
Verifies the Bearer token and checks if the user has an "Admin" role.

## User Schema

| Field    | Type   | Required | Description           |
|----------|--------|----------|-----------------------|
| username | String | Yes      | User's name           |
| email    | String | Yes      | Unique email address  |
| password | String | Yes      | Hashed password       |
| role     | String | No       | 'Admin' or 'User'     |
| token    | String | No       | JWT token             |

## API Documentation
https://documenter.getpostman.com/view/24307430/2sBXcKBJHa

## Deployement
Deployed using Render
https://userauthenticationusingbearertoken.onrender.com/

## License

ISC

## Author

Kalai

