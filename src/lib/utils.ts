import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num);
}

export function calculateMonthlyPayment(
  price: number,
  downPaymentPercent: number,
  termMonths: number,
  interestRate: number
): number {
  const downPayment = price * (downPaymentPercent / 100);
  const principal = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  
  if (monthlyRate === 0) {
    return principal / termMonths;
  }
  
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  return Math.round(monthlyPayment);
}

export function calculateTotalCost(
  price: number,
  downPaymentPercent: number,
  termMonths: number,
  interestRate: number
): number {
  const monthlyPayment = calculateMonthlyPayment(price, downPaymentPercent, termMonths, interestRate);
  const downPayment = price * (downPaymentPercent / 100);
  return downPayment + (monthlyPayment * termMonths);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}