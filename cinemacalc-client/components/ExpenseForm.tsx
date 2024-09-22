import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addExpense } from "@/store/expensesSlice";
import { AppDispatch } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";

const expenseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be positive"),
  percentageMarkup: z
    .number()
    .min(1, "Percentage must be positive")
    .max(100, "Markup cannot exceed 100%"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  onSuccess: () => void;
}

export const ExpenseForm = ({ onSuccess }: ExpenseFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const { control, handleSubmit, reset } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = (values: ExpenseFormData) => {
    dispatch(addExpense(values))
      .unwrap()
      .then(() => {
        onSuccess();
        reset();
      })
      .catch((error: Error) => {
        toast({
          title: "Error",
          description: `Failed to add the expense: ${error.message}`,
          variant: "destructive",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Expense Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input id="name" placeholder="e.g., Actor, Camera" {...field} />
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price (€)</Label>
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="percentageMarkup">Percentage Markup (%)</Label>
        <Controller
          name="percentageMarkup"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                id="percentageMarkup"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>
      <Button type="submit" className="w-full bg-[#1D4E89] hover:bg-[#1a4376]">
        Add
      </Button>
    </form>
  );
};

export default ExpenseForm;
