export {};

declare global {
  interface Expense {
    id: number;
    name: string;
    price: number;
    percentageMarkup: number;
    totalPrice: number;
  }
}
