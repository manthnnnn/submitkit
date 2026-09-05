import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    if (!password || password !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const response = NextResponse.json({ success: true });
    
    // Set secure, HttpOnly cookie to prevent XSS
    response.cookies.set('admin_token', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400, // 24 hours
    });
    
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
