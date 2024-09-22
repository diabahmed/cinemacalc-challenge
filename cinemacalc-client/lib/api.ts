"use server";

import { fetchWithRetry } from "@/lib/fetchWithRetry";

const API_URL = process.env.API_URL || "";

export async function fetchExpenses(): Promise<Expense[]> {
  const response = await fetchWithRetry(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
}

export async function addExpense(
  expense: Omit<Expense, "id" | "totalPrice">
): Promise<Expense> {
  const response = await fetchWithRetry(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to add expense");
  }
  return response.json();
}

export async function updateExpense(expense: Expense): Promise<Expense> {
  const response = await fetchWithRetry(`${API_URL}/${expense.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to update expense");
  }
  return response.json();
}

export async function deleteExpense(id: number): Promise<void> {
  const response = await fetchWithRetry(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
}
