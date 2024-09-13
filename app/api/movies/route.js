import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Movie from "@/models/Movie";

export async function GET() {
  try {
    await dbConnect();  
    const movies = await Movie.find({});
    return NextResponse.json(movies);
  } catch (error) {
    console.error('Error in GET /api/movies:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
    try {
      await dbConnect();
      const body = await request.json();
      const newMovie = await Movie.create(body);

      return NextResponse.json(newMovie, { status: 201 });
    } catch (error) {
      console.error('Error in POST /api/movies:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
}