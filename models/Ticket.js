
import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShowTime',
      required: true,
    },
    seat: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Seat',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
});
  
export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
