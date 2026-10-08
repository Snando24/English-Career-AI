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
  professional_area VARCHAR(50),  -- backend, frontend, full-stack
  current_level VARCHAR(20),      -- foundational, a1, a2, b1, b2
  learning_goal VARCHAR(100),     -- job_search, remote_work, tech_interviews
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
  professional_areas JSONB,  -- ["backend", "frontend"]
  difficulty_level VARCHAR(20),  -- beginner, intermediate, advanced
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
  content TEXT,  -- Puede ser markdown o HTML
  content_type VARCHAR(50),  -- text, video_link, interactive
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
  score INT,  -- 0-100
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
-- Tipos de ejercicio
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
  correct_answer VARCHAR(255),  -- Para respuestas cerradas
  options JSONB,  -- Para MULTIPLE_CHOICE: [{"id":"a","text":"..."}, ...]
  explanation TEXT,
  difficulty_level INT DEFAULT 1,  -- 1-5
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE user_answers (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  exercise_id UUID NOT NULL,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN,
  score INT,  -- 0-100
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
  - Response: 
    ```json
    {
      "is_correct": boolean,
      "score": 0-100,
      "explanation": "...",
      "correct_answer": "..." (mostrar respuesta)
    }
    ```
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
  error_type VARCHAR(100),  -- "a_vs_an", "present_simple", etc
  category VARCHAR(50),  -- "grammar", "vocabulary"
  frequency INT DEFAULT 1,  -- cuántas veces detectado
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
  - Response:
    ```json
    {
      "xp": 1420,
      "streak_days": 8,
      "total_lessons_completed": 12,
      "weekly_goal": 82,  -- % de objetivo de 30 min x 7 días
      "skills": {
        "grammar": 84,
        "vocabulary": 76,
        "listening": 70,
        "speaking": 68,
        "writing": 87,
        "technical_english": 91
      },
      "recent_errors": [
        { "error_type": "a_vs_an", "category": "grammar", "frequency": 4 }
      ],
      "achievements": [...]
    }
    ```

- [ ] `GET /api/users/me/skills`
  - Response: desglose detallado por habilidad

- [ ] `GET /api/users/me/errors`
  - Response: lista ordenada por frecuencia

- [ ] `GET /api/users/me/recommendations`
  - Response: 
    ```json
    {
      "reinforcement": [
        { "lesson_id": "...", "reason": "You failed 'a/an' 3 times" }
      ],
      "next_lessons": [
        { "lesson_id": "...", "reason": "You're ready for this" }
      ]
    }
    ```

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
  - Body:
    ```json
    {
      "timestamp": "2026-10-08T10:00:00Z",
      "changes": [
        { "type": "user_answer", "id": "...", "data": {...} },
        { "type": "user_progress", "id": "...", "data": {...} }
      ]
    }
    ```
  - Response:
    ```json
    {
      "synced": true,
      "server_timestamp": "2026-10-08T10:00:30Z",
      "conflicts": [],
      "pull": {  -- datos del servidor que cambiaroa
        "user_skills": {...},
        "courses_updated": [...]
      }
    }
    ```

**Conflict Resolution**
- [ ] Estrategia: last-write-wins (timestamp del servidor prevalece)
- [ ] Loguear conflictos para análisis

#### ? Entregables Mobile

**Sync Manager Service**
```typescript
class SyncManager {
  private queue: Change[] = [];  // Queue de cambios pendientes
  
  async queueChange(change: Change);
  async syncBatch(): Promise<SyncResult>;  // Llamado cuando online
  async handleConflict(conflict: Conflict);
  subscribeToBattery();  // Sync cuando dispositivo está cargando
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
  - "? Syncing..." (durante sync)
  - "? Synced 30 sec ago"
  - "? Sync error, retrying..."

**Flujo Offline-First**
```
????????????????????????????
? Usuario hace ejercicio   ?
????????????????????????????
         ?
    Online?
    ?? Sí ? POST /submit directo
    ?? No ? Guardar en SQLite + queue
         ?
    ? (conecta internet)
????????????????????????????
? Sync Manager detecta     ?
? conexión ? POST /sync    ?
????????????????????????????
         ?
    ? (servidor procesa)
????????????????????????????
? Datos sincronizados      ?
? UI actualizado           ?
????????????????????????????
```

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
- [ ] Implementar índices de base de datos (queries frecuentes)
- [ ] Paginación: `/api/courses?page=1&size=10`
- [ ] Lazy loading: módulos/lecciones bajo demanda
- [ ] Caché de cursos (no cambian frecuentemente)
- [ ] Rate limiting global (10 req/s por IP)
- [ ] Validación de entrada en todos endpoints
- [ ] Sanitización de datos JSONB

**Testing**
- [ ] JUnit5 + Mockito para servicios críticos
  - AuthService
  - EvaluationService
  - SyncService
- [ ] Test coverage mínimo 70% en lógica de negocio
- [ ] Integration tests para endpoints principales

**Documentación & Logging**
- [ ] Swagger/SpringDoc completo y actualizado
- [ ] Logging: SLF4J + Logback
  - Level INFO en producción
  - DEBUG en desarrollo
- [ ] Request/response logging en debug

**Deploy & CI/CD (básico)**
- [ ] Dockerfile para API
  - Multi-stage build
  - Non-root user
  - Health check

- [ ] GitHub Actions (opcional):
  - Run tests on push
  - Build Docker image
  - Deploy a staging

#### ? Entregables Mobile

**UX Refinement**
- [ ] Animaciones suaves
  - Transición pantallas: 300ms
  - Progress bars con lottie
  - Loading spinners
- [ ] Indicadores de estado claros
  - Error messages: rojo, 3 seg
  - Success messages: verde, 2 seg
  - Confirmations: dialogs modales
- [ ] Accesibilidad
  - Labels en inputs
  - Contrast ratios WCAG AA
  - Font size mínimo 14pt

**Performance**
- [ ] Reducir bundle size
  - Tree-shaking
  - Code splitting por screens
  - Lazy loading de modules
- [ ] Optimizar imágenes (WebP si posible)
- [ ] Caché de imágenes
- [ ] Memory profiling: no memory leaks

**Testing**
- [ ] Jest para unit tests
  - API client
  - Store slices
  - Utility functions
- [ ] React Testing Library para screens críticas
  - LoginScreen
  - ExerciseScreen
- [ ] Test coverage: mínimo 60%

**Error Handling**
- [ ] Try-catch en async operations
- [ ] Global error boundary
- [ ] Retry logic con exponential backoff
- [ ] User-friendly error messages (no stack traces)

**Offline Robustness**
- [ ] Borrado de BD: validar integridad
- [ ] Migración de schemas SQLite
- [ ] Compresión de datos locales (si BD > 100MB)

#### ? Verificación
- [ ] App ejecuta sin crashes
- [ ] Tiempo de carga <3s
- [ ] Navegación suave (60 fps)
- [ ] Errores manejados elegantemente
- [ ] Tests pasan al 100%
- [ ] Swagger accesible en `http://localhost:8080/swagger-ui`

---

## ?? Estructura Técnica

### Backend - Modular Monolith

**Arquitectura en capas por módulo**

```
english-career-api/
??? auth/
?   ??? controller/
?   ?   ??? AuthController.java
?   ??? service/
?   ?   ??? AuthService.java
?   ?   ??? JwtTokenProvider.java
?   ??? dto/
?   ?   ??? LoginRequest.java
?   ?   ??? RegisterRequest.java
?   ??? entity/
?   ?   ??? User.java
?   ??? repository/
?       ??? UserRepository.java
?
??? users/
?   ??? controller/
?   ?   ??? UserController.java
?   ??? service/
?   ?   ??? UserService.java
?   ??? entity/
?   ?   ??? UserProfile.java
?   ??? repository/
?       ??? UserProfileRepository.java
?
??? courses/
??? lessons/
??? exercises/
?   ??? controller/
?   ?   ??? ExerciseController.java
?   ??? service/
?   ?   ??? ExerciseService.java
?   ??? entity/
?   ?   ??? Exercise.java
?   ?   ??? UserAnswer.java
?   ??? repository/
?       ??? ExerciseRepository.java
?       ??? UserAnswerRepository.java
?
??? evaluations/
?   ??? service/
?   ?   ??? EvaluationService.java
?   ?   ??? AIEvaluator.java (interface)
?   ??? impl/
?       ??? OpenAIEvaluator.java
?
??? progress/
?   ??? controller/
?   ?   ??? ProgressController.java
?   ??? service/
?   ?   ??? ProgressService.java
?   ?   ??? RecommendationService.java
?   ??? entity/
?   ?   ??? UserSkill.java
?   ?   ??? UserError.java
?   ??? repository/
?       ??? UserSkillRepository.java
?       ??? UserErrorRepository.java
?
??? ai/
?   ??? service/
?   ?   ??? AIService.java
?   ??? config/
?       ??? OpenAIConfig.java
?
??? common/
?   ??? config/
?   ?   ??? SecurityConfig.java
?   ?   ??? WebConfig.java
?   ?   ??? CacheConfig.java
?   ??? exception/
?   ?   ??? GlobalExceptionHandler.java
?   ?   ??? ResourceNotFoundException.java
?   ?   ??? AuthenticationException.java
?   ??? util/
?   ?   ??? JwtUtil.java
?   ?   ??? ValidationUtil.java
?   ??? dto/
?       ??? ApiResponse.java
?       ??? ErrorResponse.java
?
??? Application.java
```

**Tecnologías por capa**

| Capa | Tecnología | Propósito |
|---|---|---|
| **Presentación** | Spring MVC / Spring WebFlux | Controladores REST |
| **Lógica de Negocio** | Spring Service | Servicios, reglas |
| **Persistencia** | Spring Data JPA | Acceso a datos |
| **Base de Datos** | PostgreSQL | Almacenamiento |
| **Cache** | Redis | Caché de evaluaciones |
| **Autenticación** | Spring Security + JWT | Seguridad |
| **Documentación** | SpringDoc OpenAPI | Swagger |

---

### Mobile - Feature-based Architecture

**Estructura por funcionalidades**

```
english-career-app/
??? src/
?   ??? screens/
?   ?   ??? auth/
?   ?   ?   ??? LoginScreen.tsx
?   ?   ?   ??? RegisterScreen.tsx
?   ?   ?   ??? styles.ts
?   ?   ??? onboarding/
?   ?   ?   ??? OnboardingWizard.tsx
?   ?   ?   ??? Step1ProfessionScreen.tsx
?   ?   ?   ??? Step2LevelScreen.tsx
?   ?   ?   ??? Step3GoalScreen.tsx
?   ?   ?   ??? Step4TimeScreen.tsx
?   ?   ??? courses/
?   ?   ?   ??? CoursesListScreen.tsx
?   ?   ?   ??? CourseDetailScreen.tsx
?   ?   ?   ??? LessonDetailScreen.tsx
?   ?   ??? exercises/
?   ?   ?   ??? ExerciseScreen.tsx
?   ?   ?   ??? components/
?   ?   ?   ?   ??? MCQExercise.tsx
?   ?   ?   ?   ??? ShortAnswerExercise.tsx
?   ?   ?   ?   ??? FillBlankExercise.tsx
?   ?   ?   ?   ??? OpenResponseExercise.tsx
?   ?   ?   ??? ExerciseResult.tsx
?   ?   ??? dashboard/
?   ?   ?   ??? DashboardScreen.tsx
?   ?   ?   ??? SkillsDetailScreen.tsx
?   ?   ?   ??? ErrorsScreen.tsx
?   ?   ?   ??? RecommendationsScreen.tsx
?   ?   ??? profile/
?   ?   ?   ??? ProfileScreen.tsx
?   ?   ?   ??? SettingsScreen.tsx
?   ?   ??? navigation/
?   ?       ??? RootNavigator.tsx
?   ?       ??? AuthNavigator.tsx
?   ?       ??? AppNavigator.tsx
?   ?
?   ??? services/
?   ?   ??? api.ts              -- Axios client + interceptores
?   ?   ??? auth.ts             -- Lógica autenticación
?   ?   ??? storage.ts          -- SecureStore + AsyncStorage
?   ?   ??? sync.ts             -- Sync offline
?   ?   ??? offline.ts          -- SQLite queries
?   ?   ??? notification.ts     -- Manejo de notificaciones
?   ?
?   ??? store/
?   ?   ??? index.ts            -- Setup Redux/Zustand
?   ?   ??? slices/
?   ?   ?   ??? authSlice.ts
?   ?   ?   ??? userSlice.ts
?   ?   ?   ??? coursesSlice.ts
?   ?   ?   ??? progressSlice.ts
?   ?   ?   ??? uiSlice.ts
?   ?   ??? selectors.ts
?   ?
?   ??? types/
?   ?   ??? index.ts            -- TypeScript interfaces
?   ?   ??? api.ts
?   ?   ??? domain.ts
?   ?   ??? navigation.ts
?   ?
?   ??? components/
?   ?   ??? common/
?   ?   ?   ??? LoadingSpinner.tsx
?   ?   ?   ??? ErrorBoundary.tsx
?   ?   ?   ??? Header.tsx
?   ?   ?   ??? BottomTabBar.tsx
?   ?   ??? ui/
?   ?       ??? Button.tsx
?   ?       ??? Input.tsx
?   ?       ??? Card.tsx
?   ?       ??? ProgressBar.tsx
?   ?
?   ??? utils/
?   ?   ??? formatters.ts
?   ?   ??? validators.ts
?   ?   ??? constants.ts
?   ?   ??? helpers.ts
?   ?
?   ??? theme/
?   ?   ??? colors.ts
?   ?   ??? typography.ts
?   ?   ??? spacing.ts
?   ?
?   ??? App.tsx                 -- Punto de entrada
?
??? app.json                    -- Config Expo
??? eas.json                    -- Config EAS (builds)
??? package.json
??? tsconfig.json
??? babel.config.js
??? .env.example
```

**State Management (Redux)**

```typescript
// Store structure
{
  auth: {
    token: string | null,
    user: User | null,
    isLoading: boolean,
    error: string | null
  },
  user: {
    profile: UserProfile | null,
    skills: UserSkills | null,
    errors: UserError[] | null
  },
  courses: {
    list: Course[] | null,
    selected: Course | null,
    lessons: Lesson[] | null,
    loading: boolean
  },
  progress: {
    exercises: Exercise[] | null,
    currentAnswer: any | null,
    result: ExerciseResult | null
  },
  ui: {
    networkStatus: 'online' | 'offline',
    syncStatus: 'idle' | 'syncing' | 'error',
    showNotification: boolean,
    notificationMessage: string
  }
}
```

---

### Database Schema

**Diagrama de Entidades**

```
???????????????????
?     Users       ?
?   (id, email)   ?
???????????????????
         ?
         ???? UserProfile (profesión, nivel)
         ???? UserProgress (lesson completada)
         ???? UserAnswer (respuestas ejercicios)
         ???? UserSkill (puntuaciones por skill)
         ???? UserError (errores detectados)
                 
????????????????????
?     Courses      ?
????????????????????
         ?
         ???? Modules
         ?      ?
         ?      ???? Lessons
         ?             ?
         ?             ???? Exercises
         ?                    ?
         ?                    ???? UserAnswer
         ?
         ???? CourseTags

???????????????????
?  Achievements   ?
?  (user badges)  ?
???????????????????
```

**Índices Críticos**

```sql
-- Performance queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_progress_user_lesson ON user_progress(user_id, lesson_id);
CREATE INDEX idx_user_answers_user_id ON user_answers(user_id);
CREATE INDEX idx_user_answers_exercise_id ON user_answers(exercise_id);
CREATE INDEX idx_exercises_lesson_id ON exercises(lesson_id);
CREATE INDEX idx_lessons_module_id ON lessons(module_id);
CREATE INDEX idx_modules_course_id ON modules(course_id);
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

---

Response: 200 OK
{
  "user_id": "uuid",
  "email": "user@example.com",
  "token": "eyJhbGciOi...",
  "expires_in": 86400
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

---

Response: 200 OK
{
  "token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi...",
  "expires_in": 86400
}
```

### Users

```http
GET /api/users/me
Authorization: Bearer {token}

---

Response: 200 OK
{
  "id": "uuid",
  "email": "user@example.com",
  "profile": {
    "professional_area": "backend",
    "current_level": "a1",
    "learning_goal": "job_search",
    "daily_minutes": 30
  }
}
```

```http
PUT /api/users/me/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "professional_area": "backend",
  "current_level": "a1",
  "learning_goal": "job_search",
  "daily_minutes": 30
}

---

Response: 200 OK
{
  "success": true,
  "profile": {...}
}
```

### Courses

```http
GET /api/courses?professional_area=backend
Authorization: Bearer {token}

---

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "title": "Foundations",
      "description": "...",
      "professional_areas": ["backend", "frontend"],
      "difficulty": "beginner"
    }
  ]
}
```

```http
GET /api/courses/{id}
Authorization: Bearer {token}

---

Response: 200 OK
{
  "id": "uuid",
  "title": "Foundations",
  "modules": [
    {
      "id": "uuid",
      "title": "Verb To Be",
      "lessons": [
        {
          "id": "uuid",
          "title": "I am, You are, He/She/It is",
          "content_type": "text",
          "estimated_minutes": 10
        }
      ]
    }
  ]
}
```

### Exercises

```http
GET /api/lessons/{id}/exercises
Authorization: Bearer {token}

---

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "lesson_id": "uuid",
      "type": "MULTIPLE_CHOICE",
      "question": "I __ a developer",
      "options": [
        {"id": "a", "text": "am"},
        {"id": "b", "text": "are"},
        {"id": "c", "text": "is"}
      ],
      "difficulty": 1
    }
  ]
}
```

```http
POST /api/exercises/{id}/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "answer_text": "am"
}

---

Response: 200 OK
{
  "is_correct": true,
  "score": 100,
  "explanation": "Correcto. 'I am' es la forma correcta del verbo 'to be' con 'I'.",
  "correct_answer": "am"
}
```

### Progress & Dashboard

```http
GET /api/users/me/dashboard
Authorization: Bearer {token}

---

Response: 200 OK
{
  "xp": 1420,
  "streak_days": 8,
  "weekly_goal": 82,
  "skills": {
    "grammar": 84,
    "vocabulary": 76,
    "listening": 70,
    "speaking": 68,
    "writing": 87,
    "technical_english": 91
  },
  "recent_errors": [
    {"error_type": "a_vs_an", "frequency": 4}
  ]
}
```

```http
GET /api/users/me/recommendations
Authorization: Bearer {token}

---

Response: 200 OK
{
  "reinforcement": [
    {
      "lesson_id": "uuid",
      "reason": "You failed 'a/an' 3 times"
    }
  ],
  "next_lessons": [
    {
      "lesson_id": "uuid",
      "reason": "Ready for this level"
    }
  ]
}
```

### Sync

```http
POST /api/sync
Authorization: Bearer {token}
Content-Type: application/json

{
  "timestamp": "2026-10-08T10:00:00Z",
  "changes": [
    {
      "type": "user_answer",
      "id": "uuid",
      "data": {
        "exercise_id": "uuid",
        "answer_text": "am",
        "score": 100
      }
    }
  ]
}

---

Response: 200 OK
{
  "synced": true,
  "server_timestamp": "2026-10-08T10:00:30Z",
  "pull": {
    "user_skills": {...},
    "courses_updated": []
  }
}
```

---

## ?? Cronograma Detallado

### Semana 1-2: Fase 0 (Setup & Infrastructure)

| Día | Backend | Mobile | Notas |
|---|---|---|---|
| **L1** | Init Spring Boot project, structure | Init Expo project, navigation | Paralelo |
| **L2** | PostgreSQL schema, migrations | Setup Redux/Zustand, types | Setup Docker |
| **L3** | Auth endpoints scaffolding | Auth screens (Login, Register) | Mock APIs |
| **L4** | Health check, Swagger setup | Onboarding UI (4 pasos) | Testing conexión |
| **L5** | DB seed data (curso piloto) | SQLite setup, sync mock | Integration test |
| **FDS** | Review, fixes | UI refinement | Demo local |

### Semana 2-3: Fase 1 (Autenticación & Onboarding)

| Día | Backend | Mobile |
|---|---|---|
| **L1** | Register endpoint (validaciones) | RegisterScreen completa |
| **L2** | Login + JWT generation | LoginScreen + token storage |
| **L3** | Refresh token endpoint | Token refresh interceptor |
| **L4** | User profile endpoints | OnboardingWizard completa |
| **L5** | Test auth flow end-to-end | Mobile integración con backend |
| **FDS** | Security review | UX testing, fixes |

### Semana 3-4: Fase 2 (Cursos & Lecciones)

| Día | Backend | Mobile |
|---|---|---|
| **L1** | Courses endpoints | CoursesListScreen |
| **L2** | Modules & lessons endpoints | CourseDetailScreen |
| **L3** | Download for offline | LessonDetailScreen |
| **L4** | Seed 5 lecciones completas | Download & persistence |
| **L5** | Progress tracking endpoints | Offline access test |
| **FDS** | API documentation (Swagger) | End-to-end test |

### Semana 4-6: Fase 3 (Ejercicios & Evaluación)

| Día | Backend | Mobile |
|---|---|---|
| **L1** | Exercise model + repository | ExerciseScreen component |
| **L2** | Evaluation service (rules-based) | MCQ/ShortAnswer UI |
| **L3** | Submit endpoint | Result display |
| **L4** | Seed 10 ejercicios | Integration |
| **L5** | Tests (evaluation logic) | Offline queue for answers |
| **FDS** | Bug fixes | Polish UI |

### Semana 5-6: Fase 3b (IA Integration, paralelo)

| Día | Backend | Mobile |
|---|---|---|
| **L1** | OpenAI API setup | (paralelo con Fase 3) |
| **L2** | AIEvaluator service | OPEN_RESPONSE UI |
| **L3** | Prompt engineering | IA evaluation display |
| **L4** | Caching + rate limiting | Error handling |
| **L5** | Tests (IA fallback) | UX polish |
| **FDS** | Production readiness | QA testing |

### Semana 6-7: Fase 4 (Progreso & Adaptación)

| Día | Backend | Mobile |
|---|---|---|
| **L1** | Dashboard endpoint | DashboardScreen |
| **L2** | Skills calculation | SkillsDetailScreen |
| **L3** | Error tracking + recommendations | ErrorsScreen |
| **L4** | Achievement system | RecommendationsScreen |
| **L5** | Tests (recommendation logic) | Navigation refactor |
| **FDS** | Bug fixes, optimization | Full integration |

### Semana 7-8: Fase 5 (Offline Sync)

| Día | Backend | Mobile |
|---|---|---|
| **L1** | Sync endpoint design | SyncManager service |
| **L2** | Conflict resolution | Offline queue |
| **L3** | Batch processing | Auto-sync logic |
| **L4** | Tests (sync edge cases) | UI indicators |
| **L5** | Production hardening | Comprehensive testing |
| **FDS** | Load testing | Field testing |

### Semana 8-9: Fase 6 (Polish & Optimization)

| Día | Backend | Mobile |
|---|---|---|
| **L1** | DB optimization (índices) | Bundle size review |
| **L2** | Performance testing | Animation polish |
| **L3** | Unit tests (70% coverage) | Error UI refinement |
| **L4** | Logging + monitoring | Accessibility review |
| **L5** | Dockerfile + CI/CD setup | Final testing |
| **FDS** | Production deployment readiness | Release candidate |

---

## ?? Dependencias y Camino Crítico

### Dependencias por Fase

```
Fase 0 (Setup)
  ?
Fase 1 (Auth)
  ?? Fase 2 (Cursos) [paralelo con Fase 1 última semana]
  ?   ?? Fase 3 (Ejercicios)
  ?   ?   ?? Fase 3b (IA) [paralelo]
  ?   ?   ?   ?? Fase 4 (Progreso)
  ?   ?   ?   ?   ?? Fase 5 (Sync)
  ?   ?   ?   ?   ?   ?? Fase 6 (Polish)
```

### Camino Crítico (en serie, más lento)
1. Backend infrastructure + DB setup: **1 semana**
2. Authentication (backend + mobile): **2 semanas**
3. Courses/Lessons structure: **1 semana**
4. Exercises + evaluation: **2 semanas**
5. AI integration: **1 semana** (puede ser paralelo)
6. Dashboard + progress: **1 semana**
7. Offline sync: **1 semana**
8. Polish: **1-2 semanas**

**Total: 8-9 semanas en ruta crítica**

### Paralelización Posible
- Backend curso setup ? Mobile auth screens (misma semana)
- Backend exercise evaluation ? Mobile exercise UI (misma semana)
- Backend IA ? Mobile dashboard (misma semana)
- Backend sync ? Mobile offline queue (misma semana)

---

## ? Verificación y Testing

### Verificación por Fase

#### Fase 0
- [ ] Docker Compose levanta PostgreSQL sin errores
- [ ] Backend compila: `mvn clean build`
- [ ] Frontend compila: `npm install && npm start` (Expo)
- [ ] Health check: `GET http://localhost:8080/health` ? 200 OK
- [ ] Base de datos inicializada con schema

#### Fase 1
- [ ] Usuario puede registrarse con email/password
- [ ] Login retorna JWT válido
- [ ] JWT incluido en Authorization header: `Bearer {token}`
- [ ] Perfil guardable (PUT /users/me/profile)
- [ ] Datos persisten offline en SQLite
- [ ] Token refresca automáticamente

#### Fase 2
- [ ] GET /courses retorna cursos filtrados
- [ ] Navegación: Cursos ? Módulos ? Lecciones (sin errores)
- [ ] Lecciones descargables offline
- [ ] Contenido accesible sin internet
- [ ] Indicator "? Available offline" funciona

#### Fase 3
- [ ] GET /exercises retorna ejercicios de lección
- [ ] POST /submit con respuesta correcta ? score 100
- [ ] POST /submit con respuesta incorrecta ? score 0, explicación visible
- [ ] Fuzzy matching funciona (typos menores aceptados)
- [ ] Progreso actualizado: "2/5 ejercicios" ? "3/5"
- [ ] Respuestas offline persistidas y sincronizadas

#### Fase 3b
- [ ] OPEN_RESPONSE enviado a IA
- [ ] Respuesta evaluada correctamente
- [ ] Explicación personalizada por nivel del usuario
- [ ] Caché evita re-evaluar mismo input
- [ ] Fallback si IA no disponible

#### Fase 4
- [ ] Dashboard carga datos correctamente
- [ ] Skills mostrados: Grammar 84%, Vocab 76%, etc
- [ ] Errores listados por frecuencia
- [ ] Recomendaciones generadas automáticamente
- [ ] Datos sincronizados correctamente

#### Fase 5
- [ ] Ejercicios completados offline se guardan en SQLite
- [ ] Conectar internet ? UI muestra "Syncing..."
- [ ] Datos enviados al servidor sin errores
- [ ] Dashboard actualiza post-sync
- [ ] No hay pérdida de datos

#### Fase 6
- [ ] App sin crashes (test 30 min de uso)
- [ ] Load time < 3s
- [ ] Navegación 60fps
- [ ] Todos los tests pasan
- [ ] Swagger accesible
- [ ] Error messages informativos

### Estrategia de Testing

**Backend**

```java
// JUnit5 + Mockito
@SpringBootTest
class AuthServiceTest {
  @Test
  void testRegisterNewUser_Success() { ... }
  
  @Test
  void testLoginInvalidCredentials_Fail() { ... }
}

// Integration tests
@SpringBootTest
class AuthControllerIntegrationTest {
  @Test
  void testRegisterEndpoint_201_Created() { ... }
}
```

**Mobile**

```typescript
// Jest + React Testing Library
describe('LoginScreen', () => {
  it('should call login API with email/password', () => { ... });
  it('should show error on invalid credentials', () => { ... });
});

describe('ExerciseScreen', () => {
  it('should display exercise correctly', () => { ... });
  it('should submit answer and show result', () => { ... });
});
```

**E2E Manual**

```
Flujo 1: New user
?? Register
?? Onboarding
?? View courses
?? Download lesson
?? Complete exercise
?? Check dashboard
?? Logout

Flujo 2: Offline
?? Disconnect internet
?? Do exercise
?? Check local storage
?? Reconnect
?? Verify sync
```

---

## ?? Criterios de Éxito

### MVP Success Criteria

| Criterio | Verificación |
|---|---|
| ? Autenticación | User registra, logea, recibe JWT válido |
| ? Perfil & Onboarding | User complete wizard (profesión, nivel, objetivo) |
| ? Navegación de Cursos | User ve cursos filtrados por área profesional |
| ? Lecciones & Contenido | User accede a contenido teórico |
| ? Ejercicios Cerrados | MCQ, short answer, fill blank funcionan |
| ? Evaluación Automática | Respuestas correctas e incorrectas evaluadas |
| ? Respuestas Abiertas + IA | OPEN_RESPONSE evaluado por LLM correctamente |
| ? Explicaciones Contextuales | Usuario recibe feedback personalizado |
| ? Progreso Visible | Dashboard muestra XP, streak, skills, errores |
| ? Recomendaciones | Sistema sugiere refuerzo automáticamente |
| ? Offline Funcional | Lecciones y ejercicios accesibles sin internet |
| ? Sincronización | Cambios offline se sincronizan correctamente |
| ? UX Fluida | Navegación sin crashes, transiciones suaves |
| ? Performance | App responsiva (<100ms respuestas API) |
| ? Error Handling | Errores manejados elegantemente al usuario |

### Métricas de Éxito

| Métrica | Objetivo |
|---|---|
| **Test Coverage (Backend)** | ? 70% lógica crítica |
| **Test Coverage (Mobile)** | ? 60% screens principales |
| **API Response Time** | < 100ms (p95) |
| **First Load Time** | < 3s (mobile) |
| **Frame Rate** | 60 fps en navegación |
| **Bundle Size** | < 50MB (app uncompressed) |
| **Crash Rate** | 0% en test de 1 hora |
| **Offline Success Rate** | 100% de cambios synced |

---

## ?? Notas Importantes

### Decisiones de Arquitectura

1. **Monolith vs Microservicios**
   - MVP: Modular Monolith (1 proceso, múltiples módulos)
   - Ventaja: Desarrollo rápido, fácil debugging
   - Futuro: Algunos módulos (IA, sync) pueden extraerse si crece

2. **IA desde el inicio**
   - Mejora UX pero incrementa costo (OpenAI API)
   - Considerar: Budget ~$10-50/mes en fase MVP
   - Fallback: Si IA no disponible, evaluación por reglas

3. **SQLite offline**
   - Suficiente para MVP (<100MB típicamente)
   - Escalable: si crece, considerar RealmDB

4. **Single Developer**
   - Modularidad es CRÍTICA: permite trabajo autónomo por módulo
   - Cada fase es "shippable": entregas parciales son válidas
   - Priorizar: backend > mobile, o vice versa según contexto

### Riesgos y Mitigación

| Riesgo | Mitigación |
|---|---|
| **IA caro** | Limitar evaluaciones, usar caché, rate limiting |
| **BD lenta** | Índices desde Fase 0, paginación, caché Redis |
| **Sincronización compleja** | Empezar simple (last-write-wins), iterar |
| **Scope creep** | Mantener foco MVP, postponer features para Fase 7 |
| **Burnout (single dev)** | Sprints de 1 semana, breaks entre fases |

### Próximos Pasos Post-MVP

1. **Fase 7: SaaS (Semanas 10-12)**
   - Sistema de suscripción (Stripe)
   - Panel web admin
   - Multi-tenant empresarial
   - Soporte para más profesiones

2. **Fase 8: Voz Avanzada (Semanas 13-15)**
   - Conversaciones fluidas por voz
   - Evaluación de pronunciación avanzada
   - Mock interviews realistas

3. **Fase 9: Gamificación+ (Semanas 16+)**
   - Leaderboards
   - Badges temáticas
   - Challenges sociales

---

## ?? Contacto y Recursos

**Documentación Oficial**

- React Native: https://reactnative.dev
- Expo: https://docs.expo.dev
- Spring Boot: https://spring.io/projects/spring-boot
- PostgreSQL: https://www.postgresql.org/docs
- OpenAI API: https://platform.openai.com/docs

**Herramientas Recomendadas**

- Backend debugging: Postman, REST Client (VS Code)
- Mobile debugging: React Native Debugger, Flipper
- DB management: pgAdmin, DBeaver
- API docs: Swagger UI (auto-generado)

---

**Versión**: 1.0  
**Última actualización**: 2026-10-08  
**Estado**: Ready for Development
