
import mongoose from 'mongoose';
import ShowTime from './ShowTime';
import Seat from './Seat';

const TicketSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ShowTime,
      required: true,
    },
    seats: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: Seat,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
});
  
export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
