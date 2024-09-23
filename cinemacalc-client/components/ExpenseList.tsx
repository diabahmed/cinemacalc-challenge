import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useDebounce from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { deleteExpense, updateExpenses } from "@/state/expensesSlice";
import { AppDispatch } from "@/state/store";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface ExpenseListProps {
  expenses: Expense[];
  dispatch: AppDispatch;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  dispatch,
}) => {
  const { toast } = useToast();
  const [disabledButtons, setDisabledButtons] = useState<{
    [key: number]: boolean;
  }>({});
  const [items, setItems] = useState(expenses);

  useEffect(() => {
    setItems(expenses);
  }, [expenses]);

  const onUpdate = useCallback(
    (updatedExpenses: Expense[]) => {
      dispatch(updateExpenses(updatedExpenses));
    },
    [dispatch]
  );

  const handleUpdate = useCallback(
    (updatedItems: Expense[]) => {
      if (JSON.stringify(updatedItems) !== JSON.stringify(expenses)) {
        onUpdate(updatedItems);
      }
    },
    [expenses, onUpdate]
  );

  const onDelete = useCallback(
    (id: number) => {
      setDisabledButtons((prev) => ({ ...prev, [id]: true }));
      dispatch(deleteExpense(id))
        .unwrap()
        .then(() => {
          setDisabledButtons((prev) => ({ ...prev, [id]: false }));
        })
        .catch(() => {
          setDisabledButtons((prev) => ({ ...prev, [id]: false }));
          toast({
            title: "Error",
            description: "Failed to delete the expense. Try again.",
            variant: "destructive",
          });
        });
    },
    [dispatch, toast]
  );

  useDebounce(items, 500, handleUpdate);

  const handleInputChange = useCallback(
    (id: number, field: keyof Expense, value: string | number) => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            const updatedItem = { ...item };

            if (field === "name" && typeof value === "string") {
              if (value.trim() === "") {
                toast({
                  title: "Input Error",
                  description: "Name cannot be empty.",
                  variant: "destructive",
                });
                return item;
              }
              updatedItem.name = value;
            }

            if (field === "price" && typeof value === "number") {
              if (value <= 0) {
                toast({
                  title: "Input Error",
                  description: "Price must be positive.",
                  variant: "destructive",
                });
                return item;
              }
              updatedItem.price = value;
            }

            if (field === "percentageMarkup" && typeof value === "number") {
              if (value < 0) {
                toast({
                  title: "Input Error",
                  description: "Percentage markup must be positive",
                  variant: "destructive",
                });
                return item;
              } else if (value > 100) {
                toast({
                  title: "Input Error",
                  description: "Percentage markup cannot exceed 100%.",
                  variant: "destructive",
                });
                return item;
              }
              updatedItem.percentageMarkup = value;
            }

            if (field === "price" || field === "percentageMarkup") {
              updatedItem.totalPrice =
                updatedItem.price * (1 + updatedItem.percentageMarkup / 100);
            }

            return updatedItem;
          }
          return item;
        })
      );
    },
    [toast]
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="text-left p-2 font-semibold">Name</th>
            <th className="text-left p-2 font-semibold">Price</th>
            <th className="text-left p-2 font-semibold">Markup %</th>
            <th className="text-left p-2 font-semibold flex justify-start items-center">
              Total{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="inline-block ml-1 w-3 h-3 text-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Price + (Price * Markup %)</p>
                </TooltipContent>
              </Tooltip>
            </th>
            <th className="text-left p-2 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {items.map((expense) => (
              <motion.tr
                key={expense.id}
                className="border-b border-gray-200"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onDelete(expense.id);
                  }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <td className="p-2">
                  <Input
                    name="name"
                    autoComplete="on"
                    value={expense.name}
                    onChange={(e) =>
                      handleInputChange(expense.id, "name", e.target.value)
                    }
                    className="w-full min-w-24 border-gray-300"
                  />
                </td>
                <td className="p-2">
                  <Input
                    name="price"
                    type="number"
                    value={expense.price}
                    min={0.01}
                    step={0.01}
                    onChange={(e) =>
                      handleInputChange(
                        expense.id,
                        "price",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-24 border-gray-300"
                  />
                </td>
                <td className="p-2">
                  <Input
                    name="percentageMarkup"
                    type="number"
                    value={expense.percentageMarkup}
                    min={0}
                    max={100}
                    step={0.01}
                    onChange={(e) =>
                      handleInputChange(
                        expense.id,
                        "percentageMarkup",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-24 border-gray-300"
                  />
                </td>
                <td className="p-2">
                  <div className="w-24 text-center">
                    {expense.totalPrice.toFixed(2)} €
                  </div>
                </td>
                <td className="p-2">
                  <Button
                    disabled={disabledButtons[expense.id] || false}
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(expense.id)}
                    className="text-destructive border-none bg-transparent hover:bg-[#E2ECF9] hover:text-destructive p-2"
                  >
                    <Trash2 className="text-destructive w-4 h-4" />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};
