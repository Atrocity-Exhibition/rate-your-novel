# Rate Your Novel - Backend

Express.js backend server for the Rate Your Novel application.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Copy `.env.example` to `.env` and update values:
   ```bash
   cp .env.example .env
   ```

3. **Set up PostgreSQL database:**
   Make sure PostgreSQL is running, then:
   ```bash
   npm run db:setup
   npm run db:seed
   ```

## Running

**Development mode:**
```bash
npm run dev
```

**Build:**
```bash
npm run build
```

**Production mode:**
```bash
npm start
```

## API Endpoints

### Novels
- `GET /api/novels` - Get all novels
- `GET /api/novels/:id` - Get novel details
- `POST /api/novels` - Create novel (admin)
- `PUT /api/novels/:id` - Update novel (admin)
- `DELETE /api/novels/:id` - Delete novel (admin)

### Ratings
- `GET /api/ratings` - Get ratings
- `POST /api/ratings` - Create rating
- `PUT /api/ratings/:id` - Update rating
- `DELETE /api/ratings/:id` - Delete rating

### Reviews
- `GET /api/reviews` - Get reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Users
- `GET /api/users/:id` - Get user profile
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `PUT /api/users/:id` - Update profile
- `GET /api/users/:id/ratings` - Get user ratings
- `GET /api/users/:id/reviews` - Get user reviews

### Lists
- `GET /api/lists` - Get user lists
- `POST /api/lists` - Create list
- `PUT /api/lists/:id` - Update list
- `DELETE /api/lists/:id` - Delete list
- `POST /api/lists/:id/novels/:novelId` - Add novel to list
- `DELETE /api/lists/:id/novels/:novelId` - Remove novel from list

## Database Schema

The database includes tables for:
- `users` - User accounts
- `novels` - Web novel metadata
- `ratings` - 1-5 star ratings
- `reviews` - Detailed written reviews
- `reading_lists` - User reading progress
- `lists` - Custom novel collections
- `list_items` - Items in custom lists

See `src/migrations/001_init.sql` for full schema.
