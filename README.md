# Pokemon Tracker

A full-stack Pokemon tracker application with Node.js backend and React frontend.

## Quick Start

### Install Dependencies

Install all dependencies (root, backend, and frontend):

```bash
npm run install:all
```

Or install individually:
```bash
npm install              # Root dependencies
cd backend && npm install
cd ../frontend && npm install
```

### Development Mode

Run both frontend and backend in development mode:

```bash
npm run dev
```

This will:
- Start the backend server with `nodemon` (auto-reload on changes) on port 8080
- Start the frontend Vite dev server (typically on port 5173)

### Production Mode

Build and run in production mode:

```bash
npm run build           # Build frontend
npm start               # Start both backend and frontend
```

### Individual Services

Run services separately:

```bash
# Backend only
npm run dev:backend     # Development mode
npm run start:backend   # Production mode

# Frontend only
npm run dev:frontend    # Development mode
npm run start:frontend  # Production mode (requires build first)
```

## Project Structure

```
pokemon-tracker/
├── backend/
│   ├── api/
│   │   └── index.js          # Vercel serverless function entry point
│   ├── server.js              # Local development server
│   ├── package.json
│   └── vercel.json            # Backend deployment config
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vercel.json            # Frontend deployment config
├── package.json               # Root package.json with monorepo scripts
└── vercel.json                # Root frontend deployment config
```

## Deployment

### Deploying to Vercel

This project is configured for separate frontend and backend deployments on Vercel.

**Option A (Recommended):** Use the Vercel dashboard to import this repo twice, creating two projects. Set the **Root Directory** for each project:
- **Frontend project**: Set Root Directory to `frontend`
- **Backend project**: Set Root Directory to `backend`

**Option B:** Use the Vercel CLI from each subfolder:

```bash
cd frontend
vercel --prod

cd ../backend
vercel --prod
```

### Environment Variables

- The frontend reads `VITE_BACKEND_URL` at build time. Configure this environment variable in Vercel for the frontend project.
- The backend can use `ALLOWED_ORIGINS` environment variable (comma-separated list) to configure CORS origins.

## Technology Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Deployment**: Vercel (serverless functions for backend, static hosting for frontend)
