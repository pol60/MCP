import express from 'express';
const router = express.Router();

// GET /api/users
router.get('/', (req, res) => {
  res.json({ message: 'Users route' });
});

export default router; 