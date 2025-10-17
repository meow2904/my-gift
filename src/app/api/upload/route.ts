import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files') as File[];
        if (files.length === 0) {
            return NextResponse.json(
                { error: 'No files uploaded' },
                { status: 400 }
            );
        }

        const urls: string[] = [];

        for (const file of files) {
            // Validate file
            if (!file || !file.name) {
                console.error('Invalid file:', file);
                continue;
            }
            // Convert File to Buffer for Vercel Blob
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const blob = await put(file.name, buffer, {
                access: 'public',
                contentType: file.type

            });
            urls.push(blob.url);
        }

        return NextResponse.json({ urls });

    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed', details: error.message },
            { status: 500 }
        );
    }
}