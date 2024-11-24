import { NextResponse } from 'next/server';
import { getAuthenticationParameters } from '@/lib/imagekit';

export async function GET() {
    try {
        if (!process.env.IMAGEKIT_PRIVATE_KEY) {
            throw new Error('ImageKit private key is not configured');
        }

        const authParams = getAuthenticationParameters();
        return NextResponse.json(authParams);
    } catch (error) {
        console.error('ImageKit auth error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate authentication parameters' },
            { status: 500 }
        );
    }
}
