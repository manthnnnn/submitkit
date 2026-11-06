export type OrderConfirmationState = 'PENDING' | 'PAID' | 'NOT_PAID';

export function getOrderConfirmationState(status: string | null | undefined): OrderConfirmationState {
  if (status === 'PAID') return 'PAID';
  if (status === 'PENDING') return 'PENDING';
  return 'NOT_PAID';
}