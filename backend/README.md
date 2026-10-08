# English Career AI - Backend API

> Spring Boot 3.x REST API for English Career AI Learning Platform

## 🚀 Quick Start

### Prerequisites
- Java 21 JDK
- Maven 3.8+
- Docker & Docker Compose
- PostgreSQL 15+ (via Docker)
- Redis 7+ (via Docker)

### Setup

#### 1. Start Database & Cache Services
```bash
docker-compose up -d
```

This will start:
- PostgreSQL (port 5432)
- Redis (port 6379)
- PgAdmin (port 5050)

Verify:
```bash
docker-compose ps
```

#### 2. Build the Project
```bash
mvn clean install
```

#### 3. Run the Application
```bash
mvn spring-boot:run
```

Or:
```bash
java -jar target/english-career-api-1.0.0-MVP.jar
```

#### 4. Verify Installation
```bash
curl http://localhost:8080/api/health
# Response: {"status":"UP","timestamp":"2026-10-08T...","service":"English Career AI API","version":"1.0.0-MVP"}
```

#### 5. Access Swagger UI
Open browser: http://localhost:8080/api/swagger-ui.html

### Database Access

#### PgAdmin (Web UI)
- URL: http://localhost:5050
- Email: admin@englishcareer.com
- Password: admin

#### psql (CLI)
```bash
psql -h localhost -U admin -d english_career
Password: dev_password
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/englishcareer/
│   │   │   ├── Application.java (entry point)
│   │   │   ├── auth/
│   │   │   │   ├── controller/
│   │   │   │   │   └── AuthController.java
│   │   │   │   ├── entity/
│   │   │   │   │   ├── User.java
│   │   │   │   │   └── UserProfile.java
│   │   │   │   ├── dto/
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   └── AuthResponse.java
│   │   │   │   ├── repository/
│   │   │   │   │   └── UserRepository.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   └── CustomUserDetailsService.java
│   │   │   │   ├── security/
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   └── JwtAuthenticationFilter.java
│   │   │   │   └── config/
│   │   │   │       └── SecurityConfig.java
│   │   │   ├── common/
│   │   │   │   ├── controller/
│   │   │   │   │   └── HealthController.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   │   ├── ResourceAlreadyExistsException.java
│   │   │   │   │   ├── InvalidInputException.java
│   │   │   │   │   ├── ErrorResponse.java
│   │   │   │   │   └── GlobalExceptionHandler.java
│   │   │   │   └── model/
│   │   │   │       └── BaseEntity.java
│   │   │   ├── courses/ (Phase 2)
│   │   │   ├── lessons/ (Phase 2)
│   │   │   ├── exercises/ (Phase 3)
│   │   │   ├── evaluations/ (Phase 3b)
│   │   │   ├── progress/ (Phase 4)
│   │   │   └── ai/ (Phase 3b)
│   │   └── resources/
│   │       ├── application.yaml (main config)
│   │       ├── application-dev.yaml (development)
│   │       ├── application-prod.yaml (production)
│   │       └── db/migrations/
│   │           ├── V1__initial_schema.sql
│   │           └── V2__seed_data.sql
│   └── test/
│       └── java/com/englishcareer/
│           └── (test classes will be added in Phase 6)
├── pom.xml (Maven configuration)
├── docker-compose.yml (Database & Cache setup)
└── README.md (this file)
```

---

## 🔐 Authentication Flow

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "passwordConfirm": "SecurePass123!"
}

Response: 201 Created
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400000,
  "tokenType": "Bearer"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400000,
  "tokenType": "Bearer"
}
```

### Authenticated Requests
```bash
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9...
```

---

## 🛠️ Configuration

### Environment Variables

**Development (default)**
```bash
export SPRING_PROFILES_ACTIVE=dev
export DATABASE_URL=jdbc:postgresql://localhost:5432/english_career
export DATABASE_USER=admin
export DATABASE_PASSWORD=dev_password
export REDIS_HOST=localhost
export REDIS_PORT=6379
export JWT_SECRET=dev-secret-key-change-in-production-only-for-testing
```

**Production**
```bash
export SPRING_PROFILES_ACTIVE=prod
export DATABASE_URL=jdbc:postgresql://prod-db-host:5432/english_career
export DATABASE_USER=prod_user
export DATABASE_PASSWORD=secure_password
export REDIS_HOST=prod-redis-host
export REDIS_PORT=6379
export REDIS_PASSWORD=redis_password
export JWT_SECRET=generate-a-strong-random-key-at-least-32-chars
```

---

## 📊 API Endpoints (Phase 0 Complete)

### ✅ Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token

### ✅ Health
- `GET /api/health` - Health check
- `GET /api/health/info` - API information

### 📋 Documentation
- `GET /api/swagger-ui.html` - Swagger UI
- `GET /api/v3/api-docs` - OpenAPI JSON

---

## 🧪 Testing

### Run All Tests
```bash
mvn test
```

### Run Specific Test Class
```bash
mvn test -Dtest=AuthServiceTest
```

### With Coverage
```bash
mvn test jacoco:report
open target/site/jacoco/index.html
```

---

## 🐛 Troubleshooting

### Connection Refused (Database)
```bash
# Check if Docker containers are running
docker-compose ps

# Restart containers
docker-compose down
docker-compose up -d
```

### Java Version Mismatch
```bash
# Check Java version
java -version

# Should be 21+. If not:
# Install JDK 21 from https://adoptium.net/
```

### Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080

# Change port in application.yaml
server:
  port: 8081
```

### Database Schema Issues
```bash
# Reset database
docker-compose down -v
docker-compose up -d

# Check migrations
psql -h localhost -U admin -d english_career
\dt  # list tables
```

---

## 📚 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | Java | 21 |
| Framework | Spring Boot | 3.2.0 |
| Security | Spring Security + JWT | JJWT 0.12.3 |
| Database | PostgreSQL | 15+ |
| ORM | Spring Data JPA | 3.2.0 |
| Cache | Redis | 7+ |
| API Docs | SpringDoc OpenAPI | 2.1.0 |
| Build | Maven | 3.8+ |
| Containerization | Docker | Latest |

---

## 📈 Next Phases

### Phase 1: Authentication & Onboarding (Weeks 2-3)
- [ ] User profile endpoints
- [ ] Onboarding wizard endpoints
- [ ] Profile persistence

### Phase 2: Courses & Lecciones (Week 3-4)
- [ ] Course CRUD operations
- [ ] Lesson content delivery
- [ ] Offline download support

### Phase 3: Exercises & Evaluation (Weeks 4-6)
- [ ] Exercise endpoints
- [ ] Answer evaluation service
- [ ] Progress tracking

### Phase 3b: AI Integration (Weeks 5-6)
- [ ] OpenAI/Anthropic integration
- [ ] Open-ended answer evaluation
- [ ] Error detection system

### Phase 4: Progress & Adaptation (Week 6-7)
- [ ] Dashboard endpoints
- [ ] Skills profile
- [ ] Recommendations engine

### Phase 5: Offline Sync (Week 7-8)
- [ ] Sync service
- [ ] Conflict resolution
- [ ] Queue management

### Phase 6: Polish & Testing (Weeks 8-9)
- [ ] Performance optimization
- [ ] Comprehensive test suite
- [ ] CI/CD pipeline

---

## 📞 Support

For issues or questions:
1. Check [Swagger documentation](http://localhost:8080/api/swagger-ui.html)
2. Review [Database schema](src/main/resources/db/migrations/V1__initial_schema.sql)
3. Check logs: `tail -f logs/english-career-api.log`

---

**Status**: Phase 0 Complete ✅  
**Version**: 1.0.0-MVP  
**Last Updated**: 2026-10-08
