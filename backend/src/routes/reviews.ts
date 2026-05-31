import { Router } from 'express';

const router = Router();

// GET /api/reviews - Get reviews for a novel
router.get('/', (req, res) => {
  res.json({ message: 'Get reviews', query: req.query });
});

// GET /api/reviews/:id - Get specific review
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Get review', reviewId: id });
});

// POST /api/reviews - Create a review
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Review created' });
});

// PUT /api/reviews/:id - Update a review
router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Review updated', reviewId: id });
});

// DELETE /api/reviews/:id - Delete a review
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Review deleted', reviewId: id });
});

export default router;
