# User Management System

A full-stack web application for user management with authentication, role-based access control, and admin features.

## Tech Stack

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Jest for testing

### Frontend
- React 19
- React Router DOM
- Axios for API calls
- CSS3 with responsive design

## Features

### Authentication
- User signup with email and password validation
- User login with JWT token
- Password strength validation (8+ chars, uppercase, lowercase, number)
- Email format validation
- Protected routes

### User Features
- View own profile
- Update full name and email
- Change password
- Logout

### Admin Features
- View all users with pagination (10 per page)
- Activate user accounts
- Deactivate user accounts
- Role-based access control

### Security
- Password hashing with bcrypt
- JWT authentication tokens
- Protected API routes
- Role-based access control (admin/user)
- Input validation on all endpoints
- CORS configuration

## Project Structure

```
UserManagement/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── __tests__/      # Unit tests
│   ├── server.js           # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Auth and Toast contexts
│   │   ├── pages/          # Page components
│   │   └── services/       # API service
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port).

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User signup
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - User logout (protected)

### User
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)
- `PUT /api/user/change-password` - Change password (protected)

### Admin
- `GET /api/admin/users?page=1&limit=10` - Get all users with pagination (admin only)
- `PUT /api/admin/users/:userId/activate` - Activate user (admin only)
- `PUT /api/admin/users/:userId/deactivate` - Deactivate user (admin only)

## Testing

### Backend Tests
Run backend unit tests:
```bash
cd backend
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Creating an Admin User

To create the first admin user, you can either:

1. Use MongoDB shell:
```javascript
use user-management
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

2. Or sign up a regular user and manually update the database to set `role: "admin"`

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (use a strong random string in production)
- `JWT_EXPIRES_IN` - JWT expiration time (default: 7d)
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Special characters allowed: @$!%*?&

## User Roles

- **user** - Regular user (default)
- **admin** - Administrator with access to admin dashboard

## User Status

- **active** - User can login and access the system
- **inactive** - User cannot login (set by admin)

## License

ISC
