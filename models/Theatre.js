
import mongoose from 'mongoose';

const TheatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    total_seat: {
        type: Number,
        required: true,
    },
    seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }]
});

export default mongoose.models.Theatre || mongoose.model('Theatre', TheatreSchema);