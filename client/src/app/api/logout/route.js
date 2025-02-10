import { NextResponse } from 'next/server';

export async function POST(request) {
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set('tokenauth', '', { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 0 });
    return response;
}