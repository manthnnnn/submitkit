import crypto from 'crypto';

const AUTH_SECRET = process.env.RAZORPAY_KEY_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || 'submitkit-blueprint-auth-secret-key-9814';

export interface OtpChallenge {
  email: string;
  topicId: string;
  expiry: number;
  token: string;
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  if (local.length <= 2) return `${local[0]}*@${domain}`;
  const first = local[0];
  const last = local[local.length - 1];
  return `${first}${'*'.repeat(Math.min(local.length - 2, 4))}${last}@${domain}`;
}

/**
 * Creates a cryptographically signed OTP challenge.
 * Returns the 6-digit code (to be emailed) and the signed challenge string.
 */
export function createOtpChallenge(email: string, topicId: string): { code: string; challenge: string; expiry: number } {
  const cleanEmail = email.trim().toLowerCase();
  const cleanTopicId = topicId.trim();
  // 6-digit random code
  const code = crypto.randomInt(100000, 999999).toString();
  // Valid for 10 minutes
  const expiry = Date.now() + 10 * 60 * 1000;

  const hmac = crypto.createHmac('sha256', AUTH_SECRET)
    .update(`${cleanEmail}|${cleanTopicId}|${code}|${expiry}`)
    .digest('hex');

  const payload: OtpChallenge = {
    email: cleanEmail,
    topicId: cleanTopicId,
    expiry,
    token: hmac,
  };

  const challenge = Buffer.from(JSON.stringify(payload)).toString('base64');
  return { code, challenge, expiry };
}

/**
 * Verifies a submitted 6-digit code against the signed challenge.
 */
export function verifyOtpChallenge(code: string, challenge: string): { valid: boolean; email?: string; topicId?: string; error?: string } {
  try {
    const raw = Buffer.from(challenge, 'base64').toString('utf-8');
    const data: OtpChallenge = JSON.parse(raw);

    if (!data.email || !data.topicId || !data.expiry || !data.token) {
      return { valid: false, error: 'Invalid verification session. Please request a new code.' };
    }

    if (Date.now() > data.expiry) {
      return { valid: false, error: 'Code has expired. Please request a new one.' };
    }

    const expectedHmac = crypto.createHmac('sha256', AUTH_SECRET)
      .update(`${data.email}|${data.topicId}|${code.trim()}|${data.expiry}`)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(Buffer.from(expectedHmac, 'hex'), Buffer.from(data.token, 'hex'));
    if (!isValid) {
      return { valid: false, error: 'Incorrect 6-digit code. Please check your email.' };
    }

    return { valid: true, email: data.email, topicId: data.topicId };
  } catch {
    return { valid: false, error: 'Verification failed. Please try again.' };
  }
}

/**
 * Creates a signed device access token valid for 90 days.
 */
export function createAccessToken(email: string, topicId: string): string {
  const cleanEmail = email.trim().toLowerCase();
  const cleanTopicId = topicId.trim();
  const expiry = Date.now() + 90 * 24 * 60 * 60 * 1000; // 90 days

  const signature = crypto.createHmac('sha256', AUTH_SECRET)
    .update(`${cleanEmail}|${cleanTopicId}|${expiry}`)
    .digest('hex');

  return Buffer.from(JSON.stringify({ email: cleanEmail, topicId: cleanTopicId, expiry, sig: signature })).toString('base64');
}

/**
 * Verifies a device access token.
 */
export function verifyAccessToken(tokenStr: string, expectedTopicId?: string): { valid: boolean; email?: string; topicId?: string } {
  try {
    const raw = Buffer.from(tokenStr, 'base64').toString('utf-8');
    const data = JSON.parse(raw);

    if (!data.email || !data.topicId || !data.expiry || !data.sig) {
      return { valid: false };
    }

    if (Date.now() > data.expiry) {
      return { valid: false };
    }

    if (expectedTopicId && data.topicId !== expectedTopicId) {
      return { valid: false };
    }

    const expectedSig = crypto.createHmac('sha256', AUTH_SECRET)
      .update(`${data.email}|${data.topicId}|${data.expiry}`)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(Buffer.from(expectedSig, 'hex'), Buffer.from(data.sig, 'hex'));
    if (!isValid) return { valid: false };

    return { valid: true, email: data.email, topicId: data.topicId };
  } catch {
    return { valid: false };
  }
}
