
import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    showtimeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Showtime',
      required: true,
    },
    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seat',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
});
  
export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
