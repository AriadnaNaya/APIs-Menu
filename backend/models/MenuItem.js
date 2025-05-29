import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
    name:    { type: String, required: true },
    price:   { type: Number, required: true }
});

const menuItemSchema = new mongoose.Schema({
    name:         { type: String, required: true },
    description:  { type: String },
    price:        { type: Number, required: true },
    image:        { type: String },
    category:     { type: String, required: true }, // tu sub-categoría original
    mainCategory: {
        type: String,
        required: true,
        enum: ['sushi-rolls','comida','bebidas','postres']
    },
    variants:     [variantSchema]
});

export default mongoose.model('MenuItem', menuItemSchema);
