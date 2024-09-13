import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Theatre from '@/models/Theatre';
import Seat from '@/models/Seat';

export async function GET(request, { params }) {
    try {
      await dbConnect();
      const { id } = params;
  
      const theatre = await Theatre.findById(id).populate('seats');
  
      if (!theatre) {
        return NextResponse.json({ success: false, message: 'Theatre not found' }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, data: theatre });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const theatre = await Theatre.findById(id);

    if (!theatre) {
      return NextResponse.json({ success: false, message: 'Theatre not found' }, { status: 404 });
    }

    await Seat.deleteMany({ theatre: id });

    await Theatre.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Theatre and associated seats deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}