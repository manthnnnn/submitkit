import Razorpay from 'razorpay';
import crypto, { timingSafeEqual } from 'crypto';

export const getRazorpay = () => {
  const key_id     = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '').trim();
  const key_secret = (process.env.RAZORPAY_KEY_SECRET || '').trim();
  return new Razorpay({ key_id, key_secret });
};

export const razorpay = {
  get orders()   { return getRazorpay().orders; },
  get payments() { return getRazorpay().payments; },
};

/**
 * Safe constant-time comparison that handles buffer length mismatches.
 * crypto.timingSafeEqual throws if buffers differ in byte length.
 */
function safeEqual(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export const verifySignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  try {
    const secret = (process.env.RAZORPAY_KEY_SECRET || '').trim();
    const body = `${orderId}|${paymentId}`;
    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
    return safeEqual(
      Buffer.from(expected,   'hex'),
      Buffer.from(signature,  'hex')
    );
  } catch {
    return false;
  }
};

export const verifyWebhookSignature = (
  rawBody: string,
  signature: string
): boolean => {
  try {
    const secret = (process.env.RAZORPAY_WEBHOOK_SECRET || '').trim();
    if (!secret) {
      console.error('RAZORPAY_WEBHOOK_SECRET is not set');
      return false;
    }
    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    return safeEqual(
      Buffer.from(expected,  'hex'),
      Buffer.from(signature, 'hex')
    );
  } catch {
    return false;
  }
};
