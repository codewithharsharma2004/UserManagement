# MongoDB Atlas Setup Guide

## Common Issues with MongoDB Atlas

### 1. Network Access (IP Whitelist)

MongoDB Atlas requires your IP address to be whitelisted.

**Steps to fix:**
1. Go to MongoDB Atlas dashboard
2. Click on "Network Access" in the left menu
3. Click "Add IP Address"
4. Add your current IP address, OR
5. Click "Allow Access from Anywhere" (0.0.0.0/0) - **Only for development!**

### 2. Database User Credentials

Make sure the username and password in your connection string are correct:
- Username: `sharmaharshengineer_db_user`
- Password: `IXNgDdtutwzWt7Vx`

**To reset password:**
1. Go to MongoDB Atlas → Database Access
2. Click on your user
3. Click "Edit" → "Edit Password"
4. Set a new password
5. Update the password in your connection string

### 3. Connection String Format

Your connection string should look like:
```
mongodb+srv://USERNAME:PASSWORD@cluster0.sprzehf.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

Your current string:
```
mongodb+srv://sharmaharshengineer_db_user:IXNgDdtutwzWt7Vx@cluster0.sprzehf.mongodb.net/user-management
```

This looks correct! Make sure:
- Database name is `user-management` (or create it)
- No extra spaces in the connection string
- Password is URL-encoded if it has special characters

### 4. Test Connection

Test your connection string:

```bash
cd backend
node -e "
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas connection successful!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB Atlas connection failed:');
    console.error(err.message);
    process.exit(1);
  });
"
```

### 5. Common Error Messages

**"Authentication failed"**
- Wrong username or password
- User doesn't exist in MongoDB Atlas

**"IP not whitelisted" or "Network timeout"**
- Your IP address is not in the whitelist
- Add your IP to Network Access

**"Server selection timed out"**
- Network connectivity issues
- Cluster might be paused (free tier pauses after inactivity)

## Quick Fix Checklist

- [ ] IP address whitelisted in MongoDB Atlas Network Access
- [ ] Database user exists and password is correct
- [ ] Connection string has no extra spaces
- [ ] Database name exists (will be created automatically)
- [ ] Cluster is running (not paused)

## Alternative: Use Local MongoDB

If you're having issues with Atlas, you can use local MongoDB:

1. Install MongoDB locally
2. Update `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/user-management
   ```
3. Make sure MongoDB is running locally
