import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    // Mock Auth: Always user_1
    const userId = "user_1";
    const transactions = db.getTransactions(userId);
    return NextResponse.json(transactions);
}
