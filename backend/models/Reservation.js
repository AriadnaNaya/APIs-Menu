import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    client:   { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    datetime: { type: Date, required: true },
    people:   { type: Number, required: true, min: 1 },
    createdAt:{ type: Date, default: Date.now }
});

export default mongoose.model('Reservation', reservationSchema);
