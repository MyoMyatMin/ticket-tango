import dbConnect from "@/lib/mongodb";
import Movie from "@/models/Movie";
import Seat from "@/models/Seat";
import ShowTime from "@/models/ShowTime";
import Theatre from "@/models/Theatre";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await dbConnect();
    const showtimes = await ShowTime.find({}).populate(['seats', 'theatre', 'movie']);
    return NextResponse.json(showtimes)
  } catch (error) {
    console.error('Error in GET /api/showtimes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await dbConnect();
    const body = await request.json();

    const { theatre, movie, startTime, endTime, date, price } = body;

    const theatreExists = await Theatre.findById(theatre);
    if (!theatreExists) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Invalid theatre ID' });
    }

    const movieExists = await Movie.findById(movie);
    if (!movieExists) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const seats = [];
    const seatTypes = ['Standard', 'Premium', 'VIP'];

    seatTypes.forEach(type => {
        const seatCount = theatreExists.numberOfSeats[type];
        for (let i = 0; i < seatCount; i++) {
            seats.push(new Seat({
                name: `${type} Seat ${i + 1}`,
                type,
                isAvailable: true
            }));
        }
    });

    const savedSeats = await Seat.insertMany(seats, { session });

    const seatIds = savedSeats.map(seat => seat._id);

    const showtime = new ShowTime({
      startTime,
      endTime,
      date,
      price,
      theatre,
      movie,
      seats: seatIds
    });

    await showtime.save({ session });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(showtime , { status: 201 });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}