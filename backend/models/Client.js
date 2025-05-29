import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const clientSchema = new mongoose.Schema({
    name:     { type: String, required: true },
    contact:  { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar:   { type: String, default: '' }               // ← nueva propiedad
});

// Hashear contraseña
clientSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
clientSchema.methods.comparePassword = function(candidate) {
    return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('Client', clientSchema);
