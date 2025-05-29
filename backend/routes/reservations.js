import express from 'express';
import Reservation from '../models/Reservation.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/reservations
router.get('/', async (req, res) => {
    try {
        const all = await Reservation.find().sort({ datetime: 1 }).populate('client');
        res.json(all);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/reservations (solo auth)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { datetime, people } = req.body;
        const r = await Reservation.create({
            client: req.client._id,
            datetime,
            people
        });
        await r.populate('client');
        res.status(201).json(r);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
