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

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const movie = await Movie.findById(params.id);

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    // Fetch the showtimes for the specific movie
    const showtimes = await ShowTime.find({ movie: movie._id }).populate(
      "theatre seats"
    );

    return NextResponse.json({
      ...movie.toObject(),
      showtimes,
    });
  } catch (error) {
    console.error("Error in GET /api/movies/[id]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();

    if (body.posterUrl) {
      const existingMovie = await Movie.findById(params.id);
      if (!existingMovie) {
        return NextResponse.json({ error: "Movie not found" }, { status: 404 });
      }

      if (existingMovie.posterUrl) {
        const publicId = existingMovie.posterUrl
          .match(/[^/]*$/)[0]
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadResponse = await cloudinary.uploader.upload(body.posterUrl, {
        folder: "movies",
      });

      body.posterUrl = uploadResponse.secure_url;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedMovie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(updatedMovie);
  } catch (error) {
    console.error("Error in PUT /api/movies/[id]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
