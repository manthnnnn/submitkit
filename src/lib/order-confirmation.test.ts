import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getOrderConfirmationState } from './order-confirmation';

test('only a PAID order is treated as confirmed', () => {
  assert.equal(getOrderConfirmationState('PAID'), 'PAID');
  assert.equal(getOrderConfirmationState('PENDING'), 'PENDING');
  assert.equal(getOrderConfirmationState('CANCELLED'), 'NOT_PAID');
  assert.equal(getOrderConfirmationState(null), 'NOT_PAID');
});