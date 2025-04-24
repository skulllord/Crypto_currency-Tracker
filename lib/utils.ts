import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  // For values over 1 billion, show B
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  }

  // For values over 1 million, show M
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }

  // For values under 1, show more decimal places
  if (value < 1) {
    return `$${value.toFixed(6)}`
  }

  // For regular values
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value).toFixed(2)}M`
  }

  return value.toFixed(2)
}
