import express from 'express';
import Reservation from '../models/Reservation.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
    console.log(`[${new Date().toISOString()}] GET /api/reservations`);
    try {
        const all = await Reservation.find()
            .sort({ datetime: 1 })
            .populate('client');
        res.json(all);
        console.log(` → Returned ${all.length}`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// POST new
router.post('/', authMiddleware, async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST /api/reservations by ${req.client._id}`);
    try {
        const { datetime, people } = req.body;
        const r = await Reservation.create({
            client: req.client._id,
            datetime,
            people
        });
        await r.populate('client');
        res.status(201).json(r);
        console.log(` → Created ${r._id}`);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

// GET own
router.get('/me', authMiddleware, async (req, res) => {
    console.log(`[${new Date().toISOString()}] GET /api/reservations/me for ${req.client._id}`);
    try {
        const my = await Reservation.find({ client: req.client._id })
            .sort({ datetime: 1 })
            .populate('client');
        res.json(my);
        console.log(` → Returned ${my.length}`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// PATCH cancel
router.patch('/:id/cancel', authMiddleware, async (req, res) => {
    console.log(`[${new Date().toISOString()}] PATCH /api/reservations/${req.params.id}/cancel by ${req.client._id}`);
    try {
        const r = await Reservation.findOne({
            _id: req.params.id,
            client: req.client._id
        });
        if (!r) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        r.state = 'canceled';
        await r.save();
        await r.populate('client');
        res.json(r);
        console.log(` → Canceled ${r._id}`);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

export default router;
