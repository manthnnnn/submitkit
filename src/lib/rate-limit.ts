/**
 * Simple in-memory IP-based rate limiter for API routes.
 * For production at scale, switch to Redis (Upstash) or Vercel's rate-limit.
 * This is sufficient for SubmitKit's current traffic levels.
 */

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  /** Max requests allowed in the window */
  maxRequests: number;
  /** Time window in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // seconds until reset
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowSeconds: 60 }
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    // First request or window expired — reset
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + config.windowSeconds * 1000,
    });
    return { allowed: true, remaining: config.maxRequests - 1, resetIn: config.windowSeconds };
  }

  entry.count++;

  if (entry.count > config.maxRequests) {
    const resetIn = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  };
}

/**
 * Extract client IP from request headers (works behind Vercel/Cloudflare proxies).
 */
export function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

/**
 * Simple origin-based CSRF check for mutation routes.
 * Verifies the request's Origin or Referer header matches the app's domain.
 */
export function checkOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const appUrl = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '');

  // In development, allow all
  if (process.env.NODE_ENV !== 'production') return true;

  // Must have at least one header
  if (!origin && !referer) return false;

  // Razorpay webhooks won't have matching origin — skip for webhook routes
  // (They are verified by HMAC signature instead)

  if (origin) {
    return origin === appUrl || origin === 'https://api.razorpay.com';
  }

  if (referer) {
    try {
      const refUrl = new URL(referer);
      const appUrlObj = new URL(appUrl || 'https://submitkit.in');
      return refUrl.hostname === appUrlObj.hostname;
    } catch {
      return false;
    }
  }

  return false;
}
