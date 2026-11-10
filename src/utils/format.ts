// Formats a number as South African rand, e.g. 45 -> "R45.00".
export function formatPrice(price: number): string {
  return `R${price.toFixed(2)}`;
}

// Creates a unique id for a new menu item.
export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
