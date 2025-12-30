# Port Changed to 5001

## Issue Found
Port 5000 is being used by Apple's AirPlay service on macOS, which prevents the backend from binding to that port.

## Solution
Changed the backend port from 5000 to 5001.

## What Changed
1. Backend `.env` file: `PORT=5001`
2. Frontend API URL: `http://localhost:5001/api`

## Next Steps

1. **Stop the current backend** (if running):
   - Press `Ctrl+C` in the terminal where backend is running
   - Or kill the process: `kill 7716` (use the PID from your process list)

2. **Restart the backend:**
   ```bash
   cd backend
   npm start
   ```

3. **Verify it's working:**
   ```bash
   curl http://localhost:5001/api/health
   ```
   
   Should return: `{"success":true,"message":"Server is running"}`

4. **Try signing up again** in the frontend

## Alternative Solution

If you prefer to use port 5000, you can disable AirPlay:
- System Preferences → Sharing → AirPlay Receiver → Uncheck "AirPlay Receiver"

But using port 5001 is simpler and recommended.
