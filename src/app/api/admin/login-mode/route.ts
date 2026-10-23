import { NextResponse } from 'next/server';
import { getAdminUsers } from '@/lib/rbac';

// Lightweight endpoint so the login page knows if multi-user mode is active
export async function GET() {
  const users = getAdminUsers();
  return NextResponse.json({ multiUser: users.length > 0 });
}
