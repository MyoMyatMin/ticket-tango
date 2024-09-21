import dbConnect from "@/lib/mongodb";
import Movie from "@/models/Movie";
import Seat from "@/models/Seat";
import ShowTime from "@/models/ShowTime";
import Ticket from "@/models/Ticket";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await dbConnect();
      const movies = await Movie.find({});
      const moviesWithShowtimes = await Promise.all(
        movies
        .filter(movie => movie.isOngoing)
        .map(async (movie) => {
          const showtimes = await ShowTime.find({ movie: movie._id }).populate(
            "theatre seats"
          );
  
          return {
            ...movie.toObject(),
            showtimes,
          };
        })
      );
  
      return NextResponse.json(moviesWithShowtimes);
    } catch (error) {
      console.error("Error in GET /api/movies:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

export async function POST(request) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await dbConnect();

        const body = await request.json();

        const { seat, username, price } = body;

        const updatedSeat = await Seat.findByIdAndUpdate(seat, { isAvailable: false }, { new: true }, { session });
    
        if (!updatedSeat) {
            await session.abortTransaction();
            session.endSession();
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        const result = await Seat.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(seat) 
                }
            },
            {
                $lookup: {
                    from: 'showtimes',
                    localField: '_id', 
                    foreignField: 'seats', 
                    as: 'showtimeDetails'
                }
            },
            {
                $project: {
                    _id: 1,
                    showtimeId: '$showtimeDetails._id'
                }
            },
        ]);

        const showtime = result.length > 0 ? result[0].showtimeId : null;

        const ticket = new Ticket({
            username, 
            seat,
            showtime,
            price,
        })

        await ticket.save({ session });

        await session.commitTransaction();
        session.endSession();

        return NextResponse.json(ticket);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error in PUT /api/booking', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }