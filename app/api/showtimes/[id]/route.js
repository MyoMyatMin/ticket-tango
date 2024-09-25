import dbConnect from "@/lib/mongodb";
import Seat from "@/models/Seat";
import ShowTime from "@/models/ShowTime";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const showtime = await ShowTime.findById(id).populate([
      "seats",
      "theatre",
      "movie",
    ]);

    if (!showtime) {
      return NextResponse.json(
        { message: "ShowTime not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(showtime);
  } catch (error) {
    console.error("Error in GET /api/showtimes/[id]:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await dbConnect();
    const { id } = params;

    const showtime = await ShowTime.findById(id);

    if (!showtime) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "ShowTime not found" },
        { status: 404 }
      );
    }

    await Seat.deleteMany({ _id: { $in: showtime.seats } }).session(session);

    await ShowTime.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    session.endSession();
    return NextResponse.json({
      message: "Showtime and associated seats deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in DELETE /api/showtimes/[id]:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
