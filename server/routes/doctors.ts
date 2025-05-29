import express from 'express';
const router = express.Router();

// GET /api/doctors
router.get('/', (req, res) => {
  res.json({ message: 'Doctors route' });
});

export default router; 