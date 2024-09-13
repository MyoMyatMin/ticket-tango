import mongoose from 'mongoose';

const ShowTimeSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    price: {        
        Standard: { type: Number, required: true }, 
        Premium: { type: Number, required: true }, 
        VIP: { type: Number, required: true }
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    seats: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Seat',
        required: true,
    }
});

export default mongoose.models.ShowTime || mongoose.model('ShowTime', ShowTimeSchema);