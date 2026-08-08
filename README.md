# Memory Lane

A digital time capsule web app to preserve memories — letters, photos, videos, voice recordings, diary entries, and more.

## Tech Stack

**Backend** — Node.js, Express, MongoDB (Mongoose), JWT auth, Cloudinary, Multer  
**Frontend** — React 19, Vite, Tailwind CSS v4, Framer Motion, React Router v7

## Getting Started

### Prerequisites
- Node.js 18+
- A [MongoDB Atlas](https://mongodb.com/cloud/atlas) cluster
- A [Cloudinary](https://cloudinary.com) account

### Backend

```bash
cd Backend
cp .env.example .env   # fill in your values
npm install
npm run dev            # runs on http://localhost:8000
```

### Frontend

```bash
cd Frontend
cp .env.example .env   # fill in your values
npm install
npm run dev            # runs on http://localhost:5173
```

## Environment Variables

### Backend `.env`
| Variable | Description |
|---|---|
| `PORT` | Server port (default 8000) |
| `MONGODB_URI` | MongoDB connection string |
| `ACCESS_TOKEN_SECRET` | JWT access token secret |
| `ACCESS_TOKEN_EXPIRY` | e.g. `1d` |
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret |
| `REFRESH_TOKEN_EXPIRY` | e.g. `10d` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Frontend `.env`
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API URL (default `http://localhost:8000/api`) |

## API Routes

### Auth — `/api/users`
| Method | Route | Description |
|---|---|---|
| POST | `/register` | Register new user |
| POST | `/login` | Login |
| POST | `/logout` | Logout (auth required) |
| GET | `/current-user` | Get logged-in user (auth required) |

### Memories — `/api/memories` (all auth required)
| Method | Route | Description |
|---|---|---|
| GET | `/` | Get all memories (paginated, filterable) |
| POST | `/` | Create a memory |
| GET | `/:id` | Get a memory |
| PATCH | `/:id` | Update a memory |
| DELETE | `/:id` | Delete a memory |
| PATCH | `/:id/favorite` | Toggle favorite |

### Query params for GET `/api/memories`
`page`, `limit`, `sortBy` (newest/oldest/alphabetical), `type`, `search`

## Memory Types
`Diary` `Blog` `Journal` `Letter` `Photo` `Video` `Audio`

## Project Structure

```
Memory-Lane/
├── Backend/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── utils/
└── Frontend/
    └── src/
        ├── components/
        ├── context/
        ├── memories/
        ├── pages/
        └── utils/
```