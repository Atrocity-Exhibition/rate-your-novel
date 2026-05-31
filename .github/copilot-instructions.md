# Rate Your Novel - Development Instructions

## Project Overview

Rate Your Novel is a full-stack web application for rating, reviewing, and saving web novels - inspired by AlbumOfTheYear.com.

**Stack:** React (Frontend) + Node.js/Express (Backend) + PostgreSQL (Database)

## Getting Started

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm 7+ (for workspaces)

### Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database credentials
   ```

3. **Set up database:**
   ```bash
   npm run db:setup
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Project Structure

```
rate-your-novel/
├── frontend/              # React + TypeScript
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── App.tsx       # Main app
│   └── package.json
├── backend/               # Express + Node.js
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Route handlers
│   │   ├── models/       # Data models
│   │   ├── types/        # TypeScript types
│   │   └── index.ts      # Server entry
│   ├── scripts/          # DB setup/seed
│   ├── migrations/       # Database migrations
│   └── package.json
└── README.md
```

## Key Features to Implement

- [ ] User authentication (register/login)
- [ ] Novel browsing with search and filtering
- [ ] Rating system (1-5 stars)
- [ ] Review writing with helpful votes
- [ ] Reading lists and custom collections
- [ ] User profiles with statistics
- [ ] Community features (follow, recommendations)

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start both frontend and backend in dev mode |
| `npm run build` | Build both frontend and backend |
| `npm run db:setup` | Initialize database |
| `npm run db:seed` | Add sample data |

## API Documentation

See [backend/README.md](backend/README.md) for complete API endpoint documentation.

## Next Steps

1. Connect frontend to backend API
2. Implement user authentication
3. Build out data fetching services
4. Add form validation and error handling
5. Style pages with CSS/responsive design
6. Deploy to production (Vercel/Heroku)

## Notes

- Both workspaces use TypeScript for type safety
- PostgreSQL schema defined in `backend/src/migrations/001_init.sql`
- Frontend uses React Router for navigation
- Backend uses Express with middleware for CORS and JSON parsing
