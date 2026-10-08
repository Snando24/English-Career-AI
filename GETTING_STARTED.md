# English Career AI - Getting Started

> Complete implementation guide for Phase 0 ✅

Welcome! You now have a complete Spring Boot backend and React Native mobile app ready for development.

## 📋 What's Included

### ✅ Backend (Spring Boot + Java 21)
- REST API with JWT authentication
- PostgreSQL database with migrations
- Redis caching
- Docker Compose for easy local setup
- Swagger documentation
- Modular architecture

### ✅ Mobile (React Native + Expo)
- TypeScript for type safety
- Expo Router for navigation
- Zustand for state management
- Axios for API calls
- Login & Register screens
- Dashboard with stats
- Profile management

## 🚀 Quick Start (5 minutes)

### Backend

```bash
# Navigate to backend
cd backend

# Start database services (PostgreSQL + Redis)
docker-compose up -d

# Run the API
mvn spring-boot:run
```

✅ Backend running at: `http://localhost:8080/api`  
📚 Swagger UI: `http://localhost:8080/api/swagger-ui.html`

### Mobile

```bash
# Navigate to mobile
cd mobile

# Install dependencies
npm install

# Start development server
npm start
```

✅ Development server running  
📱 Scan QR code with Expo Go app or press `i`/`a` for simulator

## 🧪 Test It Now

### 1. Register a User
**Mobile Screen**: Tap "Register"
```
Email: test@example.com
Password: TestPassword123!
Confirm: TestPassword123!
```

### 2. Login
**Mobile Screen**: Use same credentials
```
Email: test@example.com
Password: TestPassword123!
```

### 3. View Dashboard
- See your XP (⭐ 1,420)
- Streak (🔥 8 days)
- Skills breakdown
- Weekly goal progress

### 4. Check Database
**PgAdmin**: http://localhost:5050
```
Email: admin@englishcareer.com
Password: admin
```

## 🏗️ Project Structure

```
English-Career-AI/
├── backend/              # Spring Boot API
│   ├── src/main/java/   # Java source code
│   ├── pom.xml          # Maven config
│   ├── docker-compose.yml
│   └── README.md
│
├── mobile/              # React Native App
│   ├── src/app/        # Screens
│   ├── src/services/   # API client
│   ├── src/store/      # State
│   ├── package.json
│   └── README.md
│
├── docs/               # Documentation
├── README.md           # Main README
└── PLAN_IMPLEMENTACION.md
```

## 📡 API Endpoints (Phase 0)

### Authentication
```bash
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

### Health
```bash
GET /api/health
GET /api/health/info
```

### Courses (Phase 2)
```bash
GET /api/courses
GET /api/courses/{id}
GET /api/modules/{id}/lessons
GET /api/lessons/{id}
```

### Exercises (Phase 3)
```bash
GET /api/lessons/{id}/exercises
POST /api/exercises/{id}/submit
```

## 🔄 Development Workflow

### During Backend Development
```bash
cd backend
mvn spring-boot:run
```

### During Mobile Development
```bash
cd mobile
npm start
# Press 'r' to reload after changes
```

### Testing Both Together
```bash
# Terminal 1: Backend
cd backend && mvn spring-boot:run

# Terminal 2: Mobile
cd mobile && npm start

# Terminal 3: Optional - Database UI
# Access http://localhost:5050
```

## 🗂️ Database Structure

**Tables Created:**
- `users` - User accounts
- `user_profiles` - Professional info
- `courses` - Learning courses
- `modules` - Course modules
- `lessons` - Individual lessons
- `exercises` - Practice exercises
- `user_progress` - Completion tracking
- `user_skills` - Skill scores
- `user_errors` - Error tracking
- `user_answers` - Answer history

**Seed Data:**
- Course: "Foundations" (A0 level)
- Module: "Verb To Be" (3 lessons)
- Exercises: 10 practice questions

## ⚙️ Configuration

### Backend
- **Default Port**: 8080
- **Context Path**: /api
- **Database**: PostgreSQL (localhost:5432)
- **Cache**: Redis (localhost:6379)

### Mobile
- **API URL**: http://localhost:8080/api (adjust for device testing)
- **Platform**: iOS/Android/Web

## 🔐 Authentication

### Secure Token Storage
- Tokens stored in `SecureStore` (device encrypted storage)
- Automatic token refresh on expiration
- Logout clears all tokens

### Credentials
- Stored as bcrypt hash in database
- Password strength validation
- Session management via JWT

## 📱 Testing on Another Device

### Setup
1. **Get Your Machine IP**
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. **Update Mobile API URL**
   Edit `mobile/.env`:
   ```
   EXPO_PUBLIC_API_URL=http://<YOUR_IP>:8080/api
   ```

3. **Restart Mobile Server**
   ```bash
   npm start
   # Press 'r' to reload
   ```

4. **Connect Device**
   - Open Expo Go app
   - Scan QR code
   - Or enter connection manually

### Requirements
- Device on same WiFi network
- Port 8080 accessible from device
- Backend running and accessible

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check Java version (should be 21+)
java -version

# Check Docker containers
docker-compose ps

# Clear Maven cache
mvn clean
```

### Mobile Won't Connect
```bash
# Check API URL
echo $EXPO_PUBLIC_API_URL

# Verify backend is running
curl http://localhost:8080/api/health

# Use device network settings to verify connectivity
```

### Database Issues
```bash
# Reset database
docker-compose down -v
docker-compose up -d

# Check migration status
psql -h localhost -U admin -d english_career
\dt  # show tables
```

## 📖 Documentation

- **Backend**: [backend/README.md](backend/README.md)
- **Mobile**: [mobile/README.md](mobile/README.md)
- **Plan**: [PLAN_IMPLEMENTACION.md](PLAN_IMPLEMENTACION.md)
- **Overview**: [README.md](README.md)

## 🎯 Next Phase: Phase 1 (Authentication & Onboarding)

What's coming next:
- ✅ Onboarding wizard (4 steps)
- ✅ User profile creation
- ✅ Professional area selection
- ✅ Local data persistence

**Estimated**: 1-2 weeks

## 📊 Project Statistics

- **Backend Code**: ~2,000 lines Java
- **Mobile Code**: ~800 lines TypeScript/React
- **Database Tables**: 12 tables with full schema
- **API Endpoints**: 15+ endpoints (partial Phase 0-1)
- **Configuration Files**: Docker, Maven, TypeScript, Babel

## ✨ Key Features (Phase 0)

- ✅ User registration with validation
- ✅ Secure JWT authentication
- ✅ Password encryption (bcrypt)
- ✅ Token refresh mechanism
- ✅ Responsive mobile UI
- ✅ Error handling
- ✅ Database persistence
- ✅ Modular architecture

## 🚀 Ready to Start?

1. **Start Backend**: `cd backend && docker-compose up -d && mvn spring-boot:run`
2. **Start Mobile**: `cd mobile && npm install && npm start`
3. **Register**: Create a test account
4. **Login**: Use same credentials
5. **Explore**: Check dashboard, profile, courses

---

## 💡 Tips

- Keep terminal windows visible for errors
- Check logs immediately if something fails
- Use Swagger UI to test backend endpoints
- Use React DevTools for mobile debugging
- Keep .env files updated for device testing

## 📞 Need Help?

1. Check individual README files in `backend/` and `mobile/`
2. Review error messages carefully
3. Check Docker logs: `docker-compose logs -f`
4. Check backend logs in terminal running `mvn spring-boot:run`
5. Check mobile logs: Look in Expo terminal

---

**Status**: Phase 0 ✅ Complete and Ready  
**Version**: 1.0.0-MVP  
**Last Updated**: 2026-10-08

**Next**: Start Phase 1 when ready! 🚀
