import express from 'express';
import Reservation from '../models/Reservation.js';
import { authMiddleware } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminOnly.js';

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
        const dt = new Date(datetime);
        if (isNaN(dt.getTime())) throw new Error('Fecha inválida');
        const h = dt.getHours();
        const m = dt.getMinutes();
        // Validar slot de 30 min
        if (!(m === 0 || m === 30)) {
            return res.status(400).json({ error: 'Solo puedes reservar en intervalos de 30 minutos (ej: 12:00, 12:30, ...)' });
        }
        // Validar rango horario
        const isLunch = h >= 12 && h < 16;
        const isDinner = h >= 19 && h < 24;
        if (!isLunch && !isDinner) {
            return res.status(400).json({ error: 'Solo puedes reservar de 12:00–16:00 o 19:00–00:00' });
        }
        // Capacidad máxima por slot
        const slotStart = new Date(dt);
        slotStart.setSeconds(0, 0);
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotStart.getMinutes() + 29, 59, 999);
        const activeReservations = await Reservation.find({
            datetime: { $gte: slotStart, $lte: slotEnd },
            state: 'active'
        });
        const totalPeople = activeReservations.reduce((sum, r) => sum + (r.people || 0), 0);
        if (totalPeople + Number(people) > 30) {
            return res.status(400).json({ error: 'No hay disponibilidad en ese horario. Elige otro slot.' });
        }
        // Crear reserva
        const r = await Reservation.create({
            client: req.client._id,
            datetime: dt,
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

// GET ocupación de slots por rango de fechas (solo admin)
router.get('/slots', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { from, to } = req.query;
        if (!from || !to) return res.status(400).json({ error: 'Faltan parámetros from y to' });
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const reservations = await Reservation.find({
            datetime: { $gte: fromDate, $lte: toDate },
            state: 'active'
        });
        // Agrupar por slot de 30 min
        const slotMap = {};
        reservations.forEach(r => {
            const dt = new Date(r.datetime);
            dt.setSeconds(0, 0);
            const slotKey = dt.toISOString();
            slotMap[slotKey] = (slotMap[slotKey] || 0) + (r.people || 0);
        });
        res.json(slotMap);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
