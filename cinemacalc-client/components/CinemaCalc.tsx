"use client";

import { proximaSoft } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { fetchExpenses } from "@/store/expensesSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddExpenseModal from "./AddExpenseModal";
import { AnimatedNumber } from "./AnimatedNumber";
import { ExpensesTable } from "./ExpensesTable";
import { ExpenseTableSkeleton } from "./ExpenseTableSkeleton";

const CinemaCalc: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, status, error } = useSelector(
    (state: RootState) => state.expenses
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExpenses());
    }
  }, [status, dispatch]);

  const totalSum = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.totalPrice, 0),
    [expenses]
  );

  if (status === "loading" || status === "idle") {
    return <ExpenseTableSkeleton />;
  }

  if (status === "failed") {
    return (
      <div className="text-red-500 text-center py-4">
        <p>Error: {error}</p>
        <button
          onClick={() => dispatch(fetchExpenses())}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry again
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 w-full flex flex-col">
      {expenses.length > 0 ? (
        <>
          <div className="mb-5 flex justify-center items-center">
            <AddExpenseModal />
          </div>
          <ExpensesTable expenses={expenses} />
          <div className="mt-5 w-full text-center text-l">
            <strong>
              <span className={cn(proximaSoft.className, "font-extrabold")}>
                Σ Total Sum:{" "}
              </span>
              <AnimatedNumber
                value={totalSum}
                className="inline-flex items-center"
                springOptions={{
                  bounce: 0,
                  duration: 1000,
                }}
              />
              <span> €</span>
            </strong>
          </div>
        </>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center">
          <AddExpenseModal />
          <p
            className={cn(
              proximaSoft.className,
              "mt-10 font-semibold text-gray-600",
              "text-sm md:text-base lg:text-md xl:text-lg"
            )}
          >
            💰 No expenses found. Try adding some.
          </p>
        </div>
      )}
    </div>
  );
};

export default CinemaCalc;
