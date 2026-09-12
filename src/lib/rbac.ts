export type AdminRole = 'SUPER_ADMIN' | 'OPS_ADMIN' | 'CONTENT_ADMIN' | 'READONLY';

export type AdminPermission =
  | 'orders:view'
  | 'orders:modify'
  | 'projects:view'
  | 'projects:create'
  | 'projects:edit'
  | 'projects:delete'
  | 'blueprints:view'
  | 'blueprints:edit'
  | 'preorders:view'
  | 'preorders:broadcast'
  | 'analytics:view'
  | 'audit:view'
  | 'settings:manage';

export interface AdminSession {
  email: string;
  role: AdminRole;
  displayName?: string;
  issuedAt: number;
}

const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  SUPER_ADMIN: [
    'orders:view',
    'orders:modify',
    'projects:view',
    'projects:create',
    'projects:edit',
    'projects:delete',
    'blueprints:view',
    'blueprints:edit',
    'preorders:view',
    'preorders:broadcast',
    'analytics:view',
    'audit:view',
    'settings:manage',
  ],
  OPS_ADMIN: [
    'orders:view',
    'orders:modify',
    'preorders:view',
    'preorders:broadcast',
    'projects:view',
    'blueprints:view',
    'analytics:view',
    'audit:view',
  ],
  CONTENT_ADMIN: [
    'projects:view',
    'projects:create',
    'projects:edit',
    'blueprints:view',
    'blueprints:edit',
    'preorders:view',
    'analytics:view',
  ],
  READONLY: [
    'orders:view',
    'projects:view',
    'blueprints:view',
    'preorders:view',
    'analytics:view',
    'audit:view',
  ],
};

export function hasPermission(role: AdminRole, permission: AdminPermission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function getRoleBadgeConfig(role: AdminRole): { label: string; bg: string; text: string; border: string } {
  switch (role) {
    case 'SUPER_ADMIN':
      return { label: 'Super Admin', bg: 'rgba(239,68,68,0.12)', text: '#f87171', border: 'rgba(239,68,68,0.25)' };
    case 'OPS_ADMIN':
      return { label: 'Ops Admin', bg: 'rgba(245,158,11,0.12)', text: '#fbbf24', border: 'rgba(245,158,11,0.25)' };
    case 'CONTENT_ADMIN':
      return { label: 'Content Admin', bg: 'rgba(99,102,241,0.12)', text: '#818cf8', border: 'rgba(99,102,241,0.25)' };
    case 'READONLY':
    default:
      return { label: 'Viewer', bg: 'rgba(161,161,170,0.12)', text: '#a1a1aa', border: 'rgba(161,161,170,0.25)' };
  }
}

// Edge-compatible HMAC token parsing / verification
export async function parseAdminSession(cookieValue?: string | null): Promise<AdminSession | null> {
  if (!cookieValue) return null;
  const secret = process.env.ADMIN_SECRET_KEY || '';
  if (!secret) return null;

  try {
    // Check if token has JSON payload prefix: v2.<base64payload>.<hmac>
    if (cookieValue.startsWith('v2.')) {
      const parts = cookieValue.split('.');
      if (parts.length !== 3) return null;

      const [, base64Payload, providedHmac] = parts;
      const encoder = new TextEncoder();
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );

      const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(base64Payload));
      const expectedHmac = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      if (expectedHmac !== providedHmac) return null;

      const jsonStr = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
      const parsed = JSON.parse(jsonStr) as AdminSession;
      return parsed;
    }

    // Legacy HMAC token format fallback (grants SUPER_ADMIN by default)
    const dotIndex = cookieValue.lastIndexOf('.');
    if (dotIndex !== -1) {
      const sessionToken = cookieValue.substring(0, dotIndex);
      const providedHmac = cookieValue.substring(dotIndex + 1);

      const encoder = new TextEncoder();
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(sessionToken));
      const expectedHmac = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      if (expectedHmac === providedHmac) {
        return {
          email: 'admin@submitkit.in',
          role: 'SUPER_ADMIN',
          displayName: 'Admin',
          issuedAt: Date.now(),
        };
      }
    } else if (cookieValue === secret) {
      return {
        email: 'admin@submitkit.in',
        role: 'SUPER_ADMIN',
        displayName: 'Admin',
        issuedAt: Date.now(),
      };
    }
  } catch {
    return null;
  }

  return null;
}

// Generate v2 token
export async function createAdminSessionToken(session: Omit<AdminSession, 'issuedAt'>): Promise<string> {
  const secret = process.env.ADMIN_SECRET_KEY || '';
  const payload: AdminSession = {
    ...session,
    issuedAt: Date.now(),
  };

  const jsonStr = JSON.stringify(payload);
  const base64Payload = btoa(jsonStr).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(base64Payload));
  const hmac = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return `v2.${base64Payload}.${hmac}`;
}
