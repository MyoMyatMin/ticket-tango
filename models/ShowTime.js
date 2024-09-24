import mongoose from 'mongoose';
import Theatre from './Theatre';
import Movie from './Movie';
import Seat from './Seat';

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
        standard: { type: Number, required: true }, 
        premium: { type: Number, required: true }, 
        vip: { type: Number, required: true }
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Theatre,
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Movie,
        required: true,
    },
    seats: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: Seat,
        required: true,
    }
});

ShowTimeSchema.index({ startTime: 1, date: 1, theatre: 1, movie: 1}, { unique: true} )

export default mongoose.models.ShowTime || mongoose.model('ShowTime', ShowTimeSchema);