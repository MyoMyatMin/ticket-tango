import dbConnect from "@/lib/mongodb";
import Movie from "@/models/Movie";
import ShowTime from "@/models/ShowTime";
import { NextResponse } from "next/server";



export async function GET(request, { params }) {
    try {
      await dbConnect();
      const movie = await Movie.findById(params.id);
  
      if (!movie || !movie.isOngoing) {
        return NextResponse.json({ error: "Movie not found" }, { status: 404 });
      }
  
      const showtimes = await ShowTime.find({ movie: movie._id }).populate(
        "theatre seats"
      );
  
      return NextResponse.json({
        ...movie.toObject(),
        showtimes,
      });
    } catch (error) {
      console.error("Error in GET /api/booking/[id]:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }