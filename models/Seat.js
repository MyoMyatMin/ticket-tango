
import mongoose from 'mongoose';

const SeatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Standard', 'Premium', 'VIP'], 
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    }
});

export default mongoose.models.Seat || mongoose.model('Seat', SeatSchema);