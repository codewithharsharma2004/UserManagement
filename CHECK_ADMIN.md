# Quick Check: Are You an Admin?

## Check 1: Look at the Navbar

Look at the navbar - next to your name, there should be a badge:
- **Blue badge saying "user"** = You're NOT an admin
- **Yellow badge saying "admin"** = You ARE an admin 

## Check 2: Browser Console

1. Open Browser Console (F12)
2. Type this in the console:
   ```javascript
   // This will show your user object
   fetch('/api/auth/me', {
     headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
   }).then(r => r.json()).then(console.log)
   ```

3. Look at the result - check the `user.role` field
   - If it says `"admin"` → You're an admin! ✅
   - If it says `"user"` → You need to update it

## Check 3: Direct URL Test

Try going directly to: `http://localhost:5173/admin`

- If you see the Admin Dashboard → You're an admin! ✅
- If you're redirected to home page → You're not an admin yet

## If You're Not an Admin:

1. Update your role in MongoDB (see MAKE_ADMIN.md)
2. **Logout** from the app
3. **Login** again
4. The Admin link should appear!
