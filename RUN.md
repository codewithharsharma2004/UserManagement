# How to Run Backend and Frontend

## Prerequisites
- Node.js installed (v14 or higher)
- MongoDB running locally or have a MongoDB connection string

## Step 1: Setup Backend

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies (if not already installed):**
```bash
npm install
```

3. **Create `.env` file in the backend directory:**
Create a file named `.env` with the following content:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

4. **Start the backend server:**
```bash
npm start
```

The backend will run on `http://localhost:5000`

For development with auto-reload (requires nodemon):
```bash
npm run dev
```

## Step 2: Setup Frontend

**Open a NEW terminal window** (keep backend running in the first terminal):

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies (if not already installed):**
```bash
npm install
```

3. **Start the frontend development server:**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port)

## Step 3: Access the Application

1. Open your browser and go to: `http://localhost:5173`
2. You should see the Login page
3. Sign up for a new account or login if you already have one

## Quick Commands Summary

### Backend
```bash
cd backend
npm install          # First time only
npm start            # Start server
# OR
npm run dev          # Start with auto-reload (development)
```

### Frontend
```bash
cd frontend
npm install          # First time only
npm run dev          # Start development server
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running on your system
- Check the `MONGODB_URI` in your `.env` file
- For local MongoDB: `mongodb://localhost:27017/user-management`
- For MongoDB Atlas (cloud): Use your connection string

### Port Already in Use
- Backend: Change `PORT` in `.env` file (e.g., `PORT=5001`)
- Frontend: Vite will automatically use the next available port

### CORS Errors
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default: `http://localhost:5173`

### Cannot Find Module Errors
- Run `npm install` in both backend and frontend directories

## Creating an Admin User

After signing up, make yourself an admin user using MongoDB:

**Option 1: MongoDB Shell**
```javascript
use user-management
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

**Option 2: MongoDB Compass**
1. Open MongoDB Compass
2. Connect to your database
3. Navigate to `user-management` database → `users` collection
4. Find your user document
5. Edit and change `role` from `"user"` to `"admin"`
6. Save the document

Then logout and login again to access the Admin Dashboard!
