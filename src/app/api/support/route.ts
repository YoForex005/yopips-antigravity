import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const MOCK_USER_ID = "user_1";

export async function GET() {
    const tickets = db.getTickets(MOCK_USER_ID);
    return NextResponse.json(tickets);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { subject, message } = body;

    const ticket = db.createTicket(MOCK_USER_ID, subject, message);
    return NextResponse.json(ticket);
}
