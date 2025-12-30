# How to Make Yourself an Admin

The Admin link only shows if your user role is "admin". Here's how to check and fix it:

## Step 1: Check Your Current Role

1. **Open Browser Console (F12)**
2. **Go to Console tab**
3. **Type this command:**
   ```javascript
   JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId
   ```
   This will show your user ID.

4. **Or easier - check what role badge shows in the navbar:**
   - Look at the navbar - you should see a badge next to your name
   - If it says "user" (blue badge), you're not an admin yet
   - If it says "admin" (yellow badge), you're already an admin

## Step 2: Make Yourself Admin in MongoDB Atlas

### Option A: MongoDB Atlas Web Interface

1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections"
3. Select your database (`user-management`)
4. Click on `users` collection
5. Find your user document (search by your email)
6. Click the document to edit it
7. Find the `role` field
8. Change it from `"user"` to `"admin"`
9. Click "Update"

### Option B: MongoDB Shell or Compass

```javascript
// In MongoDB shell or Compass
use user-management

// Find your user first
db.users.find({ email: "your-email@example.com" })

// Update to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)

// Verify it worked
db.users.findOne({ email: "your-email@example.com" })
```

## Step 3: Refresh Your Login

**IMPORTANT:** After updating your role in the database, you need to logout and login again for the frontend to pick up the change.

1. Click "Logout" in the navbar
2. Login again with your credentials
3. Now you should see the "Admin" link in the navbar!

## Step 4: Verify

After logging in again, you should see:
- A yellow "admin" badge next to your name in the navbar
- An "Admin" link in the navbar menu
- You can click "Admin" to go to `/admin` route

## Quick Test

If you want to test without logging out, you can:
1. Open browser console (F12)
2. Type: `window.location.href = '/admin'`
3. If you're an admin, it will work. If not, you'll be redirected to home.

But the proper way is to logout and login again after updating your role in the database!
