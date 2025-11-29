import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const MOCK_USER_ID = "user_1";

export async function GET() {
    const assets = db.getAssets();
    const investments = db.getInvestments(MOCK_USER_ID);
    return NextResponse.json({ assets, investments });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { assetId, amount } = body;

        const investment = db.invest(MOCK_USER_ID, assetId, Number(amount));
        return NextResponse.json(investment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
