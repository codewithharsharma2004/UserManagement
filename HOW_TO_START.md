# How to Start Backend and Frontend

## Step 1: Start Backend (Terminal 1)

Open a terminal window and run:

```bash
cd /Users/harshsharma/Desktop/UserManagement/backend
npm start
```

**You should see:**
```
MongoDB connected successfully
Server is running on port 5001
```

**⚠️ KEEP THIS TERMINAL WINDOW OPEN!** The backend needs to keep running.

---

## Step 2: Start Frontend (Terminal 2)

Open a **NEW** terminal window (keep backend running in Terminal 1) and run:

```bash
cd /Users/harshsharma/Desktop/UserManagement/frontend
npm run dev
```

**You should see:**
```
VITE v... ready in ... ms
➜  Local:   http://localhost:5173/
```

---

## Step 3: Open Browser

Open your browser and go to: **http://localhost:5173**

You should see the Login page.

---

## Troubleshooting

### Backend won't start?
- Make sure MongoDB is running
- Check the `.env` file exists in `backend/` folder
- Look for error messages in the terminal

### Frontend shows "Cannot connect to server"?
- Make sure backend is running (check Terminal 1)
- Make sure backend shows "Server is running on port 5001"
- Try hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

### Both terminals are needed!
- Terminal 1: Backend (npm start) - MUST stay running
- Terminal 2: Frontend (npm run dev) - MUST stay running
