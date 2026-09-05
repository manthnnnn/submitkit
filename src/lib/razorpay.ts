import Razorpay from 'razorpay';
import crypto, { timingSafeEqual } from 'crypto';

export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret'
});

export const verifySignature = (
  orderId: string, 
  paymentId: string, 
  signature: string
): boolean => {
  const secret = process.env.RAZORPAY_KEY_SECRET || '';
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
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
    
  return timingSafeEqual(Buffer.from(expectedSignature, 'hex'), Buffer.from(signature, 'hex'));
};
