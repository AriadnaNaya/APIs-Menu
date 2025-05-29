import express from 'express';
import Review from '../models/Review.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 }).populate('client');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/reviews (solo auth)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const rev = await Review.create({
            client: req.client._id,
            rating,
            comment
        });
        await rev.populate('client');
        res.status(201).json(rev);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
