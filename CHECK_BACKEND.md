# Check Backend Status

## Quick Check

Run this command to check if backend is running:

```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{"success":true,"message":"Server is running"}
```

**If you get "Connection refused" or nothing:**
- Backend is NOT running
- Start it with: `cd backend && npm start`

## Verify Backend is Running

1. **Check if process is running:**
```bash
ps aux | grep "node server.js"
```

2. **Check if port 5000 is in use:**
```bash
lsof -ti:5000
```

3. **Check backend logs:**
Look at the terminal where you ran `npm start` - you should see:
- "MongoDB connected successfully"
- "Server is running on port 5000"

## Common Issues

### Backend not starting
- Check MongoDB is running
- Check `.env` file exists in `backend/` directory
- Check for error messages in terminal

### Port already in use
- Change PORT in `.env` file
- Or kill the process: `kill -9 $(lsof -ti:5000)`

### Network Error in Browser
- Make sure backend is running
- Check browser console (F12) for detailed error
- Check Network tab to see the failed request
- Verify the request URL is: `http://localhost:5000/api/auth/signup`
