"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

const AddExpenseModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1D4E89] hover:bg-[#1a4376]" size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add New Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#f6f3ee] border border-[#0c1f37] shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add New Expense
          </DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new expense.
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
