import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateOrderPrefix(tier: string) {
  const prefix = tier === 'MAJOR' ? 'MJR' : 'MIN';
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${randomStr}`;
}
