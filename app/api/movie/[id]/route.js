import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Movie from '@/models/Movie';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const movie = await Movie.findById(params.id);
    if (!movie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Error in GET /api/movies/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    const updatedMovie = await Movie.findByIdAndUpdate(params.id, body, { new: true });

    if (!updatedMovie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json(updatedMovie);
  } catch (error) {
    console.error('Error in PUT /api/movies/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const deletedMovie = await Movie.findByIdAndDelete(params.id);

    if (!deletedMovie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/movies/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}