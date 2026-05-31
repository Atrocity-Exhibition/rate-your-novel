# Rate Your Novel

A web platform inspired by AlbumOfTheYear.com, designed for web novel enthusiasts to browse, rate, review, and save their favorite novels.

## Features

- **Browse Novels**: Discover web novels with detailed information
- **Rate & Review**: Share your thoughts and ratings on novels
- **Save for Later**: Build your reading list
- **User Profiles**: Track your reading history and ratings
- **Community**: Interact with other novel readers

## Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Package Manager**: npm (workspaces)

## Project Structure

```
rate-your-novel/
├── frontend/          # React application
├── backend/           # Express API server
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- PostgreSQL 12+
- npm 7+ (for workspaces)

### Installation

1. **Install dependencies for all workspaces:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Frontend: Create `frontend/.env.local`
   - Backend: Create `backend/.env`

3. **Set up the database:**
   ```bash
   cd backend
   npm run db:setup
   npm run db:seed
   ```

### Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Frontend (runs on http://localhost:3000)
npm run dev --workspace=frontend

# Backend (runs on http://localhost:5000)
npm run dev --workspace=backend
```

### Building for Production

```bash
npm run build
```

## API Documentation

The backend API serves endpoints for:
- `/api/novels` - Novel listings and search
- `/api/ratings` - User ratings
- `/api/reviews` - Novel reviews
- `/api/users` - User management
- `/api/lists` - Saved lists and reading lists

## Contributing

This is a personal project. Feel free to fork and customize for your own use.

## License

MIT
