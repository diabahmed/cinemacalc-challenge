import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addExpense } from "@/state/expensesSlice";
import { AppDispatch } from "@/state/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";

const expenseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .number({
      message: "Price must be a number",
    })
    .min(0.01, "Price must be positive"),
  percentageMarkup: z
    .number({
      message: "Percentage markup must be a number",
    })
    .min(0, "Percentage markup must be zero or more")
    .max(100, "Percentage markup cannot exceed 100%"),
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
    defaultValues: {
      name: "",
    },
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
              <Input
                id="name"
                placeholder="e.g., Actor, Camera"
                autoComplete="on"
                minLength={1}
                {...field}
              />
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
                min={0}
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
                min={0}
                max={100}
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
