# Troubleshooting Guide

## Signup Failed - Common Issues

### 1. Check Backend is Running
Make sure the backend server is running:
```bash
cd backend
npm start
```
You should see: "MongoDB connected successfully" and "Server is running on port 5000"

### 2. Check MongoDB Connection
- Make sure MongoDB is running on your system
- Check the `MONGODB_URI` in your `.env` file
- Test connection: `mongodb://localhost:27017/user-management`

### 3. Check Environment Variables
Make sure you have a `.env` file in the `backend` directory with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Check Browser Console
Open browser developer tools (F12) and check:
- Network tab: Look for the `/api/auth/signup` request
- Console tab: Look for any error messages
- Check the response from the server

### 5. Common Error Messages

**"Email already registered"**
- The email address is already in use
- Try a different email address

**"Validation failed"**
- Check password requirements:
  - At least 8 characters
  - One uppercase letter
  - One lowercase letter
  - One number
- Example valid password: `Password123`

**"Network Error" or "Connection Refused"**
- Backend server is not running
- Check if backend is on port 5000
- Check CORS settings in backend

**"JWT_SECRET is not configured"**
- Add JWT_SECRET to your `.env` file
- Restart the backend server

### 6. Test API Directly

You can test the signup endpoint directly using curl:

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "Password123"
  }'
```

This will show you the exact error message from the server.

### 7. Check Backend Logs
Look at the terminal where the backend is running for error messages.

### 8. Password Requirements
Make sure your password meets these requirements:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- Special characters allowed: @$!%*?&

**Valid passwords:**
- `Password123`
- `MyPass123`
- `Test@123`

**Invalid passwords:**
- `password` (no uppercase, no number)
- `PASSWORD123` (no lowercase)
- `Password` (no number)
- `Pass123` (too short, less than 8 chars)

### 9. Clear Browser Cache
Sometimes cached data can cause issues:
- Clear browser cache
- Try in incognito/private mode
- Clear localStorage: `localStorage.clear()` in browser console

### 10. Check Network Connectivity
- Make sure frontend can reach backend
- Check if backend URL in `frontend/src/services/api.js` is correct: `http://localhost:5000/api`
- Check firewall settings
