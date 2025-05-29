import express from 'express';
const router = express.Router();

// GET /api/messages
router.get('/', (req, res) => {
  res.json({ message: 'Messages route' });
});

export default router; 