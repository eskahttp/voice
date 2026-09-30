import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/app/uploads';

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    const { filename } = await params;

    const safeName = path.basename(filename);
    const filePath = path.join(UPLOAD_DIR, safeName);

    try {
        const file = await fs.readFile(filePath);
        const ext = path.extname(safeName).toLowerCase();
        const mime =
            ext === '.png' ? 'image/png' :
                ext === '.webp' ? 'image/webp' :
                    ext === '.gif' ? 'image/gif' : 'image/jpeg';

        return new NextResponse(file, {
            headers: {
                'Content-Type': mime,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch {
        return new NextResponse('Not found', { status: 404 });
    }
}