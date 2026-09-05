import Razorpay from 'razorpay';
import crypto, { timingSafeEqual } from 'crypto';

export const getRazorpay = () => {
  const key_id = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '').trim();
  const key_secret = (process.env.RAZORPAY_KEY_SECRET || '').trim();
  return new Razorpay({ key_id, key_secret });
};

export const razorpay = {
  get orders() {
    return getRazorpay().orders;
  },
  get payments() {
    return getRazorpay().payments;
  }
};

export const verifySignature = (
  orderId: string, 
  paymentId: string, 
  signature: string
): boolean => {
  const secret = (process.env.RAZORPAY_KEY_SECRET || '').trim();
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body.toString())
    .digest('hex');
    
  return timingSafeEqual(Buffer.from(expectedSignature, 'hex'), Buffer.from(signature, 'hex'));
};

export const verifyWebhookSignature = (
  rawBody: string,
  signature: string
): boolean => {
  const secret = (process.env.RAZORPAY_WEBHOOK_SECRET || '').trim();
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
    
  return timingSafeEqual(Buffer.from(expectedSignature, 'hex'), Buffer.from(signature, 'hex'));
};
