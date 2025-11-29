import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    // Mock Authentication Logic
    // In a real app, validate against DB
    if (email && password) {
        return NextResponse.json({
            success: true,
            token: "mock_session_token_12345",
            user: {
                name: "Institutional Client",
                role: "investor"
            }
        });
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
