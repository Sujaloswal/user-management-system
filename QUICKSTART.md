# 🚀 Quick Start Guide

Get the User Management System running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Git installed
- Terminal/Command Prompt

## Step-by-Step Setup

### 1. Clone & Navigate
```bash
git clone <repository-url>
cd user-management-system
```

### 2. Backend Setup (Terminal 1)
```bash
cd backend
npm install
npm run seed
npm run dev
```

✅ Backend running on `http://localhost:5000`

### 3. Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on `http://localhost:3000`

### 4. Access the Application

Open your browser to: **http://localhost:3000**

## Demo Credentials

### Admin Account
```
Email: admin@example.com
Password: Admin@123
```
**Can do**: Everything - create users, manage all users, full access

### Manager Account
```
Email: manager@example.com
Password: Manager@123
```
**Can do**: View and manage regular users (not admins)

### User Account
```
Email: user@example.com
Password: User@123
```
**Can do**: View and edit own profile only

## What to Try

### As Admin
1. Login with admin credentials
2. Click "MANAGE USERS" in navigation
3. Create a new user with the "+ CREATE USER" button
4. Search and filter users
5. Click "VIEW" on any user to see details
6. Edit user information
7. Try deactivating a user

### As Manager
1. Logout and login as manager
2. View user list (cannot create users)
3. Edit regular users (cannot edit admins)
4. Update your own profile

### As User
1. Logout and login as regular user
2. See limited dashboard
3. Update your profile
4. Change your password
5. Notice you cannot access user management

## Features to Explore

### Landing Page (`/`)
- Feature showcase
- Role descriptions
- Call-to-action buttons

### Dashboard (`/dashboard`)
- Personalized welcome
- Quick action cards
- System information

### User Management (`/users`)
- Paginated user list
- Search by name/email
- Filter by role and status
- Create new users (Admin only)
- View user details
- Edit users (with permissions)

### Profile (`/profile`)
- View account information
- Update name
- Change password

## Design Features

The frontend uses a **brutalist design system**:
- Stark black and white contrast
- Bold 3-4px borders
- Box shadows for depth
- Monospace typography (Courier New)
- Uppercase text for emphasis
- No rounded corners
- Functional over decorative

## API Testing

### Option 1: PowerShell Script
```bash
cd backend
.\test-api.ps1
```

### Option 2: Postman
Import `backend/postman_collection.json` into Postman

## Troubleshooting

### Backend won't start
- Check if MongoDB connection string is valid in `backend/.env`
- Ensure port 5000 is not in use
- Run `npm install` again

### Frontend won't start
- Ensure backend is running first
- Check if port 3000 is not in use
- Verify `frontend/.env` has correct API URL
- Run `npm install` again

### Cannot login
- Ensure database is seeded: `npm run seed`
- Check browser console for errors
- Verify backend is running on port 5000

### Token expired errors
- Tokens auto-refresh automatically
- If persists, clear browser localStorage and login again

## Project Structure

```
user-management-system/
├── backend/          # Node.js + Express API
│   ├── controllers/  # Business logic
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   └── middleware/   # Auth & validation
├── frontend/         # React + Vite app
│   └── src/
│       ├── api/      # Axios client
│       ├── context/  # Auth context
│       ├── pages/    # Page components
│       └── components/ # Reusable components
└── templet/          # Design reference
```

## Tech Stack

**Backend**: Node.js, Express, MongoDB, JWT, bcrypt  
**Frontend**: React 18, Vite, React Router, Axios  
**Design**: Brutalist (stark contrast, bold borders, monospace)

## Next Steps

1. ✅ Explore all three user roles
2. ✅ Try creating, editing, and deactivating users
3. ✅ Test search and filter functionality
4. ✅ Update your profile and change password
5. ✅ Review the code structure
6. 📚 Read `README.md` for detailed documentation
7. 📚 Check `frontend/README.md` for frontend details
8. 📚 Review `frontend/STRUCTURE.md` for architecture

## Production Deployment

### Backend
- Deploy to Heroku, Railway, or Render
- Set production environment variables
- Use production MongoDB connection

### Frontend
- Deploy to Vercel or Netlify
- Update `VITE_API_URL` to production backend URL
- Run `npm run build` to create production build

## Support

- 📖 Full documentation in `README.md`
- 🎨 Frontend guide in `frontend/README.md`
- 🏗️ Architecture in `frontend/STRUCTURE.md`
- 🧪 API tests in `backend/postman_collection.json`

---

**Status**: ✅ Both backend and frontend are production-ready!

**Enjoy building with the User Management System!** 🎉
