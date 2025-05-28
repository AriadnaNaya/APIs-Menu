// backend/models/MenuItem.js
import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const menuItemSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    description: { type: String },
    price:       { type: Number, required: true },
    image:       { type: String },
    category:    { type: String, required: true },
    subCategory: { type: String },
    variants:    [variantSchema]
});

export default mongoose.model('MenuItem', menuItemSchema);
