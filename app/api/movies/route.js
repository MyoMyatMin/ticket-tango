import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Movie from "@/models/Movie";
import { v2 as cloudinary } from "cloudinary";
import ShowTime from "@/models/ShowTime";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    await dbConnect();
    const movies = await Movie.find({});
    // const moviesWithShowtimes = await Promise.all(
    //   movies.map(async (movie) => {
    //     const showtimes = await ShowTime.find({ movie: movie._id }).populate(
    //       "theatre seats"
    //     );

    //     return {
    //       ...movie.toObject(),
    //       showtimes,
    //     };
    //   })
    // );

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error in GET /api/movies:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    let posterUrl = body.posterUrl;
    if (posterUrl) {
      const result = await cloudinary.uploader.upload(posterUrl, {
        folder: "movies",
      });

      posterUrl = result.secure_url;
    }

    const newMovie = await Movie.create({
      ...body,
      posterUrl: posterUrl,
    });

    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/movies:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
