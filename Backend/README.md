# OnlyCreators Backend API

Express.js + MongoDB backend for the OnlyCreators analytics platform.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) + bcrypt
- **Validation:** express-validator
- **Fallback DB:** mongodb-memory-server (auto-used when local MongoDB is unavailable)

## Quick Start

### 1. Install Dependencies

```bash
cd Backend
npm install
```

### 2. Configure Environment

A `.env` file is already included for development. You can also copy from the example:

```bash
cp .env.example .env
```

Default configuration:

| Variable           | Default                                    | Description                  |
| ------------------ | ------------------------------------------ | ---------------------------- |
| `PORT`             | `5000`                                     | Server port                  |
| `NODE_ENV`         | `development`                              | Environment                  |
| `MONGODB_URI`      | `mongodb://localhost:27017/onlycreators`   | MongoDB connection string    |
| `JWT_SECRET`       | (pre-configured)                           | Secret key for JWT signing   |
| `JWT_EXPIRE`       | `7d`                                       | Token expiration time        |
| `JWT_COOKIE_EXPIRE`| `7`                                        | Cookie expiration (days)     |
| `CLIENT_URL`       | `http://localhost:5173`                    | Frontend URL for CORS        |
| `SALT_ROUNDS`      | `10`                                       | bcrypt hashing rounds        |

### 3. Start the Server

```bash
# Development mode (with auto-restart via nodemon)
npm run dev

# Production mode
npm start
```

The server will:

1. Try to connect to MongoDB at the configured URI
2. If MongoDB isn't available, automatically start an **in-memory MongoDB** instance
3. Auto-seed the database with demo data if collections are empty
4. Print demo login credentials to the console

### 4. Seed the Database (Optional)

If you have MongoDB installed locally and want to seed manually:

```bash
# Seed (skip existing data)
npm run seed

# Fresh seed (drop all data first, then re-seed)
npm run seed:fresh
```

## Demo Credentials

| Field    | Value               |
| -------- | ------------------- |
| Email    | `sarah@example.com` |
| Password | `password123`       |

## API Endpoints

Base URL: `http://localhost:5000/api`

### Health & Info

| Method | Endpoint       | Description                          |
| ------ | -------------- | ------------------------------------ |
| GET    | `/api/health`  | Health check                         |
| GET    | `/api`         | API info with all available endpoints|

### Authentication (`/api/auth`)

| Method | Endpoint                       | Auth | Description                    |
| ------ | ------------------------------ | ---- | ------------------------------ |
| POST   | `/auth/signup`                 | No   | Register a new user            |
| POST   | `/auth/login`                  | No   | Login and receive JWT token    |
| POST   | `/auth/logout`                 | Yes  | Logout and clear cookie        |
| GET    | `/auth/me`                     | Yes  | Get current user profile       |
| GET    | `/auth/verify`                 | Yes  | Verify JWT token validity      |
| PUT    | `/auth/update-profile`         | Yes  | Update user profile/settings   |
| PUT    | `/auth/update-password`        | Yes  | Change password                |
| POST   | `/auth/forgot-password`        | No   | Request password reset email   |
| PUT    | `/auth/reset-password/:token`  | No   | Reset password with token      |
| DELETE | `/auth/delete-account`         | Yes  | Delete user account            |

### Analytics (`/api/analytics`)

All analytics endpoints require authentication (Bearer token).

| Method | Endpoint                      | Description                              |
| ------ | ----------------------------- | ---------------------------------------- |
| GET    | `/analytics/overview`         | Dashboard overview (stats, sparklines)   |
| GET    | `/analytics/videos`           | List videos with sorting/pagination      |
| GET    | `/analytics/videos/:videoId`  | Single video detailed analytics          |
| GET    | `/analytics/demographics`     | Audience demographics (age, gender, etc) |
| GET    | `/analytics/views-over-time`  | Views time series data                   |
| GET    | `/analytics/engagement`       | Engagement breakdown (likes/comments/shares) |
| GET    | `/analytics/peak-hours`       | Peak hours 24x7 heatmap matrix           |
| GET    | `/analytics/realtime`         | Real-time stats (simulated)              |
| GET    | `/analytics/export`           | Export analytics report                  |
| GET    | `/analytics/compare`          | Compare two time periods                 |

**Query Parameters:**

- `GET /analytics/overview` — `?dateRange=7d|30d|90d|1y|all`
- `GET /analytics/videos` — `?sortBy=views|likes|engagement&order=asc|desc&limit=10`
- `GET /analytics/views-over-time` — `?dateRange=30d`
- `GET /analytics/export` — `?format=csv|pdf|xlsx&dateRange=30d`
- `GET /analytics/compare` — `?period1=...&period2=...`

### Trends & Insights (`/api/trends`)

All trends endpoints require authentication (Bearer token).

| Method | Endpoint                               | Description                    |
| ------ | -------------------------------------- | ------------------------------ |
| GET    | `/trends`                              | List all trends                |
| GET    | `/trends/search`                       | Search trends by query         |
| GET    | `/trends/content-gaps`                 | Get uncovered trending topics  |
| GET    | `/trends/insights`                     | Get AI-generated insights      |
| GET    | `/trends/recommendations`              | Get content recommendations    |
| GET    | `/trends/:trendId`                     | Get single trend details       |
| POST   | `/trends/:trendId/bookmark`            | Bookmark a trend               |
| POST   | `/trends/insights/:insightId/apply`    | Mark insight as applied        |
| POST   | `/trends/insights/:insightId/dismiss`  | Dismiss an insight             |

**Query Parameters:**

- `GET /trends` — `?category=all|Technology|Lifestyle|Content Creation|Gaming|Education`
- `GET /trends/search` — `?q=search+query`
- `GET /trends/insights` — `?category=all|Performance|Audience|Trends|Optimization`

## Authentication Flow

1. User registers via `POST /auth/signup` or logs in via `POST /auth/login`
2. Server returns a JWT token and user profile
3. Frontend stores the token in `localStorage`
4. All subsequent API requests include the token in the `Authorization: Bearer <token>` header
5. The `protect` middleware verifies the token and attaches the user to `req.user`
6. Protected routes return `401 Unauthorized` if no valid token is provided

## Project Structure

```
Backend/
├── .env                          # Environment variables
├── .env.example                  # Environment template
├── .gitignore
├── package.json
├── README.md
└── src/
    ├── server.js                 # Entry point — Express app, middleware, routes
    ├── config/
    │   └── db.js                 # MongoDB connection (with memory-server fallback)
    ├── controllers/
    │   ├── authController.js     # Auth logic (login, signup, password reset, etc)
    │   ├── analyticsController.js# Dashboard & audience data endpoints
    │   └── trendsController.js   # Trends, insights, recommendations endpoints
    ├── middleware/
    │   └── auth.js               # JWT verification & global error handler
    ├── models/
    │   ├── User.js               # User schema (auth, profile, preferences)
    │   ├── Analytics.js          # Analytics schema (views, demographics, heatmap)
    │   ├── Video.js              # Video schema (performance metrics)
    │   ├── Trend.js              # Trend schema (topics, hashtags, scores)
    │   └── Insight.js            # Insight schema (AI recommendations)
    ├── routes/
    │   ├── authRoutes.js         # /api/auth/* routes with validation
    │   ├── analyticsRoutes.js    # /api/analytics/* routes
    │   └── trendsRoutes.js       # /api/trends/* routes
    └── seeds/
        └── seed.js               # Database seeder with all demo data
```

## How It Connects to the Frontend

The frontend (Vite + React) is configured to proxy `/api` requests to `http://localhost:5000` during development via `vite.config.js`. The frontend services (`analyticsService.js`, `trendsService.js`, `authService.js`) use Axios to make requests to these API endpoints, and the `AuthContext` manages JWT tokens and user state.

### Running Both Together

**Terminal 1 — Backend:**

```bash
cd Backend
npm run dev
```

**Terminal 2 — Frontend:**

```bash
cd Frontend
npm run dev
```

Then open `http://localhost:5173` and log in with the demo credentials.

## MongoDB Installation (Optional)

The backend works without a local MongoDB installation thanks to `mongodb-memory-server`. However, for persistent data across restarts, install MongoDB:

**Ubuntu / Linux Mint:**

```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg

# Add MongoDB repository
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# Install
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

After installing, run `npm run seed` to populate the database, then start the server with `npm run dev`.