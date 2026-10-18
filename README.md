<div align="center">

<img src="./screenshots/logo.png" alt="CollabX Logo" width="120" />

# 🤝 CollabX

### Where startups and corporates meet, connect, and build together.

A full stack collaboration platform that bridges the gap between ambitious startups and established corporates, turning cold outreach into real partnerships.

[🌐 Live Demo](https://collabx-frontend.onrender.com/)

</div>

---

## 📖 Table of Contents

1. [About the Project](#-about-the-project)
2. [The Problem & Our Solution](#-the-problem--our-solution)
3. [How It Works](#-how-it-works)
4. [Key Features](#-key-features)
5. [Tech Stack](#-tech-stack)
6. [System Architecture](#-system-architecture)
7. [Database Design](#-database-design)
8. [Screenshots](#-screenshots)
9. [Getting Started](#-getting-started)
10. [Environment Variables](#-environment-variables)
11. [API Documentation](#-api-documentation)
12. [Project Structure](#-project-structure)
13. [Security Practices](#-security-practices)
14. [Deployment](#-deployment)
15. [Challenges & Learnings](#-challenges--learnings)
16. [Roadmap](#-roadmap)
17. [FAQ & Troubleshooting](#-faq--troubleshooting)
18. [Contributing](#-contributing)
19. [License](#-license)
20. [Author](#-author)

---

## 💡 About the Project

**CollabX** is a full stack web platform built to connect two worlds that need each other but rarely meet efficiently: **startups** and **corporates**.

Startups bring innovation, speed, and fresh ideas. Corporates bring capital, infrastructure, and market reach. CollabX gives both a single, structured space to discover each other, present themselves professionally, and start collaborations without the noise of cold emails and endless networking events.

The project covers the complete web development lifecycle: UI design, secure authentication, a REST API, database modeling, frontend-backend integration, and live deployment.

---

## 🎯 The Problem & Our Solution

| 😓 The Problem | ✅ How CollabX Helps |
|---|---|
| Startups struggle to reach the right people inside large companies | Dedicated profiles and a discovery flow put startups in front of relevant corporates |
| Corporates have no easy way to scout innovative partners | Corporates can browse and evaluate startups in one place |
| Outreach happens over scattered emails and LinkedIn messages | Collaboration requests happen inside a single platform |
| No shared context before the first conversation | Structured profiles give both sides context upfront |

---

## 🔄 How It Works

```
   ┌────────────┐      ┌─────────────┐      ┌──────────────┐      ┌─────────────┐
   │  Sign Up   │ ───► │ Build your  │ ───► │  Discover &  │ ───► │ Collaborate │
   │ & Log In   │      │  Profile    │      │   Connect    │      │  & Grow     │
   └────────────┘      └─────────────┘      └──────────────┘      └─────────────┘
```

1. **Register** as a startup or a corporate and log in securely.
2. **Create your profile** describing who you are, what you do, and what you are looking for.
3. **Discover** relevant organisations on the other side of the platform.
4. **Connect and collaborate** by reaching out directly through CollabX.

> 📝 *Adjust these steps to match your app's real user flow.*

---

## ✨ Key Features

### 🔐 Authentication & Access Control
- Secure registration and login
- Token-based authentication (JWT)
- Protected routes on both frontend and backend
- Password hashing before storage

### 🚀 For Startups
- Create a profile showcasing your product, stage, and vision
- Discover corporates open to collaboration
- Send collaboration requests and track their status

### 🏢 For Corporates
- Create a company profile with focus areas and needs
- Browse startups that match your interests
- Review and respond to incoming collaboration requests

### ⚙️ Platform Features
- RESTful API with modular routes, controllers, and models
- Responsive UI that works on desktop, tablet, and mobile
- Clean separation between client and server
- Deployed and accessible online

> 📝 *Keep only what is true for your app and add anything missing.*

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React.js | Component-based UI and routing |
| **Styling** | YOUR_CSS (CSS / Tailwind / Material UI) | Responsive design |
| **Backend** | Node.js + Express.js | REST API and business logic |
| **Database** | MongoDB (+ Mongoose) | Flexible document storage |
| **Auth** | JWT + bcrypt | Stateless authentication and password hashing |
| **Hosting** | Render | Live deployment |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                          CLIENT                             │
│        React.js  ·  React Router  ·  Axios / Fetch          │
└──────────────────────────────┬──────────────────────────────┘
                               │  HTTPS · JSON
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                          SERVER                             │
│  Express.js  →  Middleware (auth, validation, CORS)         │
│              →  Routes  →  Controllers  →  Models           │
└──────────────────────────────┬──────────────────────────────┘
                               │  Mongoose ODM
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         DATABASE                            │
│                   MongoDB (Atlas / Local)                   │
└─────────────────────────────────────────────────────────────┘
```

**Request lifecycle:** the React client sends a request, Express middleware verifies the JWT, the route hands off to a controller, the controller uses a Mongoose model to read or write MongoDB, and a JSON response flows back to the UI.

---

## 🗄 Database Design

### `User`

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Unique identifier |
| `name` | String | Organisation or person name |
| `email` | String | Unique login email |
| `password` | String | Hashed password |
| `role` | String | `startup` or `corporate` |
| `createdAt` | Date | Account creation time |

### `Profile`

| Field | Type | Description |
|-------|------|-------------|
| `user` | ObjectId (ref User) | Owner of the profile |
| `description` | String | About the organisation |
| `industry` | String | Domain or sector |
| `website` | String | Official website |
| `lookingFor` | [String] | What they want from collaborations |

### `CollabRequest`

| Field | Type | Description |
|-------|------|-------------|
| `from` | ObjectId (ref User) | Sender |
| `to` | ObjectId (ref User) | Receiver |
| `message` | String | Pitch or note |
| `status` | String | `pending`, `accepted`, or `rejected` |
| `createdAt` | Date | Sent time |

> 📝 *Replace these schemas with your real models.*

---

## 📸 Screenshots

| Landing Page | Sign Up / Login |
|:---:|:---:|
| ![Landing](./screenshots/landing.png) | ![Auth](./screenshots/auth.png) |

| Dashboard | Profile |
|:---:|:---:|
| ![Dashboard](./screenshots/dashboard.png) | ![Profile](./screenshots/profile.png) |

| Discover | Collaboration Requests |
|:---:|:---:|
| ![Discover](./screenshots/discover.png) | ![Requests](./screenshots/requests.png) |

> 📝 *Add images to a `/screenshots` folder and update the file names.*

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local installation or a free [Atlas](https://www.mongodb.com/atlas) cluster)
- [Git](https://git-scm.com/)

Check your versions:

```bash
node -v
npm -v
```

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Akshat-cyber-cloud/YOUR_REPO.git
cd YOUR_REPO
```

**2. Install backend dependencies**

```bash
cd server
npm install
```

**3. Install frontend dependencies**

```bash
cd ../client
npm install
```

**4. Configure environment variables**

Create the `.env` files described in the [next section](#-environment-variables).

**5. Start the development servers**

```bash
# Terminal 1: backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2: frontend (http://localhost:3000)
cd client
npm start
```

**6. Open the app**

Visit **http://localhost:3000** in your browser.

---

## 🔑 Environment Variables

### Backend: `server/.env`

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/collabx

# Authentication
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES_IN=7d

# CORS
CLIENT_URL=http://localhost:3000
```

### Frontend: `client/.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

> ⚠️ **Never commit `.env` files.** Make sure they are listed in `.gitignore`.

---

## 📡 API Documentation

**Base URL:** `http://localhost:5000/api`

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| `POST` | `/auth/register` | Create a new account | ❌ |
| `POST` | `/auth/login` | Log in and receive a JWT | ❌ |
| `GET` | `/auth/me` | Get the logged-in user | ✅ |

### Profiles

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| `GET` | `/profiles` | List profiles to discover | ✅ |
| `GET` | `/profiles/:id` | View a single profile | ✅ |
| `PUT` | `/profiles/me` | Update your own profile | ✅ |

### Collaboration Requests

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| `POST` | `/requests` | Send a collaboration request | ✅ |
| `GET` | `/requests` | View sent and received requests | ✅ |
| `PATCH` | `/requests/:id` | Accept or reject a request | ✅ |

### Example: Register

**Request**

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Acme Labs",
  "email": "hello@acmelabs.com",
  "password": "StrongPassword123",
  "role": "startup"
}
```

**Response**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1c2e8b5a3c9001f2d1234",
    "name": "Acme Labs",
    "role": "startup"
  }
}
```

> 📝 *Replace with your actual endpoints and payloads.*

---

## 📂 Project Structure

```
CollabX/
├── client/                      # React frontend
│   ├── public/
│   └── src/
│       ├── assets/              # Images, icons
│       ├── components/          # Reusable UI components
│       ├── context/             # Auth and global state
│       ├── pages/               # Route-level pages
│       ├── services/            # API calls
│       ├── App.js
│       └── index.js
│
├── server/                      # Node + Express backend
│   ├── config/                  # DB connection, app config
│   ├── controllers/             # Request handlers
│   ├── middleware/              # Auth, error handling
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # API route definitions
│   └── server.js                # Entry point
│
├── screenshots/                 # README images
├── .gitignore
└── README.md
```

---

## 🛡 Security Practices

- 🔒 **Password hashing** with bcrypt, so plain-text passwords are never stored
- 🎫 **JWT authentication** for stateless, token-based sessions
- 🚧 **Protected routes** using auth middleware on the backend
- 🌐 **CORS configuration** limiting which origins can call the API
- 🔐 **Secrets in environment variables**, never hard-coded
- ✅ **Input validation** on incoming requests

---

## ☁️ Deployment

The application is deployed online and can be accessed at **[https://collabx-frontend.onrender.com/](https://collabx-frontend.onrender.com/)**.

| Part | Platform |
|------|----------|
| Frontend | Render |
| Backend | YOUR_BACKEND_HOST |
| Database | MongoDB Atlas |

### Deploy Your Own

1. Push the repository to GitHub.
2. Create a MongoDB Atlas cluster and copy the connection string.
3. Deploy the `server` folder and add the environment variables from above.
4. Deploy the `client` folder and set `REACT_APP_API_URL` to your live backend URL.
5. Update `CLIENT_URL` on the backend to your live frontend URL.

---

## 🧠 Challenges & Learnings

| Challenge | What I Learned |
|-----------|----------------|
| Connecting the React frontend with the Express API | Handling CORS, environment configs, and API error states |
| Designing authentication end to end | JWT flow, password hashing, and protecting routes on both sides |
| Modeling relationships in MongoDB | Referencing documents, schema design, and Mongoose population |
| Taking a project from localhost to production | Environment variables, build processes, and debugging in deployed environments |

> 📝 *Replace with real challenges you faced. Specific stories make this section the most impressive part for recruiters.*

---

## 🗺 Roadmap

- [x] User authentication and protected routes
- [x] Startup and corporate profiles
- [x] REST API with frontend integration
- [x] Online deployment
- [ ] Real-time chat between connected partners
- [ ] Smart partner matching and recommendations
- [ ] Email and in-app notifications
- [ ] Advanced search and filters
- [ ] Admin dashboard and analytics
- [ ] Automated tests (unit and integration)

See the [open issues](https://github.com/Akshat-cyber-cloud/YOUR_REPO/issues) for a full list of proposed features.

---

## ❓ FAQ & Troubleshooting

**The frontend cannot reach the backend.**
Check that the backend is running, `REACT_APP_API_URL` is correct, and `CLIENT_URL` on the server matches your frontend origin (CORS).

**MongoDB connection fails.**
Verify your `MONGO_URI`, make sure your IP is whitelisted in Atlas, and confirm the database user's password has no unescaped special characters.

**I get "Invalid token" or get logged out immediately.**
Make sure `JWT_SECRET` is identical across restarts and that the token is sent in the `Authorization: Bearer <token>` header.

**Port already in use.**
Change `PORT` in `server/.env` or stop the process using that port.

---

## 🤝 Contributing

Contributions make the open-source community a great place to learn and build. Any contribution is **greatly appreciated**.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m "Add AmazingFeature"`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Akshat**
Final-year B.Tech CSE student · Full Stack Developer with GenAI / agentic systems experience

[![GitHub](https://img.shields.io/badge/GitHub-Akshat--cyber--cloud-181717?style=for-the-badge&logo=github)](https://github.com/Akshat-cyber-cloud)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-akshat--gupta132-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/akshat-gupta132)
[![Email](https://img.shields.io/badge/Email-aakshat11g@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:aakshat11g@gmail.com)
