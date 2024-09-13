import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Theatre from '@/models/Theatre';

export async function GET(request, { params }) {
    try {
      await dbConnect();
      const { id } = params;
  
      const theatre = await Theatre.findById(id);
  
      if (!theatre) {
        return NextResponse.json({ message: 'Theatre not found' }, { status: 404 });
      }
  
      return NextResponse.json(theatre);
    } catch (error) {
      console.error('Error in GET /api/theatres/[id]:', error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const theatre = await Theatre.findByIdAndDelete(id);

    if (!theatre) {
      return NextResponse.json({ message: 'Theatre not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Theatre and associated seats deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/theatres/[id]:', error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}