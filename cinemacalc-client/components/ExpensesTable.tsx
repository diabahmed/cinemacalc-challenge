import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { deleteExpense } from "@/store/expensesSlice";
import { AppDispatch } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

interface ExpensesTableProps {
  expenses: Expense[];
}

// eslint-disable-next-line react/display-name
export const ExpensesTable = React.memo(({ expenses }: ExpensesTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteExpense(id))
        .unwrap()
        .then(() => {})
        .catch((error: Error) => {
          toast({
            title: "Error",
            description: `Failed to delete the expense: ${error.message}`,
            variant: "destructive",
          });
        });
    },
    [dispatch, toast]
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Markup %</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {expenses.map((expense) => (
            <motion.tr
              key={expense.id}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleDelete(expense.id);
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TableCell>{expense.name}</TableCell>
              <TableCell>{expense.price.toFixed(2)} €</TableCell>
              <TableCell>{expense.percentageMarkup.toFixed(2)} %</TableCell>
              <TableCell>{expense.totalPrice.toFixed(2)} €</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(expense.id)}
                  aria-label={`Delete ${expense.name}`}
                  className="text-destructive border-none bg-transparent hover:bg-[#E2ECF9] hover:text-destructive"
                >
                  <Trash2 className="text-destructive w-5 h-5" />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
});
