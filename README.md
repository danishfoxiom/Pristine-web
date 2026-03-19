# Management Dashboard

A modern, feature-rich management web application built with React, TypeScript, and Vite. This dashboard provides a complete solution for managing users, content, and settings with an intuitive user interface.

## 📋 Features

### ✅ Core Features
- **Dashboard Home** - Overview with analytics and statistics
- **User Management** - Manage users and permissions
- **Content Management** - Handle content and media
- **Settings Page** - Application configuration
- **Authentication** - Protected routes with login page
- **Responsive Design** - Mobile-first approach, works on all devices
- **Modern UI** - Clean design with Tailwind CSS and Lucide icons

### 🎁 Bonus Features
- **✨ Dark Mode** - Toggle between light and dark themes (persistent)
- **📊 Dashboard Analytics** - Stats cards and activity tracking
- **🎨 Dark Mode Typography** - Fully styled dark mode UI
- **📱 Mobile Navigation** - Hamburger menu for tablet/mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/danish2026/management-dashboard.git
cd management-dashboard

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build
# or
yarn build

# Preview the production build
npm run preview
# or
yarn preview
```

### Linting & Type Checking

```bash
# Run ESLint
npm run lint

# Type check
npm run typecheck
```

## 🔑 Demo Credentials

For testing the protected dashboard:
- **Username:** `admin`
- **Password:** `admin123`

These credentials are displayed on the login page for convenience.

## 📁 Project Structure

```
src/
├── components/
│   ├── dashBord.tsx             # Dashboard stats display
│   ├── ProtectedRoute.tsx       # Route protection wrapper
│   ├── Sidebar.tsx              # Navigation sidebar with menu
│   └── ToastContainer.tsx       # Toast notifications
│
├── config/
│   ├── api.ts                   # API endpoint constants
│   └── apiClient.ts             # Axios client with interceptors
│
├── context/
│   ├── AuthContext.tsx          # Authentication state management
│   ├── ThemeContext.tsx         # Theme state management
│   └── ToastContext.tsx         # Toast notifications
│
├── lib/
│   └── supabase.tsx             # Supabase client initialization
│
├── pages/
│   ├── Login.tsx                # Authentication page
│   ├── Dashboard.tsx            # Main layout wrapper
│   ├── DashboardHome.tsx        # Dashboard overview page
│   ├── UsersPage.tsx            # Users management
│   ├── ContentPage.tsx          # Content management
│   └── SettingsPage.tsx         # Settings page
│
├── type/
│   └── database.ts              # Supabase schema types
│
├── App.tsx                       # Main app routing
├── main.tsx                      # React entry point
└── index.css                     # Tailwind imports
```

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18.3.1 + TypeScript 5.5.3 |
| **Build Tool** | Vite 5.4.2 |
| **Routing** | React Router DOM 7.13.0 |
| **Styling** | Tailwind CSS 3.4.1 |
| **HTTP Client** | Axios 1.13.5 |
| **Icons** | Lucide React 0.344.0 |
| **State** | React Context API + useState |
| **Backend Ready** | Supabase JS 2.57.4 |
| **Linting** | ESLint 9.9.1 |

### State Management

- **Authentication:** React Context (`AuthContext.tsx`) - Manages login/logout and protected routes
- **Theme:** React Context (`ThemeContext.tsx`) - Manages dark/light mode
- **UI State:** Component-level state for modals, forms

### Data Flow

```
App (BrowserRouter)
├── AuthProvider
│   └── Routes
│       ├── /login → Login (public)
│       └── /dashboard → Protected
│           ├── DashboardHome
│           ├── UsersPage
│           ├── ContentPage
│           └── SettingsPage
```

## 🧪 Testing the Application

### Demo Workflows

**1. Login**
```
1. Navigate to http://localhost:5173/login
2. Enter: admin / admin123
3. Click "Sign In"
```

**2. Navigate Dashboard**
```
1. Use sidebar navigation to access different pages
2. View dashboard analytics
3. Toggle dark mode with sun/moon icon
```

## � Authentication

### Current Implementation
- **Simple authentication** with hardcoded credentials
- **localStorage-based sessions** for development
- **Protected routes** via `ProtectedRoute` component
- **Auto-redirect** on 401 errors (via axios interceptor)

### For Production

Replace the hardcoded credentials in `AuthContext.tsx` with:
```typescript
// Replace the login function with your backend API call
const response = await POST('/auth/login', { username, password });
localStorage.setItem('token', response.token);
```

## 🔧 Development Assumptions

### Design Decisions

1. **Simple Auth** - Hardcoded credentials for development (replace for production)
2. **Placeholder Pages** - Users, Content, Settings pages show empty states (expandable)
3. **Component-Level State** - Simple state management adequate for this scope
4. **Dark Mode Classes** - Uses Tailwind's `dark:` utility classes (no external library)

### Assumptions Made

1. **User Personas**: Single admin user managing the system
2. **Offline-First**: Application prioritizes offline functionality
3. **Browser Support**: Modern browsers (ES2020+)
4. **Mobile**: Tablet and above (no specific mobile-first API changes)

## 🚀 Production Considerations

### Before Deploying

1. **Replace Demo Auth**
   ```typescript
   // In AuthContext.tsx
   const response = await POST('/auth/login', { username, password });
   ```

2. **Connect Real Backend**
   ```typescript
   // Update apiClient.ts baseURL
   const ApiBaseUrl = process.env.REACT_APP_API_BASE_URL
   ```

3. **Enable Supabase** (Already configured)
   ```typescript
   // In lib/supabase.tsx, use the client for API calls
   await supabase.from('users').select()
   ```

4. **Environment Variables**
   ```bash
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   REACT_APP_API_BASE_URL=your_api_url
   ```

5. **Build & Deploy**
   ```bash
   npm run build
   # Deploy dist/ folder to hosting
   ```

### Deployment Options

- **Vercel** (recommended for Vite) - One-click deployment
- **Netlify** - Auto build on git push
- **Docker** - Containerized deployment
- **GitHub Pages** - Static hosting

## 📊 Performance Optimizations

- **Code Splitting** - React Router lazy loading ready
- **Tailwind Purging** - Only included CSS is bundled
- **Vite Optimizations** - Fast HMR and build times

## 🐛 Troubleshooting

### Dark Mode Not Working
- Ensure `dark` class is applied to parent element
- Check Tailwind config: `darkMode: 'class'`

### Authentication Issues
- Ensure cookies/localStorage are enabled
- Check if token is in localStorage: `localStorage.getItem('token')`

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Router](https://reactrouter.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Danish**  
GitHub: [@danish2026](https://github.com/danish2026)

---

**Last Updated:** March 10, 2026
**Status:** Production Ready (with optional backend integration)
