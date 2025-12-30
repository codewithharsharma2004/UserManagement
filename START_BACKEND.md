# Start Backend Server

## Quick Start

1. **Open a terminal and navigate to backend:**
```bash
cd backend
```

2. **Start the server:**
```bash
npm start
```

## What You Should See

If everything is working, you should see:
```
MongoDB connected successfully
Server is running on port 5001
```

## If MongoDB Connection Fails

Make sure MongoDB is running:
- On macOS: `brew services start mongodb-community` (if installed via Homebrew)
- Or check if MongoDB service is running
- Check the MONGODB_URI in `.env` file

## If Port 5001 is Already in Use

Kill the existing process:
```bash
lsof -ti:5001 | xargs kill -9
```

Then start again:
```bash
npm start
```

## Keep It Running

**IMPORTANT:** Keep this terminal window open! The backend needs to keep running for the frontend to work.

Leave it running and open a NEW terminal window for other commands.
