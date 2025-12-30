# Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB running (locally or remote)

## Step-by-Step Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start backend:
```bash
npm start
```

Backend runs on `http://localhost:5000`

### 2. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 3. Create Admin User

1. Sign up a regular user through the frontend
2. Use MongoDB shell to make them admin:
```javascript
use user-management
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

Or use MongoDB Compass to edit the user document and set `role: "admin"`

### 4. Test the Application

1. Login with your admin account
2. Access the Admin Dashboard
3. View all users
4. Test activating/deactivating users
5. Test profile updates
6. Test password changes

## Testing

Run backend tests:
```bash
cd backend
npm test
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in `.env` file
- For local MongoDB: `mongodb://localhost:27017/user-management`

### CORS Error
- Make sure FRONTEND_URL in backend `.env` matches your frontend URL
- Default: `http://localhost:5173`

### Port Already in Use
- Change PORT in backend `.env` file
- Update frontend API baseURL in `src/services/api.js`
