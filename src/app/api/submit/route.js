import { NextResponse } from 'next/server';

export async function POST(req) {
    const data = await req.json();

    return NextResponse.json({ message: 'Form submitted successfully!' }, { status: 200 });
}

export async function GET() {
    return NextResponse.status(405).end();
}