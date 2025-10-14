import {NextResponse} from 'next/server';
import {nanoid} from 'nanoid';
import {createClient} from "redis";

let redis: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
    if (!redis) {
        redis = createClient({
            url: process.env.REDIS_URL, // ✅ Thêm URL từ env
        });
        redis.on('error', (err) => console.error('Redis Client Error', err));
        await redis.connect();
    }
    return redis;
}


export async function POST(req: Request) {
    try {
        const {name, message, imageUrls} = await req.json();

        // Validate
        if (!message || !message || !imageUrls || imageUrls.length === 0) {
            return NextResponse.json(
                {error: 'Missing name - message or images'},
                {status: 400}
            );
        }

        // Tạo short ID cho link
        const shortId = nanoid(8);

        // Lưu vào KV
        const data = {
            name,
            message,
            imageUrls,
        };

        const client = await getRedisClient();
        await client.set(`gift:${shortId}`,
            data.toString(),
            {
                EX: 60 * 60 * 24 * 0.5, // Expire sau 2 ngày (optional)
            });

        // Tạo full link
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const link = `${baseUrl}/g/${shortId}`;

        return NextResponse.json({link, shortId});

    } catch (error) {
        console.error('Error creating link:', error);
        return NextResponse.json(
            {error: 'Failed to create link'},
            {status: 500}
        );
    }
}

// GET: Lấy thông tin từ shortId
export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const shortId = searchParams.get('id');

        if (!shortId) {
            return NextResponse.json(
                {error: 'Missing ID'},
                {status: 400}
            );
        }
        const client = await getRedisClient();
        const data = await client.get(`gift:${shortId}`);

        if (!data) {
            return NextResponse.json(
                {error: 'Gift not found'},
                {status: 404}
            );
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error('Error getting link:', error);
        return NextResponse.json(
            {error: 'Failed to get link'},
            {status: 500}
        );
    }
}