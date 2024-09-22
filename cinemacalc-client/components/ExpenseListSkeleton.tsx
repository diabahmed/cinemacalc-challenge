import { Skeleton } from "@/components/ui/skeleton";
import { Info } from "lucide-react";
import React from "react";

export const ExpenseListSkeleton: React.FC = () => {
  return (
    <div className="p-4 space-y-6 w-full flex flex-col">
      <Skeleton className="h-9 rounded-md px-3 w-36 bg-[#E2ECF9]" />{" "}
      {/* Add New Expense button */}
      <div className="flex-grow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-2 font-semibold">Name</th>
              <th className="text-left p-2 font-semibold">Price</th>
              <th className="text-left p-2 font-semibold">Markup %</th>
              <th className="text-left p-2 font-semibold flex justify-start items-center">
                Total{" "}
                <Info className="inline-block ml-1 w-3 h-3 text-gray-500 cursor-help" />
              </th>
              <th className="text-left p-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((_, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-2">
                  <Skeleton className="h-8 w-full bg-[#E2ECF9]" />
                </td>
                <td className="p-2">
                  <Skeleton className="h-8 w-24 bg-[#E2ECF9]" />
                </td>
                <td className="p-2">
                  <Skeleton className="h-8 w-24 bg-[#E2ECF9]" />
                </td>
                <td className="p-2">
                  <Skeleton className="h-8 w-24 bg-[#E2ECF9]" />
                </td>
                <td className="p-2">
                  <Skeleton className="h-8 w-10 rounded-md bg-[#E2ECF9]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center">
        <Skeleton className="h-6 w-48 bg-[#E2ECF9]" /> {/* Total Sum */}
      </div>
    </div>
  );
};
