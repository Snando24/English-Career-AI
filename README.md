# English Career AI 📱

> **El profesor de inglés que cabe en tu bolsillo**

Un asistente de aprendizaje de inglés impulsado por IA, diseñado específicamente para profesionales de tecnología que necesitan dominar el inglés en contextos laborales reales.

## 🎯 Visión

Convertir el aprendizaje de idiomas de una tarea genérica a una experiencia **personalizada, adaptativa e inmersiva** donde cada lección y ejercicio está diseñado para TU profesión, TU nivel y TUS objetivos de carrera.

### El Problema

❌ Las plataformas tradicionales enseñan inglés genérico  
❌ No preparan para situaciones reales en el trabajo  
❌ No se adaptan a errores recurrentes específicos  
❌ Requieren sesiones largas (incompatible con rutina laboral)  

### La Solución

✅ Inglés contextualizado para desarrolladores, ingenieros, y profesionales tech  
✅ Ciclo adaptativo: aprende → practica → evalúa → refuerza → avanza  
✅ Sesiones cortas (~30 min) distribuidas durante el día  
✅ Tutor con IA que entiende TUS fortalezas y debilidades  
✅ Funciona offline: estudia desde cualquier lugar  

---

## ✨ Funcionalidades MVP

### Autenticación & Onboarding
- Registro seguro con validaciones
- Wizard de 4 pasos (profesión, nivel, objetivo, tiempo diario)
- Almacenamiento seguro de credenciales

### Cursos & Lecciones
- Ruta educativa estructurada: Foundations → A1 → A2 → B1 → B2 → English for Developers
- Lecciones teóricas con contenido multimedia
- Descarga para acceso offline
- Progreso visible por lección

### Ejercicios Inteligentes
- **Múltiple opción**: evaluación instantánea
- **Respuesta corta**: fuzzy matching con tolerancia a typos
- **Rellenar espacios**: validación automática
- **Respuesta abierta**: evaluación contextual por IA

### Evaluación Adaptativa
- Tutor con IA que entiende errores específicos
- Explicaciones personalizadas por nivel
- Feedback constructivo en tiempo real
- Sistema de errores recurrentes detectados automáticamente

### Dashboard Inteligente
- **XP & Racha diaria**: motivación visual
- **Skills Profile**: desglose por habilidad (Grammar, Vocabulary, Speaking, etc)
- **Errores Detectados**: tabla de errores más frecuentes
- **Recomendaciones**: refuerzo automático para áreas débiles

### Sincronización Offline-First
- Estudia sin internet
- Los cambios se sincronizan automáticamente al conectar
- Cero pérdida de datos

---

## 🛠️ Stack Tecnológico

### Frontend (Mobile)
```
React Native + Expo
✅ TypeScript (type-safe)
✅ React Navigation (UI fluida)
✅ Redux/Zustand (state management)
✅ SQLite (almacenamiento local)
✅ Expo Secure Store (credenciales)
```

### Backend (API)
```
Java 21 + Spring Boot 3.x
✅ Spring Security (autenticación)
✅ Spring Data JPA (persistencia)
✅ PostgreSQL (base de datos)
✅ Redis (caché)
✅ OpenAI API (evaluación IA)
✅ SpringDoc (documentación Swagger)
```

### Infraestructura
```
Docker & Docker Compose
✅ PostgreSQL 15+
✅ Redis 7+
✅ Java 21 container
```

---

## 📂 Estructura del Proyecto

```
English-Career-AI/
├── backend/                    # API REST (Spring Boot)
│   ├── src/main/java/
│   │   └── com/englishcareer/
│   │       ├── auth/          # Login, JWT
│   │       ├── users/         # Perfiles
│   │       ├── courses/       # Cursos, módulos
│   │       ├── lessons/       # Lecciones
│   │       ├── exercises/     # Ejercicios
│   │       ├── evaluations/   # Evaluación, IA
│   │       ├── progress/      # Dashboard, skills
│   │       └── common/        # Utilidades
│   ├── docker-compose.yml     # PostgreSQL, Redis
│   └── pom.xml
│
├── mobile/                     # App Móvil (React Native)
│   ├── src/
│   │   ├── screens/           # Pantallas
│   │   ├── services/          # API client, sync, offline
│   │   ├── store/             # Redux/Zustand state
│   │   ├── types/             # TypeScript interfaces
│   │   ├── components/        # UI components
│   │   └── utils/             # Helpers
│   ├── app.json               # Expo config
│   └── package.json
│
├── docs/
│   ├── PLAN_IMPLEMENTACION.md # Plan detallado (fase por fase)
│   └── API_SPEC.md            # Especificación de APIs
│
└── README.md                   # Este archivo
```

---

## 🚀 Inicio Rápido

### Prerequisitos
- **Backend**: Java 21, Maven, PostgreSQL 15+
- **Mobile**: Node.js 18+, Expo CLI
- **DevTools**: Git, VS Code, Postman (opcional)

### Setup Backend

```bash
# 1. Clonar y navegar
cd backend

# 2. Crear .env con configuración
cp .env.example .env
# Editar con credenciales PostgreSQL

# 3. Levantar base de datos
docker-compose up -d

# 4. Compilar e iniciar
mvn clean spring-boot:run

# 5. Verificar
curl http://localhost:8080/api/health
# {"status": "UP"}

# 6. Swagger UI
open http://localhost:8080/swagger-ui/
```

### Setup Mobile

```bash
# 1. Navegar
cd mobile

# 2. Instalar dependencias
npm install

# 3. Iniciar Expo
npx expo start

# 4. En terminal Expo, presionar:
# - 'i' para iOS simulator
# - 'a' para Android emulator
# - 'w' para web browser
```

---

## 📋 Fases de Desarrollo

### Fase 0: Setup & Infrastructure (Semanas 1-2)
Establecer base técnica, estructura de proyectos, BD, APIs skeleton

### Fase 1: Autenticación & Onboarding (Semanas 2-3)
Register → Login → Perfil usuario

### Fase 2: Cursos & Lecciones (Semanas 3-4)
Navegación de contenido educativo, descarga offline

### Fase 3: Ejercicios & Evaluación (Semanas 4-6)
Ciclo ejercicio → evaluación (sin IA aún)

### Fase 3b: Integración IA (Semanas 5-6)
Respuestas abiertas con evaluación contextual

### Fase 4: Progreso & Adaptación (Semanas 6-7)
Dashboard inteligente, detección de errores, recomendaciones

### Fase 5: Sincronización Offline (Semanas 7-8)
Queue de cambios, sync automático

### Fase 6: Polish & Optimización (Semanas 8-9)
Performance, UX, testing, deploy readiness

**→ Ver [PLAN_IMPLEMENTACION.md](./PLAN_IMPLEMENTACION.md) para detalles completos**

---

## 📚 Ruta Educativa MVP

### Foundations (Nivel A0-A1)
Construcción de la base gramatical mínima

- Pronombres personales
- Verb "to be" (I am, you are, he/she/it is)
- Artículos (a / an)
- Plural simple
- Preguntas y negaciones básicas
- Presentaciones personales

### A1 - Basic English
Comunicación funcional elemental

- Present Simple (I work, you work, he works)
- Rutinas diarias
- Profesiones
- Preposiciones frecuentes
- Capacidades (can / can't)

### A2 - Functional English
Situaciones cotidianas y laborales

- Past Simple
- Future forms
- Comparativos
- Verbos modales
- Conversaciones cotidianas
- Inglés laboral básico

### B1 - Professional English
Contexto laboral intermedio-avanzado

- Present Perfect
- Conditionals
- Passive Voice
- Reuniones profesionales
- Emails formales
- Presentaciones

### B2 - Career English
Fluidez y precisión profesional

- Conversaciones complejas
- Negociaciones
- Entrevistas laborales
- Explicación de conceptos técnicos

### English for Developers
Léxico y situaciones de TI

- Terminología técnica (backend, frontend, APIs, databases)
- Explicación de errores y soluciones
- Code reviews en inglés
- Daily meetings / standups
- Sistemas distribuidos, arquitectura
- Agile / Scrum

### Interview English (Bonus)
Preparación para entrevistas internacionales

- HR interviews
- Technical interviews
- Behavioral questions
- Salary negotiation

---

## 🤖 Características de IA

### Evaluación de Respuestas Abiertas
La IA evalúa respuestas no cerradas entendiendo contexto, nivel del usuario, y aceptando variaciones válidas

**Ejemplo**:
```
Pregunta: "Describe tu experiencia con Spring Boot"
Respuesta del usuario: "I has experience with spring boot for 3 years"

IA responde:
{
  "is_correct": true,
  "score": 75,
  "explanation": "Tu respuesta es clara y comunica la experiencia. 
                 Nota: usa 'have' no 'has' con 'I'",
  "common_mistake": "Uso incorrecto de third person singular",
  "tip": "Recuerda: I/You/We/They → have | He/She/It → has"
}
```

### Explicaciones Contextuales
Feedback adaptado al nivel del usuario y su profesión

```
Nivel: A2
Profesión: Backend Developer

Error detectado: "I develop applications" vs "I am developing applications"

Explicación simple:
✓ "I develop": acciones habituales
✓ "I am developing": lo que haces AHORA

Ejemplo profesional:
"I develop REST APIs" (habitualmente)
"I am developing a new microservice" (en este momento)
```

### Detección de Errores Recurrentes
Sistema que identifica patrones de error

```
Error recurrente: "a engineer"
Veces detectado: 4
Categoría: Articles (a / an)

Acción automática:
✓ Agregar 5 ejercicios adicionales sobre "a/an"
✓ Incluir en próxima sesión de refuerzo
✓ Bloquear avance hasta dominio >= 85%
```

---

## 🎮 Gamificación

### Motivación sin distracción

- **XP**: +50 por lección completada, +10 por ejercicio
- **Racha diaria**: contador visual (🔥 8 day streak)
- **Nivel**: Progresión visual del nivel educativo
- **Habilidades**: Desglose por skill, visualización de progreso
- **Logros**: Badges por hitos ("First 100 XP", "Perfect Day", etc)

### Objetivos semanales
- Meta: Tu objetivo diario × 7 días (ej: 30 min × 7 = 210 min/semana)
- Progreso visual: barra que se completa
- Notificación: "Completaste tu objetivo semanal 🎉"

---

## 🔒 Seguridad

- 🔐 Contraseñas hasheadas con bcrypt
- 🔐 JWT con expiración configurable
- 🔐 Refresh tokens para sesiones largas
- 🔐 HTTPS en producción
- 🔐 Validación de entrada en todos endpoints
- 🔐 Rate limiting para prevenir abuse
- 🔐 Almacenamiento seguro en dispositivo (SecureStore)

---

## 📱 Compatibilidad

### Mobile
- **iOS**: 12.4+ (iPhone, iPad)
- **Android**: 6.0+ (phones, tablets)
- **Tablets**: Experiencia optimizada (landscape mode)

### Conectividad
- **Online-first**: Contenido dinámico con IA
- **Offline-capable**: Lecciones y ejercicios descargados
- **Auto-sync**: Sincronización automática al conectar

---

## ✅ Success Criteria MVP

| Criterio | Status |
|----------|--------|
| Autenticación (register + login) | ⏳ |
| Perfil & Onboarding | ⏳ |
| Navegación de cursos | ⏳ |
| Ejercicios (4 tipos) | ⏳ |
| Evaluación con IA | ⏳ |
| Dashboard inteligente | ⏳ |
| Offline funcional | ⏳ |
| Sincronización | ⏳ |
| UX fluida (sin crashes) | ⏳ |
| Tests (70% backend, 60% mobile) | ⏳ |

---

## 🗺️ Roadmap Post-MVP

### Fase 7: SaaS Platform (Semanas 10-12)
- Sistema de suscripción (gratuito + premium)
- Más profesiones (marketing, negocios, finanzas)
- Panel web de administración
- Multi-tenant para empresas

### Fase 8: Voz Avanzada (Semanas 13-15)
- Conversaciones fluidas con IA por voz
- Evaluación de pronunciación avanzada
- Mock interviews realistas
- Speech-to-text mejorado

### Fase 9: Comunidad (Semanas 16+)
- Leaderboards y challenges
- Peer review de ejercicios
- Badges sociales
- Community learning groups

---

## 📖 Recursos

### Documentación Técnica
- [Plan de Implementación Detallado](./PLAN_IMPLEMENTACION.md)
- [Especificación de APIs](./docs/API_SPEC.md)
- [Modelo de Datos](./docs/DATABASE_SCHEMA.md)

### Herramientas Recomendadas
- **API Testing**: Postman, Insomnia, REST Client (VS Code)
- **DB Management**: pgAdmin, DBeaver
- **Mobile Debugging**: React Native Debugger, Flipper
- **Monitoring**: DataDog, New Relic (post-MVP)

### Stack Oficial
- **Backend Docs**: https://spring.io/projects/spring-boot
- **Frontend Docs**: https://reactnative.dev
- **Mobile Framework**: https://docs.expo.dev
- **Database**: https://www.postgresql.org/docs
- **IA**: https://platform.openai.com/docs

---

## 💡 Filosofía del Producto

### 1. Mobile-First
El usuario estudia desde el teléfono, en cualquier lugar, en sesiones cortas

### 2. Adaptive Learning
El contenido se adapta a tu nivel, errores y objetivos

### 3. Practical English
Inglés real para profesionales, no lecciones teóricas desconectadas

### 4. Offline-Ready
Estudia incluso sin internet; sincroniza automáticamente

### 5. AI-Powered
Un tutor personal siempre disponible, 24/7

---

## 🤝 Contribuciones

Este es un proyecto de aprendizaje y portafolio técnico.

**Desarrollador Principal**: [@friveraq](https://github.com/friveraq)

---

## 🆘 Soporte

### Issues & Bugs
Reportar en: [GitHub Issues](https://github.com/friveraq/English-Career-AI/issues)

### Preguntas & Feedback
Contacto: friveraq@example.com

---

## 📜 Licencia

MIT License - Ver [LICENSE](./LICENSE) para detalles

---

## 🌟 Visión a Largo Plazo

**English Career AI** no es solo una app de idiomas. Es un asistente de desarrollo profesional que entiende que el inglés es una herramienta para crecer en la carrera.

En 2-3 años, la visión es:

> **Millones de profesionales en todo el mundo usando English Career AI para aprender el inglés que necesitan, en el momento que lo necesitan, de la forma que lo necesitan.**

Con IA adaptativa tan buena que el usuario sienta que tiene un coach personal que lo conoce mejor de lo que él se conoce a sí mismo.

---

**Status**: Ready for Development 🚀  
**MVP Deadline**: Week 9-10 (8-9 weeks from start)  
**Next Step**: Start Phase 0 - Infrastructure Setup

---

<div align="center">

### "Your Personal English Coach in Your Pocket" 📱

**English Career AI** - Transforming English Learning for Tech Professionals

</div>
