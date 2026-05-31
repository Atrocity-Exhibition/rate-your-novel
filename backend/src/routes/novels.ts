import { Router } from 'express';

const router = Router();

// GET /api/novels - Get all novels with pagination and filtering
router.get('/', (req, res) => {
  res.json({ message: 'Get all novels', query: req.query });
});

// GET /api/novels/:id - Get novel details
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Get novel', novelId: id });
});

// POST /api/novels - Create new novel (admin only)
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Novel created' });
});

// PUT /api/novels/:id - Update novel (admin only)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Novel updated', novelId: id });
});

// DELETE /api/novels/:id - Delete novel (admin only)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Novel deleted', novelId: id });
});

export default router;
