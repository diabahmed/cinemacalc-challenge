import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useDebounce from "@/hooks/use-debounce";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface ExpenseListProps {
  expenses: Expense[];
  onUpdate: (expenses: Expense[]) => void;
  onDelete: (id: number) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onUpdate,
  onDelete,
}) => {
  const [items, setItems] = useState(expenses);

  useEffect(() => {
    setItems(expenses);
  }, [expenses]);

  const handleUpdate = useCallback(
    (updatedItems: Expense[]) => {
      if (JSON.stringify(updatedItems) !== JSON.stringify(expenses)) {
        onUpdate(updatedItems);
      }
    },
    [expenses, onUpdate]
  );

  useDebounce(items, 500, handleUpdate);

  const handleInputChange = useCallback(
    (id: number, field: keyof Expense, value: string | number) => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            const updatedItem = { ...item, [field]: value };

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
    []
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
                  <Info className="inline-block ml-1 w-3 h-3 text-gray-500 cursor-help" />
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
                    value={expense.name}
                    onChange={(e) =>
                      handleInputChange(expense.id, "name", e.target.value)
                    }
                    className="w-full border-gray-300"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={expense.price}
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
                    type="number"
                    value={expense.percentageMarkup}
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
