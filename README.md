# User Management System

A professional full-stack user management system with role-based access control (RBAC), JWT authentication, MongoDB database, and brutalist design aesthetic.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Git

### Setup Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd user-management-system
```

2. **Backend Setup**
```bash
cd backend
npm install
npm run seed    # Create default users
npm run dev     # Start backend on port 5000
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev     # Start frontend on port 5173
```

4. **Access Application**
- Open browser to `http://localhost:5173`
- Login with demo credentials:
  - **Admin**: admin@example.com / Admin@123
  - **Manager**: manager@example.com / Manager@123
  - **User**: user@example.com / User@123

---

## 📋 Features

### Core Features
- ✅ **JWT Authentication** - Secure access and refresh tokens
- ✅ **Role-Based Access Control** - Admin, Manager, User roles with granular permissions
- ✅ **Real-time Statistics** - Dashboard with live user metrics (admin/manager only)
- ✅ **User Management** - Complete CRUD operations with search and filtering
- ✅ **User Activation/Deactivation** - Admin and Manager can activate/deactivate users
- ✅ **Brutalist Design** - Stark black/white contrast, bold borders, no-nonsense UI
- ✅ **3D Visual Elements** - Subtle animated shapes on landing page
- ✅ **Lucide Icons** - Professional icon system throughout
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **MongoDB Atlas** - Cloud database with automatic backups

### Security Features
- 🔐 Password hashing with bcrypt (12 salt rounds)
- 🔐 JWT token-based authentication
- 🔐 Protected routes with middleware
- 🔐 Role-based authorization
- 🔐 Soft delete for data preservation
- 🔐 Audit trail (createdBy, updatedBy tracking)

---

## 🏗️ Tech Stack

### Backend
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18 + Vite
- React Router 6
- Axios for API calls
- Context API for state management
- Lucide React for icons
- Inline CSS (Brutalist Design)

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Git

### Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd user-management-system
```

2. **Backend Setup**
```bash
cd backend
npm install
npm run seed    # Create default users
npm run dev     # Start backend on port 5000
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev     # Start frontend on port 5173
```

4. **Access Application**
- Open browser to `http://localhost:5173`
- Login with demo credentials:
  - **Admin**: admin@example.com / Admin@123
  - **Manager**: manager@example.com / Manager@123
  - **User**: user@example.com / User@123

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Users (`/api/users`)
- `GET /api/users` - Get all users (with pagination, search, filter)
- `GET /api/users/stats` - Get user statistics (admin/manager only)
- `POST /api/users` - Create new user (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user (soft delete, admin/manager)
- `PUT /api/users/:id/activate` - Activate user (admin/manager)
- `PUT /api/users/:id/password` - Update password

---

## 🔐 Role-Based Access

| Action | Admin | Manager | User |
|--------|-------|---------|------|
| View all users | ✅ | ✅ | ❌ |
| View statistics | ✅ | ✅ | ❌ |
| Create user | ✅ | ❌ | ❌ |
| Update any user | ✅ | ✅ (non-admins) | ❌ |
| Update own profile | ✅ | ✅ | ✅ |
| Deactivate user | ✅ | ✅ (non-admins) | ❌ |
| Activate user | ✅ | ✅ (non-admins) | ❌ |
| Change roles | ✅ | ❌ | ❌ |

---

## 📊 Dashboard Features

### Admin/Manager Dashboard
- Welcome section with user info
- Quick action cards (Manage Users, My Profile)
- **Real-time Statistics Section**:
  - Total users count
  - Active/Inactive users
  - Role distribution bar chart
- System information panel

### Regular User Dashboard
- Welcome section
- My Profile card
- System information panel

---

## 🎨 Design System

### Brutalist Design Principles
- **Colors**: Stark black (#000000) and white (#ffffff) contrast
- **Borders**: Bold 4px solid borders everywhere
- **Typography**: Monospace fonts, uppercase text, 0.05em letter spacing
- **Shadows**: 6-8px solid black box shadows
- **Corners**: No rounded corners (0px border-radius)
- **Icons**: Lucide React icons with 3px stroke width
- **Animations**: Subtle 3D floating shapes on landing page

### 3D Elements
- 6 floating geometric shapes on hero section
- Opacity: 12-25% for subtle effect
- Purple accent (#6B21A8) and black colors
- CSS-only animations (18-28 seconds)
- Non-intrusive and maintains brutalist aesthetic

---

## 🗄️ Database Management

### Add Admin/Manager Users
```bash
cd backend
node config/add-admin.js
```

Interactive script to create admin/manager accounts with:
- Email validation
- Password hashing
- Role selection
- Status configuration

### View Users in MongoDB Atlas
1. Go to https://cloud.mongodb.com/
2. Browse Collections
3. Select: `user-management-cluster` → `user-management` → `users`

---

## 📝 Project Structure

```
user-management-system/
├── backend/
│   ├── config/
│   │   ├── seed.js              # Database seeding
│   │   └── add-admin.js         # Admin creation script
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── userController.js    # User CRUD + statistics
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification
│   ├── models/
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── userRoutes.js        # User endpoints
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js         # API client
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx  # Landing with 3D elements
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx # With statistics
│   │   │   ├── UsersPage.jsx
│   │   │   ├── UserDetailPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── vite.config.js
│   └── package.json
└── README.md                    # This file
```

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test    # Run test suite (if configured)
```

### Manual Testing
- Import `backend/postman_collection.json` into Postman
- Test all endpoints with pre-configured requests

---

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)
1. Set environment variables in platform
2. Connect MongoDB Atlas
3. Deploy from Git repository

### Frontend Deployment (Vercel/Netlify)
1. Set `VITE_API_URL` to production backend URL
2. Deploy from Git repository
3. Configure build command: `npm run build`
4. Set publish directory: `dist`

---

## 📚 Documentation

- [frontend/FEATURES.md](frontend/FEATURES.md) - Frontend features list
- [frontend/STRUCTURE.md](frontend/STRUCTURE.md) - Frontend structure details

---

## 🎯 Recent Updates

### Latest (April 16, 2026)
- ✅ **Added User Activation/Deactivation Feature**
  - Admin and Manager can now deactivate active users
  - Admin and Manager can reactivate inactive users
  - Managers cannot modify admin accounts (security restriction)
  - Status-based buttons (red DEACTIVATE for active, green ACTIVATE for inactive)
  - Confirmation dialogs for both actions
- ✅ Made dashboard more compact (40% less scrolling)
- ✅ Increased 3D element visibility (darker opacity)
- ✅ Optimized all card sizes and spacing
- ✅ Improved bar chart design
- ✅ Removed pie chart and Quick Insights

### Previous Updates
- ✅ Added real-time statistics dashboard
- ✅ Replaced all emojis with Lucide icons
- ✅ Added 3D floating shapes to landing page
- ✅ Created admin creation script
- ✅ Implemented role-based statistics

---

## � Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

ISC License

---

## 👨‍💻 Author

Built with Node.js, Express, React, and MongoDB

---

**Status**: ✅ Production Ready  
**Version**: 1.0.1  
**Last Updated**: April 16, 2026
