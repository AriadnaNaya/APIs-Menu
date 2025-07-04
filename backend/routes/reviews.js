// APIs/backend/routes/reviews.js
import express from 'express';
import Review from '../models/Review.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/reviews
router.get('/', async (req, res) => {
    console.log(`[${new Date().toISOString()}] GET /api/reviews`);
    try {
        const reviews = await Review.find().sort({ date: -1 }).populate('client');
        res.json(reviews);
        console.log(`[${new Date().toISOString()}]  → 200 Returned ${reviews.length} reviews`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] 500 /api/reviews ERROR:`, err);
        res.status(500).json({ error: err.message });
    }
});

// POST /api/reviews
router.post('/', authMiddleware, async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST /api/reviews client=${req.client._id}`);
    try {
        const { rating, comment } = req.body;
        const rev = await Review.create({
            client: req.client._id,
            rating,
            comment
        });
        await rev.populate('client');
        res.status(201).json(rev);
        console.log(`[${new Date().toISOString()}]  → 201 Created review=${rev._id}`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] 400 /api/reviews ERROR:`, err);
        res.status(400).json({ error: err.message });
    }
});

// GET /api/reviews/me
router.get('/me', authMiddleware, async (req, res) => {
    console.log(`[${new Date().toISOString()}] GET /api/reviews/me client=${req.client._id}`);
    try {
        const my = await Review.find({ client: req.client._id })
            .sort({ date: -1 })
            .populate('client');
        res.json(my);
        console.log(`[${new Date().toISOString()}]  → 200 Returned ${my.length} personal reviews`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] 500 /api/reviews/me ERROR:`, err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
