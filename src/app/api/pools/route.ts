import { NextResponse } from 'next/server';
import { simulation } from '@/lib/simulation';

export async function GET() {
    // Trigger simulation update
    simulation.update();

    return NextResponse.json({
        pools: simulation.pools,
        depositEvents: simulation.depositEvents
    });
}
