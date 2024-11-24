import { NextResponse } from 'next/server';
import { getAuthenticationParameters } from '@/lib/imagekit';

export async function GET() {
    try {
        const authParams = getAuthenticationParameters();
        return NextResponse.json(authParams);
    } catch (error) {
        console.error('ImageKit auth error:', error);
        return NextResponse.json(
            { error: 'Failed to generate authentication parameters' },
            { status: 500 }
        );
    }
}
