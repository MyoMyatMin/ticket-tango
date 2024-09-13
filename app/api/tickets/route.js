import dbConnect from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();  
        const tickets = await Ticket.find({}).populate([ 
            { path: 'seat', select: 'name type'}, 
            { path : 'showtime', select: '-seats -price', populate: [
                { path: 'theatre', select: 'name'},
                { path: 'movie', select: 'title duration'}
            ]}
        ]);
        return NextResponse.json(tickets);
    } catch (error) {
        console.error('Error in GET /api/tickets:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }