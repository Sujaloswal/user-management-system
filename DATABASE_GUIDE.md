# DATABASE MANAGEMENT GUIDE

## Where to View Users in MongoDB Atlas

1. **Login to MongoDB Atlas**
   - Go to https://cloud.mongodb.com/
   - Login with your credentials

2. **Navigate to Your Database**
   - Click on "Browse Collections" button
   - Select your cluster: `user-management-cluster`
   - Select database: `user-management`
   - Select collection: `users`

3. **View All Users**
   - You'll see all registered users in the collection
   - Each user document shows: name, email, role, status, createdAt, etc.

---

## How to Add Admin/Manager Users

### Method 1: Using the Script (Recommended)

Run the interactive script to add new admin or manager users:

```bash
cd backend
node config/add-admin.js
```

The script will prompt you for:
- Name
- Email
- Password
- Role (admin/manager/user)
- Status (active/inactive)

### Method 2: Re-seed the Database

If you want to reset the database with default users:

```bash
cd backend
npm run seed
```

This will create:
- **Admin**: admin@example.com / Admin@123
- **Manager**: manager@example.com / Manager@123
- **User**: user@example.com / User@123

⚠️ **WARNING**: This will delete ALL existing users!

### Method 3: Directly in MongoDB Atlas

1. Go to MongoDB Atlas → Browse Collections
2. Select `user-management` database → `users` collection
3. Click "Insert Document"
4. Add the following JSON (modify as needed):

```json
{
  "name": "New Admin",
  "email": "newadmin@example.com",
  "password": "$2a$10$YourHashedPasswordHere",
  "role": "admin",
  "status": "active",
  "createdAt": {"$date": "2026-04-16T00:00:00.000Z"},
  "updatedAt": {"$date": "2026-04-16T00:00:00.000Z"}
}
```

⚠️ **NOTE**: Password must be bcrypt hashed. Use Method 1 or 2 instead for automatic hashing.

---

## Fixing Admin Login Issues

If existing admin credentials from MongoDB are not working:

### Solution 1: Re-seed the Database

```bash
cd backend
npm run seed
```

Then login with:
- Email: `admin@example.com`
- Password: `Admin@123`

### Solution 2: Check Password Hash

The password in MongoDB must be bcrypt hashed. If you see a plain text password, it won't work. Use the `add-admin.js` script to create a new admin with properly hashed password.

### Solution 3: Verify Environment Variables

Check `backend/.env` file:
```
MONGO_URI=mongodb+srv://sujaloswal190_db_user:PVWc7h2yJfUY5GRD@user-management-cluster.medcquh.mongodb.net/user-management?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

---

## User Roles Explained

### Admin
- Full system access
- Can create/update/delete all users
- Can change any user's role
- Can view all statistics

### Manager
- Can manage regular users
- Cannot modify admin users
- Can view user statistics
- Limited access compared to admin

### User
- Can only view/update own profile
- Cannot access other users
- Cannot view statistics
- Basic dashboard access

---

## Common Issues

### Issue: "User not found" or "Invalid credentials"
**Solution**: Re-seed the database with `npm run seed`

### Issue: Registered users not appearing
**Solution**: Check MongoDB Atlas → user-management → users collection

### Issue: Cannot login with admin credentials
**Solution**: 
1. Verify password is bcrypt hashed in database
2. Re-seed database: `npm run seed`
3. Or create new admin: `node config/add-admin.js`

### Issue: Statistics not showing
**Solution**: 
1. Make sure you're logged in as admin or manager
2. Check browser console for errors
3. Verify backend is running on port 5000

---

## Quick Commands

```bash
# Start backend server
cd backend
npm start

# Start frontend server
cd frontend
npm run dev

# Re-seed database (creates default users)
cd backend
npm run seed

# Add new admin/manager
cd backend
node config/add-admin.js

# View MongoDB connection
# Check backend/.env for MONGO_URI
```

---

## Default Credentials (After Seeding)

| Role    | Email                  | Password    |
|---------|------------------------|-------------|
| Admin   | admin@example.com      | Admin@123   |
| Manager | manager@example.com    | Manager@123 |
| User    | user@example.com       | User@123    |

---

## Need Help?

1. Check backend console for errors
2. Check frontend browser console for errors
3. Verify MongoDB connection in backend logs
4. Ensure both servers are running (backend: 5000, frontend: 5173)
