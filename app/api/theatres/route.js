import dbConnect from "@/lib/mongodb";
import ShowTime from "@/models/ShowTime";
import Theatre from "@/models/Theatre";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const theatres = await Theatre.find({});

    const theatresWithShowtimes = await Promise.all(
      theatres.map(async (theatre) => {
        const showtimes = await ShowTime.find({ theatre: theatre._id }).select('_id');
        theatre = theatre.toObject();
        theatre.showtimes = showtimes; // Add showtimes to each theatre
        return theatre; // Return the updated theatre
      })
    );


    return NextResponse.json(theatresWithShowtimes);
  } catch (error) {
    console.error("Error in GET /api/theatres:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newTheatre = await Theatre.create(body);

    return NextResponse.json(newTheatre, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/theatres:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
