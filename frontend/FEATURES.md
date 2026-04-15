# Frontend Features Overview

## 🎨 Design System

### Brutalist Design Philosophy
The frontend implements a **brutalist design system** inspired by the template folder:

#### Visual Characteristics
- **High Contrast**: Pure black (#000000) on white (#ffffff)
- **Bold Borders**: 3-4px solid black borders on all elements
- **Box Shadows**: 4-12px offset shadows for depth
- **Typography**: Courier New monospace font family
- **Uppercase Text**: Headers and labels in uppercase
- **Letter Spacing**: 0.05em for readability
- **No Rounded Corners**: All elements have sharp 90° corners
- **Functional First**: Form follows function, no decoration

#### Color Palette
```
Primary:      #000000 (Black)
Background:   #ffffff (White)
Accent:       #6B21A8 (Purple)
Success:      #16a34a (Green)
Destructive:  #ff0000 (Red)
Info:         #1d4ed8 (Blue)
Muted:        #f5f5f5 (Light Gray)
Text Muted:   #666666 (Dark Gray)
```

## 📄 Pages

### 1. Landing Page (`/`)
**Purpose**: Public homepage showcasing features and roles

**Sections**:
- **Header**: Logo and sign-in button
- **Hero**: Large title with call-to-action
- **Features**: 6 feature cards with icons
  - User Management
  - Role-Based Access
  - Advanced Search
  - Audit Trail
  - Secure Auth
  - Fast & Simple
- **Roles**: 3 role cards explaining permissions
  - Admin capabilities
  - Manager capabilities
  - User capabilities
- **CTA**: Final call-to-action section
- **Footer**: Copyright and tech stack

**Design Elements**:
- 4px black borders separating sections
- Feature cards with 6px shadows
- Large bold typography
- Monospace font throughout

### 2. Login Page (`/login`)
**Purpose**: User authentication

**Features**:
- Email and password inputs
- Demo credentials display
- Error message display
- Loading state during login
- Back to home button

**Design Elements**:
- Centered card with 12px shadow
- 4px black border
- Bold uppercase labels
- Purple accent button
- Red error boxes

**Demo Credentials Shown**:
- Admin: admin@example.com / Admin@123
- Manager: manager@example.com / Manager@123
- User: user@example.com / User@123

### 3. Dashboard Page (`/dashboard`)
**Purpose**: User home after login

**Features**:
- Personalized welcome message
- Role badge display
- Quick action cards
- System information grid

**Navigation**:
- Dashboard (active)
- Manage Users (Admin/Manager only)
- My Profile
- Logout

**Quick Actions**:
- Manage Users card (Admin/Manager)
- My Profile card
- Statistics card

**System Info**:
- User email
- User role
- Account status
- Member since date

### 4. Users Page (`/users`)
**Purpose**: User management interface (Admin/Manager only)

**Features**:
- **Search**: Search by name or email
- **Filters**: Filter by role and status
- **Pagination**: Navigate through pages
- **Create User**: Modal form (Admin only)
- **User Table**: Display all users
- **Actions**: View and deactivate buttons

**Table Columns**:
- Name
- Email
- Role (with colored badge)
- Status (active/inactive)
- Created date
- Actions

**Create User Modal**:
- Name input
- Email input
- Password input
- Role select (user/manager/admin)
- Status select (active/inactive)
- Create and cancel buttons

**Permissions**:
- Admin: Full access, can create users
- Manager: View and edit non-admin users
- User: No access (redirected)

### 5. User Detail Page (`/users/:id`)
**Purpose**: View and edit individual user

**Features**:
- **View Mode**: Display user information
- **Edit Mode**: Form to update user
- **Audit Trail**: Creation and update history
- **Role-Based Editing**: Permissions enforced

**Information Displayed**:
- Name
- Email
- Role (with badge)
- Status
- Created at
- Last updated
- Created by (if available)
- Updated by (if available)

**Edit Permissions**:
- Admin: Can edit all fields for all users
- Manager: Can edit non-admin users
- User: Can edit own profile only

### 6. Profile Page (`/profile`)
**Purpose**: Manage own profile

**Features**:
- **Profile Information**: View and edit name
- **Change Password**: Update password
- **Account Information**: View account details

**Three Cards**:
1. **Profile Information**
   - Email (read-only)
   - Role badge
   - Status
   - Name input (editable)
   - Update button

2. **Change Password**
   - Current password input
   - New password input (min 6 chars)
   - Change password button

3. **Account Information**
   - Member since date
   - Last updated date

## 🔐 Authentication Flow

### Login Process
1. User enters email and password
2. Frontend sends POST to `/api/auth/login`
3. Backend validates and returns tokens
4. Frontend stores tokens in localStorage
5. User object stored in AuthContext
6. Redirect to dashboard

### Token Management
- **Access Token**: 15-minute expiry, sent with every request
- **Refresh Token**: 7-day expiry, used to get new access token
- **Auto-Refresh**: Axios interceptor handles 401 errors
- **Logout**: Clears all tokens and redirects to login

### Protected Routes
- Wraps components with `ProtectedRoute`
- Checks if user is authenticated
- Verifies role permissions
- Redirects to login if not authenticated
- Redirects to dashboard if insufficient permissions

## 🎯 User Roles & Access

### Admin
**Full Access**:
- ✅ View all users
- ✅ Create new users
- ✅ Edit any user
- ✅ Change any user's role
- ✅ Deactivate users
- ✅ View complete audit trails

**Pages Accessible**:
- Dashboard
- Users (full access)
- User Detail (all users)
- Profile

### Manager
**Limited Access**:
- ✅ View all users
- ✅ Edit regular users and managers
- ❌ Cannot create users
- ❌ Cannot edit admin users
- ❌ Cannot deactivate users
- ✅ View audit trails

**Pages Accessible**:
- Dashboard
- Users (view only)
- User Detail (non-admin users)
- Profile

### User
**Minimal Access**:
- ❌ Cannot view other users
- ❌ Cannot access user management
- ✅ View own profile
- ✅ Edit own name
- ✅ Change own password

**Pages Accessible**:
- Dashboard (limited)
- Profile

## 🔍 Search & Filter

### Search Functionality
- Search by name (partial match)
- Search by email (partial match)
- Case-insensitive
- Real-time search on submit

### Filter Options
- **Role Filter**: All, Admin, Manager, User
- **Status Filter**: All, Active, Inactive
- Filters can be combined
- Resets to page 1 on filter change

### Pagination
- Default: 8 users per page
- Previous/Next buttons
- Current page indicator
- Disabled buttons at boundaries

## 📊 Data Display

### User Table
- Responsive design
- Hover effects on rows
- Colored role badges
- Status indicators
- Action buttons

### Role Badges
- **Admin**: Purple (#6B21A8)
- **Manager**: Blue (#1d4ed8)
- **User**: Green (#16a34a)
- Bold text with border

### Status Display
- **Active**: Green text
- **Inactive**: Red text
- Bold uppercase

## 🎨 UI Components

### Navigation Bar
- Black background
- White text
- Active page highlighted
- Responsive layout
- Logout button (red)

### Cards
- White background
- 4px black border
- 6-8px shadow
- Hover effects
- Click interactions

### Buttons
- Primary: Purple with shadow
- Success: Green with shadow
- Destructive: Red with shadow
- Secondary: Gray with shadow
- Hover: Shadow reduces
- Active: Shadow disappears

### Forms
- Bold uppercase labels
- 3px black borders
- White backgrounds
- Placeholder text
- Required field validation

### Modals
- Dark overlay (80% opacity)
- Centered card
- 12px shadow
- Scrollable content
- Close on cancel

### Messages
- **Error**: Red border, light red background
- **Success**: Green border, light green background
- Bold text
- Auto-dismiss after 3 seconds

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Adaptations
- Navigation wraps to multiple lines
- Cards stack vertically
- Table scrolls horizontally
- Reduced padding
- Smaller font sizes

### Touch Interactions
- Larger tap targets
- No hover effects on mobile
- Swipe-friendly tables
- Modal full-screen on small devices

## ⚡ Performance

### Optimizations
- Inline styles (no CSS parsing)
- Minimal dependencies
- Code splitting with React Router
- Lazy loading (ready for implementation)
- Efficient re-renders with Context

### Loading States
- Loading message during data fetch
- Disabled buttons during submission
- Skeleton screens (ready for implementation)

## 🔒 Security Features

### Frontend Security
- No sensitive data in localStorage (only tokens)
- XSS prevention through React
- CSRF protection via tokens
- Secure token storage
- Auto-logout on token expiry

### Input Validation
- Required field validation
- Email format validation
- Password minimum length (6 chars)
- Form submission prevention on invalid data

## 🎯 User Experience

### Feedback
- Success messages on actions
- Error messages on failures
- Loading states during operations
- Confirmation dialogs for destructive actions

### Navigation
- Breadcrumbs (back button)
- Clear page titles
- Active page highlighting
- Logical flow between pages

### Accessibility
- Semantic HTML
- Form labels
- Button descriptions
- Keyboard navigation
- Focus management

## 🚀 Future Enhancements

### Potential Features
- [ ] Dark mode toggle
- [ ] User avatars
- [ ] Bulk operations
- [ ] Export to CSV
- [ ] Advanced filtering
- [ ] Activity logs
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Password strength meter
- [ ] Profile pictures

### Performance Improvements
- [ ] Virtual scrolling for large lists
- [ ] Infinite scroll pagination
- [ ] Image optimization
- [ ] Service worker caching
- [ ] Code splitting optimization

### UX Enhancements
- [ ] Skeleton loaders
- [ ] Toast notifications
- [ ] Drag and drop
- [ ] Keyboard shortcuts
- [ ] Search suggestions
- [ ] Recent searches

---

**Frontend Status**: ✅ Complete and Production-Ready

**Design System**: Brutalist with stark contrast and bold elements

**Last Updated**: April 15, 2026
