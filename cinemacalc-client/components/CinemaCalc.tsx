"use client";

import { proximaSoft } from "@/app/fonts";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseListSkeleton } from "@/components/ExpenseListSkeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchExpenses } from "@/state/expensesSlice";
import { AppDispatch, RootState } from "@/state/store";
import { RefreshCcw } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddExpenseModal from "./AddExpenseModal";
import { AnimatedNumber } from "./AnimatedNumber";

const CinemaCalc: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, status } = useSelector(
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
    return <ExpenseListSkeleton />;
  }

  if (status === "failed") {
    return (
      <div className="text-red-500 text-center py-4 flex flex-col justify-center items-center">
        <p>Something went wrong :/</p>
        <Button
          onClick={() => dispatch(fetchExpenses())}
          className="mt-2 px-4 py-2 text-white rounded bg-[#1D4E89] hover:bg-[#1a4376] flex items-center justify-center"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          <span>Retry again</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-2 w-full flex flex-col">
      {expenses.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
            <AddExpenseModal />
          </div>
          <ExpenseList expenses={expenses} dispatch={dispatch} />
          <div className="mt-5 w-full text-center text-lg">
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
