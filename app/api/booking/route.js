import dbConnect from "@/lib/mongodb";
import Seat from "@/models/Seat";
import Ticket from "@/models/Ticket";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

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