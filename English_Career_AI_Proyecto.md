# English Career AI

## 1. Descripción general

**English Career AI** es una aplicación móvil de aprendizaje de inglés enfocada en el desarrollo profesional. Su objetivo es ayudar a los usuarios a aprender inglés de forma progresiva, práctica y personalizada, adaptando las lecciones, ejercicios y evaluaciones a su nivel, profesión, errores frecuentes y objetivos laborales.

La aplicación está pensada bajo un enfoque **mobile-first**, de modo que el usuario pueda estudiar desde su teléfono en cualquier lugar y momento, sin depender de una computadora. Será una aplicación **online-first**, aprovechando servicios de inteligencia artificial, sincronización y contenido dinámico, pero contará también con soporte offline para actividades que no requieran conexión permanente.

El producto comenzará orientado especialmente a profesionales de tecnología y desarrollo de software, pero su arquitectura deberá permitir incorporar posteriormente rutas para otras profesiones.

---

## 2. Problema que busca resolver

Muchas plataformas de aprendizaje de idiomas enseñan inglés de manera general, pero no necesariamente preparan al usuario para situaciones reales relacionadas con su carrera profesional.

Un desarrollador de software, por ejemplo, necesita aprender a:

- Presentarse profesionalmente.
- Explicar su experiencia laboral.
- Hablar sobre tecnologías, proyectos y arquitectura.
- Participar en reuniones y dailies.
- Entender documentación técnica.
- Realizar entrevistas laborales en inglés.
- Explicar errores, soluciones y decisiones técnicas.
- Comunicarse con equipos internacionales.

Además, el aprendizaje tradicional suele avanzar por contenido predeterminado sin considerar suficientemente los errores recurrentes de cada estudiante.

**English Career AI** busca resolver este problema mediante un sistema de aprendizaje adaptativo que detecte fortalezas y debilidades, refuerce los temas necesarios y permita avanzar únicamente cuando el usuario demuestre dominio suficiente.

---

## 3. Objetivo principal

Crear una aplicación móvil que funcione como un **profesor personal de inglés**, capaz de enseñar, practicar, evaluar y adaptar automáticamente el contenido a las necesidades profesionales del usuario.

La experiencia debe seguir el ciclo:

```text
Aprender
   ↓
Practicar
   ↓
Pronunciar / Escuchar
   ↓
Evaluar
   ↓
Detectar errores
   ↓
Reforzar o avanzar
```

El sistema no deberá avanzar únicamente porque el usuario haya terminado una lección, sino porque haya demostrado que comprende y puede aplicar el contenido.

---

## 4. Público objetivo inicial

La primera versión estará dirigida principalmente a:

- Desarrolladores de software.
- Backend Developers.
- Frontend Developers.
- Full Stack Developers.
- Ingenieros de software.
- Profesionales de tecnología que necesitan inglés laboral.
- Personas que buscan empleo remoto o internacional.
- Profesionales que necesitan prepararse para entrevistas técnicas en inglés.

En versiones posteriores podrán incorporarse otras áreas como:

- Negocios.
- Marketing.
- Atención al cliente.
- Ingeniería.
- Turismo.
- Finanzas.
- Salud.

---

## 5. Principios del producto

### 5.1 Mobile-first

La aplicación móvil será el producto principal.

El usuario deberá poder estudiar desde cualquier lugar utilizando sesiones cortas o completas.

Una sesión diaria sugerida podrá ser de aproximadamente **30 minutos**, pero deberá poder dividirse durante el día.

Ejemplo:

```text
Mañana:      10 minutos
Tarde:        5 minutos
Noche:       15 minutos
-----------------------
Total:       30 minutos
```

### 5.2 Online-first

La conexión a Internet permitirá ofrecer:

- Tutor con inteligencia artificial.
- Evaluación de respuestas abiertas.
- Conversaciones dinámicas.
- Actualización de cursos y ejercicios.
- Sincronización de progreso.
- Funciones de voz.
- Simulación de entrevistas.

### 5.3 Soporte offline

Cuando no exista conexión, el usuario podrá continuar con ciertas actividades previamente descargadas.

Ejemplos:

- Leer lecciones.
- Resolver ejercicios básicos.
- Repasar vocabulario.
- Utilizar flashcards.
- Consultar progreso reciente.

Cuando la conexión vuelva a estar disponible, la aplicación sincronizará el progreso con el backend.

### 5.4 Aprendizaje adaptativo

El contenido deberá adaptarse según el desempeño del usuario.

Ejemplo:

```text
Error recurrente: uso incorrecto de a / an
Veces detectado: 4

Acción del sistema:
- Añadir ejercicios adicionales.
- Incluir el tema en el siguiente repaso.
- Evitar aumentar la dificultad hasta alcanzar dominio suficiente.
```

---

## 6. Metodología de aprendizaje

Cada lección deberá combinar teoría, práctica y evaluación.

Una sesión típica podría estar compuesta por:

| Sección | Tiempo aproximado |
|---|---:|
| Repaso de errores anteriores | 5 min |
| Nuevo concepto | 8 min |
| Ejercicios prácticos | 5 min |
| Vocabulario profesional | 4 min |
| Speaking / Pronunciación | 5 min |
| Evaluación | 3 min |

El tiempo podrá ajustarse de acuerdo con el rendimiento del estudiante.

---

## 7. Sistema de evaluación

Cada lección tendrá criterios de aprobación.

Ejemplo inicial:

```text
0 - 69%   → Repetir contenido
70 - 79%  → Refuerzo obligatorio
80 - 89%  → Lección aprobada
90 - 100% → Lección aprobada + contenido avanzado opcional
```

La decisión no deberá depender únicamente de una evaluación aislada. El sistema también podrá considerar:

- Historial de intentos.
- Errores recurrentes.
- Retención de conocimientos.
- Desempeño en ejercicios anteriores.
- Pronunciación.
- Vocabulario.
- Escritura.
- Comprensión.

---

## 8. Áreas de aprendizaje

La aplicación deberá poder medir de forma independiente diferentes habilidades.

```text
Grammar
Vocabulary
Reading
Listening
Speaking
Pronunciation
Writing
Professional English
Technical English
```

Ejemplo de perfil:

```text
Grammar             84%
Vocabulary          76%
Listening           70%
Speaking            68%
Writing             87%
Technical English   91%
```

Esto permitirá identificar claramente qué necesita reforzar cada usuario.

---

## 9. Ruta educativa inicial

### Foundations

- Pronombres personales.
- Verb `to be`.
- `a / an`.
- Singular y plural.
- Preguntas básicas.
- Negaciones.
- Presentaciones personales.

### A1 - Basic English

- Present Simple.
- `do / does`.
- Rutinas.
- Profesiones.
- Preposiciones.
- `can / can't`.
- Posesivos.

### A2 - Functional English

- Past Simple.
- Future forms.
- Comparativos.
- Verbos modales.
- Conversaciones cotidianas.
- Inglés laboral básico.

### B1 - Professional English

- Present Perfect.
- Conditionals.
- Passive Voice.
- Reuniones.
- Emails profesionales.
- Presentaciones.
- Descripción de experiencia laboral.

### B2 - Career English

- Conversaciones profesionales fluidas.
- Explicación de conceptos complejos.
- Presentaciones técnicas.
- Negociaciones.
- Reuniones internacionales.
- Entrevistas profesionales.

### English for Developers

- Backend vocabulary.
- Frontend vocabulary.
- APIs.
- Databases.
- Cloud.
- Git y GitHub.
- Bugs y troubleshooting.
- Agile / Scrum.
- Daily meetings.
- Code reviews.
- Software architecture.
- System design.

### Interview English

- HR interviews.
- Technical interviews.
- Behavioral questions.
- Descripción de proyectos.
- Fortalezas y debilidades.
- Experiencia profesional.
- Salary negotiation.
- Mock interviews con IA.

---

## 10. Tutor con Inteligencia Artificial

La IA será uno de los componentes centrales del sistema.

No todos los ejercicios requerirán IA. Las preguntas cerradas deberán evaluarse mediante reglas del sistema cuando sea posible, reservando la IA para tareas que realmente lo necesiten.

### Casos de uso de IA

- Evaluar respuestas abiertas.
- Explicar errores de gramática.
- Generar ejercicios personalizados.
- Adaptar la dificultad.
- Crear conversaciones contextualizadas.
- Simular entrevistas.
- Evaluar redacción.
- Sugerir vocabulario profesional.
- Generar ejemplos según la profesión del usuario.

Ejemplo:

```text
Usuario:
I am work with Java.

Sistema:
❌ Incorrecto
✅ I work with Java.

Explicación:
"Work" ya funciona como verbo principal, por lo que no se utiliza "am" en esta estructura.

Tema detectado:
Present Simple vs Verb To Be
```

---

## 11. Sistema de errores recurrentes

La aplicación deberá registrar los errores importantes del usuario.

Ejemplo:

| Error | Categoría | Veces detectado |
|---|---|---:|
| a engineer | Articles | 3 |
| I am work | Present Simple | 2 |
| He develop | Third person | 4 |
| in Monday | Prepositions | 1 |

Esta información permitirá crear sesiones de refuerzo personalizadas.

---

## 12. Speaking y pronunciación

La aplicación utilizará el micrófono del dispositivo para practicar inglés hablado.

Ejemplo de ejercicio:

```text
Frase:
I develop backend applications.

[ Mantener presionado para hablar ]
```

El sistema podrá evaluar:

- Palabras reconocidas.
- Pronunciación.
- Fluidez.
- Errores frecuentes.
- Ritmo.

En futuras versiones podrá ofrecer conversaciones completas por voz.

---

## 13. Simulación de conversaciones

El usuario podrá practicar situaciones profesionales mediante IA.

Ejemplos:

### Daily Meeting

```text
AI:
What did you work on yesterday?

User:
Yesterday I worked on the authentication service.
```

### Technical Interview

```text
AI:
Can you explain how dependency injection works in Spring Boot?
```

### HR Interview

```text
AI:
Tell me about yourself and your professional experience.
```

Al finalizar, el sistema podrá entregar una evaluación.

```text
Grammar             82%
Vocabulary          80%
Fluency             72%
Technical English   90%
```

---

## 14. Gamificación

La aplicación podrá utilizar mecanismos de motivación sin convertirlos en el objetivo principal.

Ejemplos:

- Racha diaria.
- Experiencia / XP.
- Niveles.
- Objetivos semanales.
- Logros.
- Historial de aprendizaje.

Ejemplo:

```text
🔥 8 day streak
⭐ 1,420 XP

Weekly Goal
████████░░ 82%
```

---

## 15. Notificaciones

La aplicación podrá enviar recordatorios personalizados.

Ejemplos:

```text
You have studied 20 of your 30 minutes today.
10 minutes remaining.
```

```text
Yesterday you struggled with "a / an".
A 5-minute review is ready.
```

Las notificaciones deberán configurarse de manera que apoyen el aprendizaje sin resultar invasivas.

---

## 16. Arquitectura tecnológica propuesta

### Aplicación móvil

```text
React Native
Expo
TypeScript
```

Responsabilidades:

- Interfaz del estudiante.
- Navegación.
- Ejercicios.
- Grabación de voz.
- Audio.
- Almacenamiento local.
- Sincronización con el servidor.
- Notificaciones.

### Backend

```text
Java 21
Spring Boot
Spring Security
REST API
JWT / OAuth2
```

Responsabilidades:

- Usuarios.
- Autenticación.
- Cursos.
- Lecciones.
- Ejercicios.
- Evaluaciones.
- Progreso.
- Adaptación del aprendizaje.
- Integración con servicios de IA.

### Base de datos

```text
PostgreSQL
```

Entidades principales iniciales:

```text
users
profiles
courses
modules
lessons
exercises
questions
answers
user_progress
user_attempts
user_errors
user_skills
achievements
```

### Almacenamiento local móvil

```text
SQLite / almacenamiento local compatible con React Native
```

Permitirá guardar temporalmente:

- Lecciones descargadas.
- Ejercicios offline.
- Progreso pendiente de sincronización.
- Preferencias del usuario.

---

## 17. Arquitectura general

```text
┌────────────────────────────┐
│        Mobile App          │
│ React Native + Expo + TS   │
└──────────────┬─────────────┘
               │ HTTPS
               ▼
┌────────────────────────────┐
│        Backend API         │
│ Java 21 + Spring Boot      │
└───────┬─────────┬──────────┘
        │         │
        ▼         ▼
 PostgreSQL    Cache / Redis
        │
        ▼
┌────────────────────────────┐
│      AI Services           │
│ LLM                        │
│ Speech-to-Text             │
│ Text-to-Speech             │
│ Pronunciation Evaluation   │
└────────────────────────────┘
```

---

## 18. Estrategia de arquitectura backend

La primera versión no deberá comenzar con una arquitectura excesivamente distribuida.

Se recomienda iniciar con un **Modular Monolith** bien organizado.

Ejemplo:

```text
english-career-api
│
├── auth
├── users
├── courses
├── lessons
├── exercises
├── evaluations
├── progress
├── learning
├── achievements
└── ai
```

Si el producto crece, algunos módulos podrán evolucionar posteriormente hacia microservicios.

---

## 19. MVP - Primera versión funcional

El primer MVP deberá concentrarse en demostrar que el sistema de aprendizaje funciona.

### Funcionalidades principales

1. Registro e inicio de sesión.
2. Perfil del estudiante.
3. Selección del objetivo profesional.
4. Cursos y módulos.
5. Lecciones.
6. Ejercicios.
7. Evaluaciones.
8. Registro de progreso.
9. Registro de errores recurrentes.
10. Recomendaciones de refuerzo.
11. Corrección con IA para respuestas abiertas.
12. Funcionamiento móvil Android/iOS.
13. Sincronización básica.
14. Descarga de contenido para uso offline.

### Fuera del primer MVP

Inicialmente podrán dejarse fuera:

- Conversaciones avanzadas por voz.
- Simulación completa de entrevistas.
- Marketplace de cursos.
- Sistema de suscripciones.
- Panel administrativo avanzado.
- Multi-tenant empresarial.

---

## 20. Roadmap inicial

### Fase 1 - Base de aprendizaje

- App móvil.
- Login.
- Perfil.
- Cursos.
- Lecciones.
- Ejercicios.
- Evaluaciones.
- Progreso.

### Fase 2 - Inteligencia Artificial

- Evaluación de respuestas abiertas.
- Explicación automática de errores.
- Generación de ejercicios personalizados.
- Registro inteligente de debilidades.

### Fase 3 - Adaptive Learning

- Detección de patrones.
- Refuerzo automático.
- Spaced repetition.
- Sesiones diarias personalizadas.

### Fase 4 - Voz

- Speech-to-Text.
- Text-to-Speech.
- Práctica de pronunciación.
- Listening.

### Fase 5 - English for Developers

- Daily meetings.
- Code reviews.
- APIs.
- Arquitectura.
- Cloud.
- Git.
- Entrevistas técnicas.

### Fase 6 - AI Conversations

- Conversaciones dinámicas.
- Mock interviews.
- Feedback de fluidez.
- Evaluaciones avanzadas.

### Fase 7 - SaaS

- Nuevas profesiones.
- Suscripciones.
- Plan gratuito y Premium.
- Panel web administrativo.
- Empresas y equipos.

---

## 21. Posible evolución como SaaS

A largo plazo, el usuario podrá crear una experiencia personalizada indicando datos como:

```text
Nivel actual: A2
Profesión: Backend Developer
Objetivo: conseguir trabajo remoto
Tiempo diario: 30 minutos
Áreas débiles: Speaking y Listening
```

El sistema podrá generar una ruta específica para ese perfil.

Otro usuario podría seleccionar:

```text
Profesión: Marketing
Objetivo: reuniones internacionales
```

Y recibir una experiencia distinta.

La propuesta de valor dejaría de ser simplemente:

> Aprender inglés.

Para convertirse en:

> **Aprender el inglés que necesitas para desarrollar tu carrera profesional.**

---

## 22. Valor como proyecto profesional

Además de convertirse potencialmente en un producto comercial, el proyecto servirá como una aplicación de portafolio técnicamente completa.

Permitirá trabajar con:

- Desarrollo móvil.
- Java y Spring Boot.
- APIs REST.
- Seguridad.
- PostgreSQL.
- Arquitectura modular.
- Inteligencia Artificial.
- Prompt engineering.
- Speech-to-Text.
- Text-to-Speech.
- Docker.
- CI/CD.
- Cloud.
- Observabilidad.
- Testing.
- Sistemas distribuidos en etapas posteriores.

El propio creador podrá utilizar la aplicación como primer usuario real, permitiendo validar el sistema mientras aprende inglés y desarrollar funcionalidades basadas en necesidades reales.

---

## 23. Visión del producto

**English Career AI** busca convertirse en un acompañante de aprendizaje continuo que no se limite a mostrar lecciones, sino que comprenda el progreso del usuario, identifique sus dificultades y adapte su formación para ayudarlo a utilizar inglés de manera real en su carrera.

La aplicación deberá sentirse menos como un curso tradicional y más como tener disponible en el teléfono un:

> **Profesor de inglés + entrenador profesional + simulador de situaciones laborales impulsado por IA.**

---

## 24. Estado actual

El proyecto se encuentra actualmente en etapa de definición conceptual.

La primera ruta educativa que servirá como base será la ruta de aprendizaje de inglés desde nivel básico hasta inglés profesional para desarrolladores.

El siguiente paso recomendado es crear los documentos técnicos complementarios:

1. Requerimientos funcionales y no funcionales.
2. Historias de usuario.
3. Alcance detallado del MVP.
4. Modelo de datos.
5. Arquitectura técnica.
6. Diseño inicial de pantallas.
7. Backlog de desarrollo.
8. Definición de APIs.
9. Estrategia de IA.
10. Plan de despliegue.
