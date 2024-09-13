
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
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true,
    },
});

export default mongoose.models.Seat || mongoose.model('Seat', SeatSchema);