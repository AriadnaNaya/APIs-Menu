import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    client:  { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    rating:  { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date:    { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);
