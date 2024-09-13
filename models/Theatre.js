
import mongoose from 'mongoose';

const TheatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    numberOfSeats: {
        Standard: { type: Number, required: true }, 
        Premium: { type: Number, required: true }, 
        VIP: { type: Number, required: true }
    }
});

export default mongoose.models.Theatre || mongoose.model('Theatre', TheatreSchema);