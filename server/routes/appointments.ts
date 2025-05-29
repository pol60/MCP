import express from 'express';
const router = express.Router();

// GET /api/appointments
router.get('/', (req, res) => {
  res.json({ message: 'Appointments route' });
});

export default router; 