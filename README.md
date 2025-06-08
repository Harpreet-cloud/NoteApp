# Multi-User Note App 

A web application that allows multiple users to register, log in, and manage their personal notes. Users can add, edit, and delete notes. The app uses **Passport.js** for authentication, **express-validator** for user data validation, and **connect-flash** for flash messages related to note actions. Session data is stored persistently in MongoDB using **connect-mongo**.

---

## Features

- User registration and login with server-side validation using `express-validator`
- User authentication and session management with **Passport.js** and `express-session`
- Sessions stored in MongoDB via `connect-mongo` for persistence
- Secure HTTP headers implemented with **Helmet**
- Cross-Origin Resource Sharing enabled with **CORS**
- HTTP request logging using **Morgan**
- Flash messages for success/error notifications related to note operations
- Protected routes accessible only to authenticated users
- Support for HTTP PUT and DELETE methods in forms via `method-override`
- Cookies parsed with `cookie-parser`
- Responsive UI styled with Bootstrap 
- General middleware for other errors

---

## Tech Stack

- Node.js
- Express.js
- Passport.js (authentication)
- express-validator (validates user registration and login data)
- connect-flash (note-related flash messages)
- express-session (session management)
- connect-mongo (stores sessions in MongoDB)
- Helmet (secure HTTP headers)
- CORS (cross-origin resource sharing)
- Morgan (HTTP request logging)
- cookie-parser (parses cookies)
- method-override (supports DELETE HTTP verb)
- dotenv (environment variable management)
- EJS (templating engine)
- Bootstrap (Bootswatch Lux theme for styling)

---

