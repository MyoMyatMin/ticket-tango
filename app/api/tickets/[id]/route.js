import dbConnect from "@/lib/mongodb";
import Movie from "@/models/Movie";
import Seat from "@/models/Seat";
import ShowTime from "@/models/ShowTime";
import Theatre from "@/models/Theatre";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const ticket = await Ticket.findById(id)
      .populate({ model: Seat, path: "seats", select: "name type" })
      .populate({
        model: ShowTime,
        path: "showtime",
        select: "-seats -price",
        populate: [
          { model: Theatre, path: "theatre", select: "name" },
          { model: Movie, path: "movie", select: "title duration" },
        ],
      });

    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("Error in GET /api/tickets:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
