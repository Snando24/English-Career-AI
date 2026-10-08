# English Career AI - Mobile App

> React Native + Expo mobile application for English Career AI Learning Platform

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Expo CLI: `npm install -g expo-cli`
- iOS: Xcode 14+ (for iOS development)
- Android: Android Studio & SDK (for Android development)
- Expo Go app on your device (for testing)

### Installation

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Configure Environment
Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` with your backend API URL:
```
EXPO_PUBLIC_API_URL=http://localhost:8080/api
```

#### 3. Start Development Server
```bash
npm start
```

#### 4. Run on Device/Emulator

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Expo Go App (fastest):**
- Press `i` in terminal for iOS
- Press `a` in terminal for Android
- Or scan QR code with Expo Go app

#### 5. Verify Installation
- Login screen should load
- Try registering with test credentials
- Dashboard should appear after login

---

## 📁 Project Structure

```
mobile/
├── src/
│   ├── app/
│   │   ├── _layout.tsx (root layout)
│   │   ├── (auth)/
│   │   │   ├── _layout.tsx
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   └── (app)/
│   │       ├── _layout.tsx (app navigation)
│   │       ├── index.tsx (dashboard)
│   │       ├── courses.tsx
│   │       └── profile.tsx
│   ├── services/
│   │   └── api.ts (API client with axios)
│   ├── store/
│   │   └── authStore.ts (Zustand auth state)
│   ├── types/
│   │   └── index.ts (TypeScript interfaces)
│   ├── components/ (Phase 1)
│   ├── hooks/ (Phase 1)
│   ├── utils/ (Phase 1)
│   ├── constants/ (Phase 1)
│   └── assets/ (images, icons)
├── package.json
├── app.json (Expo config)
├── eas.json (EAS Build config)
├── tsconfig.json (TypeScript config)
├── babel.config.js (Babel config)
└── README.md (this file)
```

---

## 🔐 Authentication Flow

### Register
1. User enters email, password, confirm password
2. App validates input
3. API registers user and returns JWT token
4. Token stored in SecureStore
5. User redirected to dashboard

### Login
1. User enters email and password
2. API authenticates and returns JWT token
3. Token stored in SecureStore
4. Refresh token stored for session renewal
5. User redirected to dashboard

### Token Refresh
- Automatic: When token expires, app uses refresh token
- Manual: User can refresh by re-opening app
- Logout: Tokens cleared from SecureStore

---

## 📱 Screens (Phase 0 Complete)

### Auth Stack
- **Login** (`(auth)/login.tsx`)
  - Email and password inputs
  - Link to register
  - Error handling

- **Register** (`(auth)/register.tsx`)
  - Email, password, confirm password inputs
  - Password validation
  - Link to login

### App Stack (Protected)
- **Dashboard** (`(app)/index.tsx`)
  - XP and streak display
  - Weekly goal progress
  - Skills overview (6 areas)
  - Continue learning button

- **Courses** (`(app)/courses.tsx`)
  - Course list
  - Progress indicators
  - Placeholder for future navigation

- **Profile** (`(app)/profile.tsx`)
  - User information
  - Professional profile
  - Settings and help links
  - Logout button

---

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | React Native | 0.73.0 |
| Platform | Expo | 50.0.0 |
| Routing | Expo Router | 3.0.0 |
| Language | TypeScript | 5.3.0 |
| State | Zustand | 4.4.0 |
| HTTP Client | Axios | 1.6.0 |
| Secure Store | expo-secure-store | 13.0.0 |
| Storage | expo-sqlite | 14.0.0 |
| Icons | @expo/vector-icons | - |
| Testing | Jest | 29.7.0 |
| UI Framework | React Native (native) | 0.73.0 |

---

## 🔧 Configuration

### app.json
Main Expo configuration:
- App name, slug, version
- iOS and Android specifics
- Plugins and permissions
- Environment variables

### tsconfig.json
TypeScript configuration:
- Strict mode enabled
- Path aliases (@/ for src/, etc)
- Module resolution

### babel.config.js
Babel configuration:
- Expo preset
- Module resolver plugin
- Reanimated support

### .env.example
Environment variables:
- `EXPO_PUBLIC_API_URL` - Backend API URL
- Other configuration options

---

## 📚 API Integration

### ApiService
Centralized HTTP client:
- Singleton pattern
- JWT token injection
- Automatic token refresh
- Error handling
- Request/response interceptors

### Available Endpoints (Phase 0)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh
- `GET /health` - Health check
- `GET /health/info` - API info

### Usage Example
```typescript
import ApiService from '@services/api';

const api = ApiService.getInstance();

// Login
const response = await api.login('user@example.com', 'password');
const { token, refreshToken } = response;
await api.setToken(token, refreshToken);

// Use authenticated endpoint
const health = await api.getHealth();
```

---

## 📊 State Management

### Zustand Store
Global state for authentication:
- `authStore.ts` - Auth state and actions
- User info, tokens, loading state
- Actions: login, register, logout, refresh

### Usage
```typescript
import { useAuthStore } from '@store/authStore';

const { user, isAuthenticated, login, logout } = useAuthStore();
```

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Specific Test
```bash
npm test -- LoginScreen.test.tsx
```

---

## 📦 Building for Distribution

### Preview Build
```bash
npm run build:android    # Android APK
npm run build:ios        # iOS build
```

### Production Build
```bash
eas build --platform android --auto-submit
eas build --platform ios --auto-submit
```

### Submit to Stores
```bash
npm run submit:android
npm run submit:ios
```

---

## 🐛 Troubleshooting

### App Won't Start
```bash
# Clear cache and reinstall
npm run clean
npm install
npm start
```

### Build Issues
```bash
# Clear Expo cache
expo export:clear

# Prebuild native files
expo prebuild
```

### Connection Refused
- Verify backend is running on `http://localhost:8080`
- Check `.env` has correct `EXPO_PUBLIC_API_URL`
- Make sure device is on same network as backend

### TypeScript Errors
```bash
# Check TypeScript
npm run type-check

# Fix TypeScript issues
npm run lint
```

### Android/iOS Specific Issues
```bash
# Clear Android build
rm -rf android

# Clear iOS build
rm -rf ios

# Rebuild
expo prebuild --clean
```

---

## 📈 Next Phases

### Phase 1: Authentication & Onboarding (Weeks 2-3)
- [ ] Onboarding wizard screens (4 steps)
- [ ] Profile setup endpoint
- [ ] Local storage persistence
- [ ] Token refresh on app open

### Phase 2: Courses & Lecciones (Weeks 3-4)
- [ ] Course list screen
- [ ] Lesson detail screen
- [ ] Content download for offline
- [ ] Navigation to exercises

### Phase 3: Exercises & Evaluation (Weeks 4-6)
- [ ] Exercise screen with 4 types
- [ ] Answer submission
- [ ] Result feedback
- [ ] Progress tracking

### Phase 3b: AI Integration (Weeks 5-6)
- [ ] Open-ended answer evaluation
- [ ] Explanation generation
- [ ] Error detection

### Phase 4: Progress & Adaptation (Weeks 6-7)
- [ ] Skills detail screen
- [ ] Errors management screen
- [ ] Recommendations screen

### Phase 5: Offline Sync (Weeks 7-8)
- [ ] Local database (SQLite)
- [ ] Sync queue
- [ ] Automatic sync on connect

### Phase 6: Polish & Testing (Weeks 8-9)
- [ ] Performance optimization
- [ ] Comprehensive test coverage
- [ ] UI/UX refinement
- [ ] Accessibility improvements

---

## 📞 Support

For issues or questions:
1. Check [Expo Documentation](https://docs.expo.dev/)
2. Review [React Native Docs](https://reactnative.dev/)
3. Check logs: `npm start` shows debug output
4. Use Expo Dev Tools (press `d` in terminal)

---

## 📄 Environment File

Create `.env` file:
```bash
# Backend API Configuration
EXPO_PUBLIC_API_URL=http://localhost:8080/api

# App Configuration
EXPO_PUBLIC_APP_VERSION=1.0.0
EXPO_PUBLIC_APP_NAME=English Career AI

# Feature Flags
EXPO_PUBLIC_ENABLE_OFFLINE_MODE=true
EXPO_PUBLIC_ENABLE_AI_EVALUATION=true
```

---

**Status**: Phase 0 Complete ✅  
**Version**: 1.0.0-MVP  
**Last Updated**: 2026-10-08
