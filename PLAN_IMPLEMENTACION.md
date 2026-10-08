# Plan de Implementación - English Career AI

**Fecha**: 2026-10-08  
**Versión**: MVP v1.0  
**Duración estimada**: 8-9 semanas  
**Contexto**: Proyecto individual, desarrollo paralelo full-stack

---

## ?? Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Fases de Implementación](#fases-de-implementación)
3. [Estructura Técnica](#estructura-técnica)
4. [APIs Principales](#apis-principales)
5. [Cronograma Detallado](#cronograma-detallado)
6. [Dependencias y Camino Crítico](#dependencias-y-camino-crítico)
7. [Verificación y Testing](#verificación-y-testing)
8. [Criterios de Éxito](#criterios-de-éxito)
9. [Notas Importantes](#notas-importantes)

---

## ?? Resumen Ejecutivo

### Objetivo
Implementar un MVP funcional de **English Career AI** que demuestre el ciclo completo de aprendizaje adaptativo:

```
Usuario ? Registro ? Perfil ? Cursos ? Lecciones ? Ejercicios ? Evaluación (IA) ? Progreso
```

### Stack Tecnológico

| Componente | Tecnología | Versión |
|---|---|---|
| **Frontend (Mobile)** | React Native + Expo | Latest |
| **Lenguaje Frontend** | TypeScript | 5.x |
| **Estado Frontend** | Redux o Zustand | - |
| **Backend** | Spring Boot | 3.x |
| **JDK** | Java | 21 |
| **Base de Datos** | PostgreSQL | 15+ |
| **Cache (opcional)** | Redis | 7+ |
| **Autenticación** | JWT + Spring Security | - |
| **Documentación API** | Swagger/SpringDoc | 2.x |
| **Almacenamiento Local Mobile** | SQLite | - |
| **IA** | OpenAI API / Anthropic | GPT-4 o equivalente |
| **Contenedorización** | Docker & Docker Compose | - |

### Fases Principales
- **Fase 0**: Setup & Infrastructure (2 semanas)
- **Fase 1**: Autenticación & Onboarding (1-2 semanas)
- **Fase 2**: Cursos & Lecciones (1 semana)
- **Fase 3**: Ejercicios & Evaluación (2 semanas)
- **Fase 3b**: IA Integration (1 semana, paralelo)
- **Fase 4**: Progreso & Adaptación (1 semana)
- **Fase 5**: Sincronización Offline (1 semana)
- **Fase 6**: Polish & Optimización (1-2 semanas)

---

## ??? Fases de Implementación

### Fase 0: Setup & Infrastructure
**Duración**: 1-2 semanas  
**Objetivo**: Establecer bases técnicas para desarrollo paralelo frontend-backend

#### ? Entregables

**Backend Setup**
- [ ] Crear proyecto Spring Boot 3.x con Java 21
- [ ] Estructura modular monolítica: `auth`, `users`, `courses`, `exercises`, `evaluations`, `progress`, `ai`
- [ ] Spring Security + JWT para autenticación
- [ ] Spring Data JPA para persistencia
- [ ] Swagger/SpringDoc para documentación de APIs
- [ ] Configurar PostgreSQL localmente
- [ ] Crear esquema de BD inicial (tablas core)
- [ ] Seed data: 1 curso piloto (Foundations), 3 módulos, 5 lecciones
- [ ] Docker Compose con PostgreSQL + Redis (opcional)
- [ ] Implementar estructura básica de APIs REST
  - Health check endpoint: `GET /health`
  - Autenticación scaffolding
  - CRUD operations boilerplate

**Mobile Setup**
- [ ] Inicializar proyecto Expo con TypeScript
- [ ] Configurar React Navigation (stack + bottom tabs)
- [ ] Crear estado global: Redux o Zustand
- [ ] Setup HTTP client: axios con interceptores JWT
- [ ] Crear estructura de carpetas por features
- [ ] Mock de APIs REST (middleware para simular servidor)
- [ ] Configurar SQLite para almacenamiento offline
- [ ] Setup de build para Android/iOS

#### ?? Estructura de Carpetas

**Backend**
```
english-career-api/
??? src/main/java/com/englishcareer/
?   ??? auth/
?   ?   ??? AuthController.java
?   ?   ??? AuthService.java
?   ?   ??? JwtTokenProvider.java
?   ??? users/
?   ?   ??? UserController.java
?   ?   ??? UserService.java
?   ?   ??? User.java
?   ?   ??? UserRepository.java
?   ??? courses/
?   ??? lessons/
?   ??? exercises/
?   ??? evaluations/
?   ??? progress/
?   ??? learning/
?   ??? ai/
?   ??? common/
?   ?   ??? config/
?   ?   ??? exception/
?   ?   ??? util/
?   ??? Application.java
??? src/main/resources/
?   ??? application.yaml
?   ??? application-dev.yaml
?   ??? application-prod.yaml
?   ??? db/migrations/
?       ??? V1__initial_schema.sql
?       ??? V2__seed_data.sql
??? src/test/java/
??? docker-compose.yml
??? pom.xml
??? README.md
```

**Mobile**
```
english-career-app/
??? src/
?   ??? screens/
?   ?   ??? auth/
?   ?   ?   ??? LoginScreen.tsx
?   ?   ?   ??? RegisterScreen.tsx
?   ?   ??? onboarding/
?   ?   ?   ??? OnboardingWizard.tsx
?   ?   ??? courses/
?   ?   ??? lessons/
?   ?   ??? exercises/
?   ?   ??? dashboard/
?   ?   ??? settings/
?   ??? services/
?   ?   ??? api.ts
?   ?   ??? sync.ts
?   ?   ??? offline.ts
?   ??? store/
?   ?   ??? authSlice.ts
?   ?   ??? userSlice.ts
?   ?   ??? store.ts
?   ??? types/
?   ?   ??? index.ts
?   ??? utils/
?   ??? components/
?   ??? App.tsx
??? app.json
??? eas.json
??? package.json
??? tsconfig.json
```

#### ?? Configuraciones Iniciales

**docker-compose.yml**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: english_career
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

**application.yaml (Backend)**
```yaml
spring:
  application:
    name: english-career-api
  datasource:
    url: jdbc:postgresql://localhost:5432/english_career
    username: admin
    password: dev_password
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
  cache:
    type: redis
    redis:
      host: localhost
      port: 6379

jwt:
  secret: dev-secret-key-change-in-production
  expiration: 86400000

server:
  port: 8080
  servlet:
    context-path: /api
```

---

### Fase 1: Autenticación & Onboarding
**Duración**: 1-2 semanas  
**Objetivo**: Usuario puede registrarse, loguearse y configurar perfil profesional  
**Dependencia**: Fase 0 completada

#### ? Entregables Backend

**Endpoints de Autenticación**
- [ ] `POST /api/auth/register`
  - Body: `{ email, password, password_confirm }`
  - Response: `{ user_id, email, token }`
  - Validaciones: email único, password fuerza, email válido

- [ ] `POST /api/auth/login`
  - Body: `{ email, password }`
  - Response: `{ token, refresh_token, expires_in }`
  - Validaciones: credenciales correctas

- [ ] `POST /api/auth/refresh`
  - Body: `{ refresh_token }`
  - Response: `{ token, expires_in }`

- [ ] `GET /api/users/me` (autenticado)
  - Response: `{ id, email, profile: {...} }`

**Modelo de Datos**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  professional_area VARCHAR(50),
  current_level VARCHAR(20),
  learning_goal VARCHAR(100),
  daily_minutes INT DEFAULT 30,
  weak_areas JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Endpoint de Perfil**
- [ ] `PUT /api/users/me/profile`
  - Body: `{ professional_area, current_level, learning_goal, daily_minutes, weak_areas }`
  - Validaciones: valores enum válidos

#### ? Entregables Mobile

**Screens**
- [ ] `LoginScreen`
  - Email + Password inputs
  - "Forgot Password" link
  - Botón Login
  - Botón "Create Account" ? RegisterScreen
  - Error handling visual

- [ ] `RegisterScreen`
  - Email input + validación
  - Password + confirm password
  - Password strength indicator
  - Términos de servicio (checkbox)
  - Botón Register
  - Link "Already have account?" ? LoginScreen

- [ ] `OnboardingWizard` (4 pasos)
  - **Paso 1**: Profesión (radio buttons: Backend, Frontend, Full-stack)
  - **Paso 2**: Nivel actual (dropdown: Foundational, A1, A2, B1, B2)
  - **Paso 3**: Objetivo (dropdown: Job search, Remote work, Technical interviews)
  - **Paso 4**: Minutos diarios (slider: 15-60)
  - Botón "Guardar perfil" ? Dashboard

- [ ] `ProfileScreen` (acceso posterior)
  - Mostrar y editar información
  - Botón "Logout"

**Integración**
- [ ] JWT almacenado en SecureStore (Expo)
- [ ] Interceptor axios para agregar token a cada request
- [ ] Refresh token automático
- [ ] Flujo de navegación: No autenticado (Auth stack) ? Autenticado (App stack)
- [ ] Persistencia offline: guardar usuario y token en SQLite

#### ?? Flujo de Autenticación

```
???????????????????????????
?   LoginScreen           ?
?  email, password        ?
???????????????????????????
         ? POST /auth/login
         ?
???????????????????????????
?  Token Received         ?
?  Save to SecureStore    ?
???????????????????????????
         ?
         ?
???????????????????????????
?  OnboardingWizard       ?
?  Profesión, nivel, etc  ?
???????????????????????????
         ? PUT /users/me/profile
         ?
???????????????????????????
?  Dashboard              ?
?  (Fase 2 onwards)       ?
???????????????????????????
```

#### ? Verificación
- [ ] Usuario se registra exitosamente
- [ ] Login con credenciales correctas retorna JWT válido
- [ ] Token enviado en header `Authorization: Bearer {token}`
- [ ] Perfil guardado y recuperable en GET /users/me
- [ ] Datos persisten offline
- [ ] Token refresca automáticamente antes de expirar
- [ ] Logout limpia token y regresa a LoginScreen

---

### Fase 2: Estructura de Cursos & Lecciones
**Duración**: 1 semana  
**Objetivo**: Backend servir cursos/módulos/lecciones; Mobile navegar y descargar  
**Dependencia**: Fase 1 completada

#### ? Entregables Backend

**Modelo de Datos**
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  professional_areas JSONB,
  difficulty_level VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE modules (
  id UUID PRIMARY KEY,
  course_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  module_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  content_type VARCHAR(50),
  estimated_minutes INT DEFAULT 10,
  order_index INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(module_id) REFERENCES modules(id) ON DELETE CASCADE
);

CREATE TABLE user_progress (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INT,
  last_attempted TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(lesson_id) REFERENCES lessons(id),
  UNIQUE(user_id, lesson_id)
);
```

**Endpoints**
- [ ] `GET /api/courses`
  - Query params: `professional_area`, `difficulty`
  - Response: `[{ id, title, description, professional_areas }]`

- [ ] `GET /api/courses/{id}`
  - Response: `{ id, title, description, modules: [{...}] }`

- [ ] `GET /api/modules/{id}/lessons`
  - Response: `[{ id, title, content_type, estimated_minutes, order_index }]`

- [ ] `GET /api/lessons/{id}`
  - Response: `{ id, title, content, content_type, estimated_minutes }`

- [ ] `GET /api/lessons/{id}/download`
  - Response: ZIP con lección empaquetada para offline

- [ ] `POST /api/lessons/{id}/mark-started` (autenticado)
  - Actualiza user_progress.last_attempted

#### ? Entregables Mobile

**Screens**
- [ ] `CoursesListScreen`
  - Listar cursos filtrados por professional_area del usuario
  - Card por curso: título, descripción, badge de dificultad
  - Progreso visual (% completado)
  - Tap ? CourseDetailScreen

- [ ] `CourseDetailScreen`
  - Nombre del curso + descripción completa
  - Lista de módulos con progreso
  - Módulo expandible ? lista de lecciones
  - Botón "Download for Offline"
  - Indicador: "? Available Offline"

- [ ] `LessonDetailScreen`
  - Título + contenido (markdown renderizado)
  - Tiempo estimado
  - Botón "Start Exercises"
  - Progreso anterior si existe
  - Botón "Mark as Read"

**Integraciones**
- [ ] API client para GET /courses, /modules, /lessons
- [ ] Descarga de contenido a SQLite local
- [ ] Indicador visual de lecciones disponibles offline
- [ ] Sync de progreso al conectar

#### ?? Seed Data - Curso Piloto "Foundations"

```
Course: Foundations (Beginner English Basics)
??? Module 1: Verb "To Be" (Level: A1)
?   ??? Lesson 1: I am, You are, He/She/It is
?   ??? Lesson 2: We are, They are (Plural)
?   ??? Lesson 3: Negative and Questions
??? Module 2: Present Simple Verbs (Level: A1)
?   ??? Lesson 1: Regular verbs (I work, you work)
?   ??? Lesson 2: Third person singular (He works)
?   ??? Lesson 3: Questions and negatives
??? Module 3: Personal Pronouns (Level: A0)
    ??? Lesson 1: Subject pronouns (I, you, he, she, it, we, they)
    ??? Lesson 2: Possessive adjectives (my, your, his, her, its, our, their)
```

#### ? Verificación
- [ ] Backend retorna cursos sin errores
- [ ] Mobile muestra lista de cursos con progreso
- [ ] Contenido de lección renderizado correctamente
- [ ] Descarga offline almacena lecciones en SQLite
- [ ] Indicador "Available Offline" funciona
- [ ] Navegación fluida entre pantallas

---

### Fase 3: Ejercicios & Evaluación
**Duración**: 2 semanas  
**Objetivo**: Ciclo completo ejercicio ? respuesta ? evaluación  
**Dependencia**: Fase 2 completada

#### ? Entregables Backend

**Modelo de Datos**
```sql
CREATE TYPE exercise_type AS ENUM (
  'MULTIPLE_CHOICE',
  'SHORT_ANSWER',
  'FILL_BLANK',
  'OPEN_RESPONSE'
);

CREATE TABLE exercises (
  id UUID PRIMARY KEY,
  lesson_id UUID NOT NULL,
  type exercise_type NOT NULL,
  question TEXT NOT NULL,
  correct_answer VARCHAR(255),
  options JSONB,
  explanation TEXT,
  difficulty_level INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE user_answers (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  exercise_id UUID NOT NULL,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN,
  score INT,
  explanation_given TEXT,
  attempted_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(exercise_id) REFERENCES exercises(id)
);
```

**Servicios de Evaluación**

**EvaluationService** (sin IA, respuestas cerradas)
```
For MULTIPLE_CHOICE: 
  score = (selected_option == correct_option) ? 100 : 0

For SHORT_ANSWER / FILL_BLANK:
  - Normalizar strings (lowercase, trim, remove accents)
  - Fuzzy matching: si similitud >= 85% ? 100, sino 0
  - Alternative answers: guardar array de respuestas válidas

For OPEN_RESPONSE (Fase 3b):
  - Delegar a AI service
```

**Endpoints**
- [ ] `GET /api/lessons/{id}/exercises`
  - Response: `[{ id, type, question, options (si MCQ), difficulty }]`
  - NO retorna correct_answer (seguridad)

- [ ] `POST /api/exercises/{id}/submit`
  - Body: `{ answer_text }`
  - Response: `{ is_correct, score, explanation, correct_answer }`
  - Guardar en user_answers

- [ ] `GET /api/users/me/attempts?lesson_id={id}`
  - Response: `[{ exercise_id, answer_text, score, timestamp }]`

- [ ] `GET /api/users/me/lesson-progress/{id}`
  - Response: `{ lesson_id, completed_exercises, total_exercises, score }`

#### ? Entregables Mobile

**ExerciseScreen Component**
- [ ] Mostrar pregunta
- [ ] Renderizado por tipo:
  - **MULTIPLE_CHOICE**: Radio buttons (una opción)
  - **SHORT_ANSWER**: Text input campo pequeño
  - **FILL_BLANK**: Text input inline en la frase
  - **OPEN_RESPONSE**: Text area grande

- [ ] Botón "Submit"
- [ ] Después de submit, mostrar resultado:
  - ? Verde con score (si correcto)
  - ? Rojo con explicación (si incorrecto)
  - Respuesta correcta mostrada
- [ ] Botón "Next Exercise" o "Back to Lesson"
- [ ] Progreso: "2/5 ejercicios" en header

**Store & Sync**
- [ ] Guardar respuestas en SQLite si offline
- [ ] Queue de sync: cuando online, enviar batch a servidor
- [ ] Indicador: "? Syncing..." ? "? Synced"

#### ?? Seed Data - 10 ejercicios para lección "I am, You are, He/She/It is"

```
Exercise 1 (MULTIPLE_CHOICE):
  Q: "I __ a developer"
  Options: [a) am, b) are, c) is]
  Answer: a

Exercise 2 (SHORT_ANSWER):
  Q: "Complete: He __ an engineer"
  Answer: "is"

Exercise 3 (FILL_BLANK):
  Q: "She [______] happy today"
  Answer: "is"

...
```

#### ? Verificación
- [ ] Ejercicio MULTIPLE_CHOICE: seleccionar opción ? submit ? resultado correcto
- [ ] Ejercicio SHORT_ANSWER: texto similar a respuesta ? 100 puntos
- [ ] Ejercicio FILL_BLANK: fuzzy matching funciona (typos menores aceptados)
- [ ] Progreso actualizado: "2/5" ? "3/5" después de cada ejercicio
- [ ] Respuestas offline guardadas en SQLite
- [ ] Sync al conectar envía respuestas al servidor

---

### Fase 3b: Integración de IA
**Duración**: 1 semana (paralelo con Fase 3)  
**Objetivo**: Evaluación inteligente de respuestas abiertas  
**Dependencia**: Fase 3 iniciada, endpoint de submit de ejercicios existe

#### ? Entregables Backend

**AIEvaluator Service**
```java
public interface AIEvaluator {
  EvaluationResult evaluate(
    String question,
    String correctAnswer,
    String studentAnswer,
    String userLevel
  );
}

public class OpenAIEvaluator implements AIEvaluator {
  // Implementación con OpenAI API
}
```

**Prompt Template**
```
Eres profesor de inglés especializado en enseñanza para profesionales.
Evalúa la siguiente respuesta de un estudiante.

CONTEXTO:
- Pregunta: {question}
- Respuesta esperada: {expected_answer}
- Nivel del estudiante: {user_level}

RESPUESTA DEL ESTUDIANTE:
{student_answer}

Evalúa y retorna JSON válido:
{
  "is_correct": boolean (true si respuesta es aceptable),
  "score": número 0-100,
  "explanation": "Explicación breve de por qué es correcta o incorrecta",
  "common_mistake": "Si es incorrecto, ¿qué error común cometió?",
  "tip": "Consejo para mejorar"
}
```

**Endpoint Modificado**
- [ ] `POST /api/exercises/{id}/submit` (actualizado)
  - Detecta si ejercicio es OPEN_RESPONSE
  - Delega a AIEvaluator
  - Parsea respuesta JSON de IA
  - Retorna resultado

**Integración**
- [ ] Variables de entorno: `OPENAI_API_KEY`
- [ ] Rate limiting: máx 10 evaluaciones/minuto por usuario
- [ ] Cacheo: si misma question + answer ? devolver cached result
- [ ] Error handling: si IA falla, retornar 500 con mensaje amable

#### ? Verificación
- [ ] Respuesta abierta evaluada correctamente por IA
- [ ] Explicación personalizada según nivel
- [ ] Caché funciona (misma pregunta devuelve resultado inmediato)
- [ ] Rate limiting previene abuso
- [ ] Si IA no disponible, ejercicio sigue funcionando (fallback a regla)

---

### Fase 4: Progreso & Adaptación
**Duración**: 1 semana  
**Objetivo**: Dashboard con progreso; detección de errores recurrentes; recomendaciones  
**Dependencia**: Fase 3 completada

#### ? Entregables Backend

**Modelo de Datos**
```sql
CREATE TABLE user_skills (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  grammar_score INT DEFAULT 50,
  vocabulary_score INT DEFAULT 50,
  listening_score INT DEFAULT 50,
  speaking_score INT DEFAULT 50,
  writing_score INT DEFAULT 50,
  technical_english_score INT DEFAULT 50,
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_errors (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  error_type VARCHAR(100),
  category VARCHAR(50),
  frequency INT DEFAULT 1,
  last_seen TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(100),
  earned_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Endpoints**

- [ ] `GET /api/users/me/dashboard`
  - Response: `{ xp, streak_days, weekly_goal, skills, recent_errors, achievements }`

- [ ] `GET /api/users/me/skills`
  - Response: desglose detallado por habilidad

- [ ] `GET /api/users/me/errors`
  - Response: lista ordenada por frecuencia

- [ ] `GET /api/users/me/recommendations`
  - Response: `{ reinforcement: [...], next_lessons: [...] }`

**Lógica de Scoring**

Después de cada ejercicio completado:
1. Extraer categoría/skill del ejercicio
2. Actualizar puntuación de skill
3. Si respuesta incorrecta:
   - Registrar error en user_errors
   - Incrementar frequency
4. Si completó lección (todos ejercicios):
   - +50 XP
   - Marcar lesson como completed
   - Actualizar weekly_goal

**Lógica de Recomendaciones**

```
if error.frequency > 3:
  ? Recomendar lección de refuerzo
  
if lesson.score < 80%:
  ? Bloquear siguiente lección, sugerir repaso
  
if lesson.score >= 85% AND no_estudia > 2_dias:
  ? Enviar notificación: "¿Continuamos?"
```

#### ? Entregables Mobile

**Screens**

- [ ] `DashboardScreen` (tab principal)
  - Tarjeta superior: XP + streak (?? 8 day streak ? 1,420 XP)
  - Progreso semanal: progress bar "82% de tu objetivo"
  - Grid de skills: 6 tarjetas (Grammar 84%, Vocabulary 76%, etc)
  - Botón "View Full Progress"

- [ ] `SkillsDetailScreen`
  - Habilidades en detalle
  - Gráfico de evolución (línea chart si tenemos datos históricos)
  - Áreas débiles destacadas en rojo

- [ ] `ErrorsScreen`
  - Tabla de errores recurrentes
  - Ordenado por frecuencia (descendente)
  - Tap en error ? mostrar explicación + lección relacionada

- [ ] `RecommendationsScreen`
  - Sección "Reinforce Now" (ejercicios para errores detectados)
  - Sección "Ready for Next" (lecciones desbloqueadas)
  - Tap en tarjeta ? ir a lección

**Actualizar Navegación**
- [ ] Bottom tab navigator: Home (Dashboard) | Courses | Skills | Errors | Profile

#### ? Verificación
- [ ] Dashboard carga sin errores
- [ ] Skills mostrados correctamente después de completar ejercicios
- [ ] Errores detectados y listados por frecuencia
- [ ] Recomendaciones generadas automáticamente
- [ ] Datos persisten y se sincronizan offline

---

### Fase 5: Sincronización Offline & Refinamiento
**Duración**: 1 semana  
**Objetivo**: Offline-first robusta; sincronización bidireccional  
**Dependencia**: Fases 1-4 completadas

#### ? Entregables Backend

**Sync Service**
- [ ] `POST /api/sync` (endpoint para sincronización batch)
  - Body: `{ timestamp, changes: [...] }`
  - Response: `{ synced, server_timestamp, conflicts, pull }`

**Conflict Resolution**
- [ ] Estrategia: last-write-wins (timestamp del servidor prevalece)
- [ ] Loguear conflictos para análisis

#### ? Entregables Mobile

**Sync Manager Service**
```typescript
class SyncManager {
  private queue: Change[] = [];
  
  async queueChange(change: Change);
  async syncBatch(): Promise<SyncResult>;
  async handleConflict(conflict: Conflict);
  subscribeToBattery();
}
```

**Integración**
- [ ] Detectar cambio de conectividad (NetInfo)
- [ ] Queue automático de cambios: user_answers, user_progress
- [ ] Sync automático cuando:
  - Conecta a internet
  - Cada 5 minutos si online
  - Antes de cerrar app
- [ ] Indicador UI:
  - "? Syncing..."
  - "? Synced 30 sec ago"
  - "? Sync error, retrying..."

#### ? Verificación
- [ ] Hacer ejercicio sin internet
- [ ] Datos guardan en SQLite local
- [ ] Conectar internet ? "Syncing..."
- [ ] Datos envían al servidor
- [ ] Dashboard actualiza con progreso sincronizado
- [ ] No hay pérdida de datos

---

### Fase 6: Polish & Optimización
**Duración**: 1-2 semanas  
**Objetivo**: Performance, UX, error handling, testing básico  
**Dependencia**: Fases 1-5 completadas

#### ? Entregables Backend

**Performance & Seguridad**
- [ ] Implementar índices de base de datos
- [ ] Paginación: `/api/courses?page=1&size=10`
- [ ] Lazy loading: módulos/lecciones bajo demanda
- [ ] Caché de cursos
- [ ] Rate limiting global (10 req/s por IP)
- [ ] Validación de entrada en todos endpoints
- [ ] Sanitización de datos JSONB

**Testing**
- [ ] JUnit5 + Mockito para servicios críticos
  - AuthService, EvaluationService, SyncService
- [ ] Test coverage mínimo 70% en lógica de negocio
- [ ] Integration tests para endpoints principales

**Documentación & Logging**
- [ ] Swagger/SpringDoc completo
- [ ] Logging: SLF4J + Logback
- [ ] Request/response logging en debug

**Deploy & CI/CD (básico)**
- [ ] Dockerfile para API
- [ ] GitHub Actions (opcional)

#### ? Entregables Mobile

**UX Refinement**
- [ ] Animaciones suaves
- [ ] Indicadores de estado claros
- [ ] Accesibilidad (WCAG AA)

**Performance**
- [ ] Reducir bundle size
- [ ] Optimizar imágenes
- [ ] Caché de imágenes
- [ ] Memory profiling

**Testing**
- [ ] Jest para unit tests
- [ ] React Testing Library para screens críticas
- [ ] Test coverage: mínimo 60%

**Error Handling**
- [ ] Try-catch en async operations
- [ ] Global error boundary
- [ ] Retry logic con exponential backoff
- [ ] User-friendly error messages

#### ? Verificación
- [ ] App ejecuta sin crashes
- [ ] Tiempo de carga <3s
- [ ] Navegación suave (60 fps)
- [ ] Errores manejados elegantemente
- [ ] Tests pasan al 100%
- [ ] Swagger accesible

---

## ?? Estructura Técnica

### Backend - Modular Monolith

**Arquitectura en capas por módulo**

```
english-career-api/
??? auth/
?   ??? controller/ (AuthController.java)
?   ??? service/ (AuthService.java, JwtTokenProvider.java)
?   ??? dto/ (LoginRequest.java, RegisterRequest.java)
?   ??? entity/ (User.java)
?   ??? repository/ (UserRepository.java)
??? users/
??? courses/
??? lessons/
??? exercises/
??? evaluations/
??? progress/
??? ai/
??? common/
??? Application.java
```

---

### Mobile - Feature-based Architecture

**Estructura por funcionalidades**

```
english-career-app/
??? src/
?   ??? screens/
?   ??? services/
?   ??? store/
?   ??? types/
?   ??? components/
?   ??? utils/
?   ??? theme/
?   ??? App.tsx
??? app.json
??? package.json
??? tsconfig.json
```

---

## ?? APIs Principales

### Authentication

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "user_id": "uuid",
  "email": "user@example.com",
  "token": "eyJhbGciOi...",
  "expires_in": 86400
}
```

### Courses

```http
GET /api/courses?professional_area=backend
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "title": "Foundations",
      "description": "..."
    }
  ]
}
```

### Exercises

```http
POST /api/exercises/{id}/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "answer_text": "am"
}

Response: 200 OK
{
  "is_correct": true,
  "score": 100,
  "explanation": "Correcto...",
  "correct_answer": "am"
}
```

### Dashboard

```http
GET /api/users/me/dashboard
Authorization: Bearer {token}

Response: 200 OK
{
  "xp": 1420,
  "streak_days": 8,
  "weekly_goal": 82,
  "skills": {
    "grammar": 84,
    "vocabulary": 76
  }
}
```

---

## ?? Cronograma Detallado

**Semana 1-2: Fase 0**
- Setup Spring Boot, Expo, Docker, esquema BD, seed data

**Semana 2-3: Fase 1**
- Endpoints auth, screens login/register, onboarding wizard

**Semana 3-4: Fase 2**
- Endpoints cursos/lecciones, descarga offline, navegación mobile

**Semana 4-6: Fase 3**
- Ejercicios, evaluación, tipos de preguntas, progreso

**Semana 5-6: Fase 3b (paralelo)**
- Integración OpenAI, prompt engineering, fallback

**Semana 6-7: Fase 4**
- Dashboard, skills, errores, recomendaciones

**Semana 7-8: Fase 5**
- Sync offline, queue, conflict resolution

**Semana 8-9: Fase 6**
- Polish, performance, tests, CI/CD

---

## ?? Dependencias y Camino Crítico

```
Fase 0 (Setup)
  ?
Fase 1 (Auth)
  ?? Fase 2 (Cursos)
  ?   ?? Fase 3 (Ejercicios)
  ?   ?   ?? Fase 3b (IA) [paralelo]
  ?   ?   ?   ?? Fase 4 (Progreso)
  ?   ?   ?   ?   ?? Fase 5 (Sync)
  ?   ?   ?   ?   ?   ?? Fase 6 (Polish)
```

**Total: 8-9 semanas en ruta crítica**

---

## ? Criterios de Éxito MVP

| Criterio | Status |
|----------|--------|
| ? Autenticación completa | - |
| ? Perfil & Onboarding | - |
| ? Navegación de cursos | - |
| ? Ejercicios (4 tipos) | - |
| ? Evaluación con IA | - |
| ? Dashboard inteligente | - |
| ? Offline funcional | - |
| ? Sincronización | - |
| ? UX fluida (sin crashes) | - |
| ? Tests (70% backend, 60% mobile) | - |

---

## ?? Notas Importantes

### Decisiones Clave
1. **Monolith inicial**: Rápido, fácil debugging, escalable después
2. **IA desde el inicio**: Mejora UX, considerar presupuesto
3. **SQLite offline**: Suficiente para MVP
4. **Single developer**: Modularidad es crítica

### Riesgos y Mitigación
- **IA caro**: Limitar evaluaciones, usar caché, rate limiting
- **BD lenta**: Índices desde Fase 0, paginación, Redis
- **Scope creep**: Mantener foco MVP
- **Burnout**: Sprints de 1 semana, breaks entre fases

---

**Versión**: 1.0  
**Estado**: Ready for Development ?  
**Próximo paso**: Iniciar Fase 0 - Infrastructure Setup
