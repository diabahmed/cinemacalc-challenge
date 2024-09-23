import * as api from "@/lib/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpensesState {
  expenses: Expense[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ExpensesState = {
  expenses: [],
  status: "idle",
  error: null,
};

export const fetchExpenses = createAsyncThunk<
  Expense[],
  void,
  {
    rejectValue: string;
  }
>("expenses/fetchExpenses", async (_, { rejectWithValue }) => {
  try {
    const response = await api.fetchExpenses();
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const addExpense = createAsyncThunk<
  Expense,
  Omit<Expense, "id" | "totalPrice">,
  {
    rejectValue: string;
  }
>("expenses/addExpense", async (expense, { rejectWithValue }) => {
  try {
    const response = await api.addExpense(expense);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateExpense = createAsyncThunk<
  Expense,
  Expense,
  {
    rejectValue: string;
  }
>("expenses/updateExpense", async (expense: Expense, { rejectWithValue }) => {
  try {
    const response = await api.updateExpense(expense);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateExpenses = createAsyncThunk<
  Expense[],
  Expense[],
  {
    rejectValue: string;
  }
>("expenses/updateExpenses", async (expenses, { rejectWithValue }) => {
  try {
    const updatedExpenses = await Promise.all(
      expenses.map((expense) => api.updateExpense(expense))
    );
    return updatedExpenses;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteExpense = createAsyncThunk<
  number,
  number,
  {
    rejectValue: string;
  }
>("expenses/deleteExpense", async (id: number, { rejectWithValue }) => {
  try {
    await api.deleteExpense(id);
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchExpenses.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.status = "succeeded";
          state.expenses = action.payload;
        }
      )
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch expenses";
      })
      .addCase(
        addExpense.fulfilled,
        (state, action: PayloadAction<Expense>) => {
          state.expenses.push(action.payload);
        }
      )
      .addCase(
        updateExpense.fulfilled,
        (state, action: PayloadAction<Expense>) => {
          const index = state.expenses.findIndex(
            (expense) => expense.id === action.payload.id
          );
          if (index !== -1) {
            state.expenses[index] = action.payload;
          }
        }
      )
      .addCase(
        updateExpenses.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.expenses = action.payload;
        }
      )
      .addCase(
        deleteExpense.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.expenses = state.expenses.filter(
            (expense) => expense.id !== action.payload
          );
        }
      );
  },
});

export default expensesSlice.reducer;
