import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number | string | null | undefined): string {
  const value: number = typeof amount === 'number' ? amount : Number(amount ?? 0);
  return inrFormatter.format(Number.isFinite(value) ? value : 0);
}

export function generateOrderPrefix(tier: string) {
  const prefix = tier === 'MAJOR' ? 'MJR' : 'MIN';
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${randomStr}`;
}
