import dbConnect from "@/lib/mongodb";
import Seat from "@/models/Seat";
import Theatre from "@/models/Theatre";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await dbConnect();
      const theatres = await Theatre.find({}).populate('seats');
      return NextResponse.json(theatres);
    } catch (error) {
      console.error('Error in GET /api/theatres:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function POST(request) {
    try {
      await dbConnect();
      const body = await request.json();
      const { name, seats } = body;
  
      if (!name || !Array.isArray(seats)) {
        return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
      }

      const theatre = await Theatre.create({ name, total_seat: seats.length });

      if (seats && Array.isArray(seats)) {
        const createdSeats = await Seat.create(
          seats.map((seat) => ({
            ...seat,
            theatre: theatre._id,
          }))
        );

        theatre.seats = createdSeats.map((seat) => seat._id);
        await theatre.save();
      }

      return NextResponse.json({ success: true, data: theatre }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}