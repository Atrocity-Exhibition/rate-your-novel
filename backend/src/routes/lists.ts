import { Router } from 'express';

const router = Router();

// GET /api/lists - Get user's lists
router.get('/', (req, res) => {
  res.json({ message: 'Get user lists', query: req.query });
});

// GET /api/lists/:id - Get specific list
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Get list', listId: id });
});

// POST /api/lists - Create new list
router.post('/', (req, res) => {
  res.status(201).json({ message: 'List created' });
});

// PUT /api/lists/:id - Update list
router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'List updated', listId: id });
});

// DELETE /api/lists/:id - Delete list
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'List deleted', listId: id });
});

// POST /api/lists/:id/novels/:novelId - Add novel to list
router.post('/:id/novels/:novelId', (req, res) => {
  const { id, novelId } = req.params;
  res.status(201).json({ message: 'Novel added to list', listId: id, novelId });
});

// DELETE /api/lists/:id/novels/:novelId - Remove novel from list
router.delete('/:id/novels/:novelId', (req, res) => {
  const { id, novelId } = req.params;
  res.json({ message: 'Novel removed from list', listId: id, novelId });
});

export default router;
