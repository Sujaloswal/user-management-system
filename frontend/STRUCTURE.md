# Frontend Structure Overview

## Complete File Tree

```
frontend/
├── public/                        # Static assets (auto-created by Vite)
├── src/
│   ├── api/
│   │   └── axios.js              # ✅ Axios instance with interceptors
│   ├── components/
│   │   └── ProtectedRoute.jsx    # ✅ Route protection HOC
│   ├── context/
│   │   └── AuthContext.jsx       # ✅ Authentication context provider
│   ├── pages/
│   │   ├── LandingPage.jsx       # ✅ Public landing page
│   │   ├── LoginPage.jsx         # ✅ Login page with demo credentials
│   │   ├── DashboardPage.jsx     # ✅ User dashboard
│   │   ├── UsersPage.jsx         # ✅ User management table
│   │   ├── UserDetailPage.jsx    # ✅ User detail and edit
│   │   └── ProfilePage.jsx       # ✅ User profile management
│   ├── utils/                    # (Empty - ready for future utilities)
│   ├── App.jsx                   # ✅ Main app with routing
│   ├── main.jsx                  # ✅ React entry point
│   └── index.css                 # ✅ Global brutalist styles
├── .env                          # ✅ Environment variables
├── .gitignore                    # ✅ Git ignore rules
├── index.html                    # ✅ HTML template
├── package.json                  # ✅ Dependencies and scripts
├── vite.config.js                # ✅ Vite configuration
├── README.md                     # ✅ Complete documentation
└── STRUCTURE.md                  # ✅ This file
```

## Installation & Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | LandingPage | Public | Landing page with features |
| `/login` | LoginPage | Public | Login form |
| `/dashboard` | DashboardPage | Protected | User dashboard |
| `/users` | UsersPage | Admin/Manager | User management |
| `/users/:id` | UserDetailPage | Protected | User details |
| `/profile` | ProfilePage | Protected | Own profile |

## Component Hierarchy

```
App
├── AuthProvider (Context)
│   └── BrowserRouter
│       └── Routes
│           ├── LandingPage
│           ├── LoginPage
│           └── ProtectedRoute
│               ├── DashboardPage
│               ├── UsersPage (Admin/Manager only)
│               ├── UserDetailPage
│               └── ProfilePage
```

## State Management

### AuthContext
- `user` - Current user object
- `loading` - Loading state
- `login(email, password)` - Login function
- `logout()` - Logout function
- `updateUserInContext(user)` - Update user in context

### Local Storage
- `accessToken` - JWT access token
- `refreshToken` - JWT refresh token
- `user` - User object (JSON)

## API Integration

### Axios Instance (`src/api/axios.js`)
- Base URL: `http://localhost:5000/api`
- Request interceptor: Adds Bearer token
- Response interceptor: Handles 401 and token refresh

### API Endpoints Used
```
POST   /auth/login          - User login
POST   /auth/refresh        - Refresh access token
GET    /users               - List users (paginated)
POST   /users               - Create user (Admin)
GET    /users/:id           - Get user details
PUT    /users/:id           - Update user
PUT    /users/:id/password  - Change password
DELETE /users/:id           - Deactivate user (Admin)
```

## Design System

### Brutalist Design Principles
1. **High Contrast**: Black (#000000) and White (#ffffff)
2. **Bold Borders**: 3-4px solid black borders
3. **Box Shadows**: 4-12px offset shadows
4. **Typography**: Courier New monospace, uppercase
5. **No Rounded Corners**: radius: 0
6. **Functional**: Form follows function

### Color Palette
```css
Primary:      #000000 (Black)
Background:   #ffffff (White)
Accent:       #6B21A8 (Purple)
Success:      #16a34a (Green)
Destructive:  #ff0000 (Red)
Info:         #1d4ed8 (Blue)
Muted:        #f5f5f5 (Light Gray)
```

### Component Patterns
- Cards: White background, 4px black border, 8px shadow
- Buttons: Colored background, 3-4px border, 4-6px shadow
- Inputs: White background, 3px black border
- Tables: Black borders, alternating row hover
- Badges: Colored background, 2px border, uppercase

## Features Implemented

### Authentication
- ✅ JWT-based login
- ✅ Automatic token refresh
- ✅ Protected routes
- ✅ Role-based access control
- ✅ Logout functionality

### User Management
- ✅ List users with pagination
- ✅ Search by name/email
- ✅ Filter by role and status
- ✅ Create new users (Admin)
- ✅ View user details
- ✅ Edit user information
- ✅ Deactivate users (Admin)
- ✅ Audit trail display

### Profile Management
- ✅ View own profile
- ✅ Update name
- ✅ Change password
- ✅ Account information

### UI/UX
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Success messages
- ✅ Brutalist aesthetics
- ✅ Accessible forms
- ✅ Modal dialogs

## Next Steps (Optional Enhancements)

### Potential Additions
- [ ] Dark mode toggle
- [ ] Export users to CSV
- [ ] Bulk user operations
- [ ] Advanced filtering
- [ ] User activity logs
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] User avatars
- [ ] Notification system
- [ ] Settings page

### Performance Optimizations
- [ ] Code splitting
- [ ] Lazy loading routes
- [ ] Image optimization
- [ ] Caching strategies
- [ ] Service worker

### Testing
- [ ] Unit tests (Vitest)
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Accessibility tests

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

## Scripts

```json
{
  "dev": "vite",              // Start dev server
  "build": "vite build",      // Build for production
  "preview": "vite preview",  // Preview production build
  "lint": "eslint ."          // Run linter
}
```

## Dependencies

### Production
- `react` ^18.3.1
- `react-dom` ^18.3.1
- `react-router-dom` ^6.28.0
- `axios` ^1.7.9

### Development
- `@vitejs/plugin-react` ^4.3.4
- `vite` ^6.0.3
- `eslint` ^9.17.0

## Notes

- All components use inline styles for portability
- No CSS preprocessors or frameworks
- Design inspired by brutalist web design
- Fully functional without JavaScript frameworks beyond React
- Mobile-first responsive approach
- Accessibility considerations included

## Demo Credentials

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

---

**Status**: ✅ Complete and ready for development

**Last Updated**: 2026-04-15
