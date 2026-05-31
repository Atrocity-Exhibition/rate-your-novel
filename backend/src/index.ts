import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import novelRoutes from '@routes/novels';
import ratingRoutes from '@routes/ratings';
import reviewRoutes from '@routes/reviews';
import userRoutes from '@routes/users';
import listRoutes from '@routes/lists';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/novels', novelRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡ Server is running on port ${PORT}`);
  console.log(`📚 Rate Your Novel API Server`);
});

export default app;
