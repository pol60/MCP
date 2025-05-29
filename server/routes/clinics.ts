import express from 'express';
const router = express.Router();

// GET /api/clinics
router.get('/', (req, res) => {
  res.json({ message: 'Clinics route' });
});

export default router; 