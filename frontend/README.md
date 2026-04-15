# User Management System - Frontend

A brutalist-design React frontend for the User Management System with role-based access control.

## 🎨 Design Philosophy

This frontend uses a **brutalist design system** inspired by the template folder:
- Stark black and white contrast
- Bold borders and shadows
- Monospace typography (Courier New)
- No rounded corners
- Uppercase text for emphasis
- Functional over decorative

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.js              # API client with interceptors
│   ├── components/
│   │   └── ProtectedRoute.jsx    # Route protection component
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication context
│   ├── pages/
│   │   ├── LandingPage.jsx       # Public landing page
│   │   ├── LoginPage.jsx         # Login page
│   │   ├── DashboardPage.jsx     # User dashboard
│   │   ├── UsersPage.jsx         # User management (Admin/Manager)
│   │   ├── UserDetailPage.jsx    # User detail/edit page
│   │   └── ProfilePage.jsx       # User profile page
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── .env                          # Environment variables
├── index.html                    # HTML template
├── package.json                  # Dependencies
└── vite.config.js                # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:5000`

### Installation

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Configure environment:
```bash
# .env file is already created with:
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 🔐 Authentication Flow

1. **Login**: User enters credentials
2. **Token Storage**: Access token and refresh token stored in localStorage
3. **Auto-Refresh**: Axios interceptor automatically refreshes expired tokens
4. **Logout**: Clears all tokens and redirects to login

## 👥 User Roles & Permissions

### Admin
- Full system access
- Create, view, edit, and deactivate all users
- Modify any user role and status
- Access complete audit trails

### Manager
- Manage regular users
- View and update user profiles
- Cannot modify admin users
- Limited to user and manager roles

### User
- View and edit own profile
- Change own password
- No access to other users
- Basic dashboard access

## 📄 Pages Overview

### Landing Page (`/`)
- Public homepage with features and role descriptions
- Call-to-action buttons
- Brutalist design showcase

### Login Page (`/login`)
- Email and password authentication
- Demo credentials display
- Error handling

### Dashboard (`/dashboard`)
- Welcome message with user info
- Quick access cards
- System information display

### Users Page (`/users`)
- User list with pagination
- Search and filter functionality
- Create new users (Admin only)
- Role and status badges

### User Detail Page (`/users/:id`)
- View user information
- Edit user details (with permissions)
- Audit trail information
- Role-based edit restrictions

### Profile Page (`/profile`)
- View own profile information
- Update name
- Change password
- Account information

## 🎨 Design System

### Colors
```css
--background: #ffffff
--foreground: #000000
--accent: #6B21A8 (Purple)
--success: #16a34a (Green)
--destructive: #ff0000 (Red)
--info: #1d4ed8 (Blue)
--muted: #f5f5f5 (Light Gray)
```

### Typography
- Font Family: 'Courier New', monospace
- Uppercase for titles and labels
- Letter spacing: 0.05em
- Bold weights for emphasis

### Components
- 4px solid black borders
- 6-12px box shadows
- No border radius
- High contrast colors

## 🔧 API Integration

### Axios Configuration
- Base URL from environment variable
- Automatic token attachment
- Token refresh on 401 errors
- Error handling and redirects

### Endpoints Used
```
POST   /api/auth/login
POST   /api/auth/refresh
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
PUT    /api/users/:id/password
DELETE /api/users/:id
```

## 🧪 Demo Credentials

```
Admin:
Email: admin@example.com
Password: Admin@123

Manager:
Email: manager@example.com
Password: Manager@123

User:
Email: user@example.com
Password: User@123
```

## 📦 Build for Production

```bash
npm run build
```

Build output will be in the `dist/` folder.

Preview production build:
```bash
npm run preview
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router 6** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **Context API** - State management

## 🎯 Key Features

✅ Role-based access control
✅ JWT authentication with refresh tokens
✅ Responsive brutalist design
✅ Search and filter users
✅ Pagination
✅ Audit trail tracking
✅ Password change functionality
✅ Protected routes
✅ Error handling
✅ Loading states

## 📝 Notes

- All styles are inline for simplicity and portability
- No external CSS frameworks used
- Design inspired by brutalist web design principles
- Fully responsive layout
- Accessibility considerations included

## 🔒 Security Features

- JWT token management
- Automatic token refresh
- Protected routes
- Role-based permissions
- Secure password handling
- XSS prevention through React

## 🐛 Troubleshooting

**Issue**: Cannot connect to backend
- Ensure backend is running on port 5000
- Check VITE_API_URL in .env file

**Issue**: Login fails
- Verify backend database is seeded
- Check demo credentials
- Inspect browser console for errors

**Issue**: Token expired
- Automatic refresh should handle this
- If persists, clear localStorage and login again

## 📄 License

This project is part of the User Management System.
