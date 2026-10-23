import { NextRequest, NextResponse } from 'next/server';
import { parseAdminSession, hasPermission } from '@/lib/rbac';

// GET — return all admin users (passwords masked)
export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(session.role, 'team:manage')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const raw = process.env.ADMIN_USERS || '[]';
  let users: Array<{ email: string; password: string; role: string; name: string }> = [];
  try { users = JSON.parse(raw); } catch { users = []; }

  // Mask passwords — return only first 2 + **** + last 1
  const masked = users.map(u => ({
    email: u.email,
    role: u.role,
    name: u.name,
    passwordHint: u.password.length > 4
      ? u.password.slice(0, 2) + '••••' + u.password.slice(-1)
      : '••••••',
  }));

  return NextResponse.json({ users: masked });
}

// PATCH — update a user's email or password
export async function PATCH(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(session.role, 'team:manage')) {
    return NextResponse.json({ error: 'Forbidden — only SUPER_ADMIN can edit credentials' }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.targetEmail) {
    return NextResponse.json({ error: 'targetEmail required' }, { status: 400 });
  }

  const raw = process.env.ADMIN_USERS || '[]';
  let users: Array<{ email: string; password: string; role: string; name: string }> = [];
  try { users = JSON.parse(raw); } catch {
    return NextResponse.json({ error: 'ADMIN_USERS env var is not set or invalid JSON' }, { status: 500 });
  }

  const idx = users.findIndex(u => u.email.toLowerCase() === body.targetEmail.toLowerCase());
  if (idx === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  if (body.newEmail) users[idx].email = body.newEmail.trim();
  if (body.newPassword) {
    if (body.newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }
    users[idx].password = body.newPassword;
  }
  if (body.newName) users[idx].name = body.newName.trim();

  const newJson = JSON.stringify(users);

  // Return the new JSON so the admin can copy it into Vercel env
  return NextResponse.json({
    success: true,
    message: 'Credentials updated in memory. Copy the ADMIN_USERS value below and update it in Vercel Environment Variables, then redeploy.',
    newAdminUsers: newJson,
    updatedUser: {
      email: users[idx].email,
      role: users[idx].role,
      name: users[idx].name,
    },
  });
}
