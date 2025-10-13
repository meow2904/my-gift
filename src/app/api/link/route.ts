import { kv } from '@vercel/kv';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { message, imageUrls } = await req.json();

    const id = randomUUID();
    await kv.set(`gift:${id}`, { message, imageUrls });

    return NextResponse.json({
        id,
        link: `${process.env.NEXT_PUBLIC_BASE_URL}/gift/${id}`,
    });
}
