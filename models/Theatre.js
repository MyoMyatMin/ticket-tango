
import mongoose from 'mongoose';

const TheatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    numberOfSeats: {
        standard: { type: Number, required: true }, 
        premium: { type: Number, required: true }, 
        vip: { type: Number, required: true }
    }
});

export default mongoose.models.Theatre || mongoose.model('Theatre', TheatreSchema);