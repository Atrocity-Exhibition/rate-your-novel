import { Router } from 'express';

const router = Router();

// GET /api/ratings - Get ratings for a novel
router.get('/', (req, res) => {
  res.json({ message: 'Get ratings', query: req.query });
});

// POST /api/ratings - Create a rating
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Rating created' });
});

// PUT /api/ratings/:id - Update a rating
router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Rating updated', ratingId: id });
});

// DELETE /api/ratings/:id - Delete a rating
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Rating deleted', ratingId: id });
});

export default router;
