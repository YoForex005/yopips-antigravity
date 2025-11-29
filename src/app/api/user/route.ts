import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Mock User ID (In real app, get from session)
const MOCK_USER_ID = "user_1";

export async function GET() {
    const user = db.getUser(MOCK_USER_ID);
    return NextResponse.json(user);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { action, data } = body;

    let updatedUser;

    if (action === "KYC") {
        updatedUser = db.updateKYC(MOCK_USER_ID, data);
    } else if (action === "BANKING") {
        updatedUser = db.updateBanking(MOCK_USER_ID, data);
    } else if (action === "DEPOSIT") {
        updatedUser = db.deposit(MOCK_USER_ID, data.amount);
    } else if (action === "WITHDRAW") {
        updatedUser = db.withdraw(MOCK_USER_ID, data.amount);
    } else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(updatedUser);
}
