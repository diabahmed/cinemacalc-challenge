import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ExpenseTableSkeleton = () => (
  <div className="mt-5 w-full">
    <div className="mb-5 flex justify-center items-center">
      <Skeleton className="h-9 w-[160px] rounded-md px-3 inline-block bg-[#E2ECF9]" />
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-4 w-[100px] bg-[#E2ECF9]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-[100px] bg-[#E2ECF9]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-[100px] bg-[#E2ECF9]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-[100px] bg-[#E2ECF9]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-[100px] bg-[#E2ECF9]" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(4)].map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-[150px] bg-[#E2ECF9]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px] bg-[#E2ECF9]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[80px] bg-[#E2ECF9]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px] bg-[#E2ECF9]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[60px] bg-[#E2ECF9]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="mt-5 w-full text-center">
      <Skeleton className="h-6 w-[150px] inline-block bg-[#E2ECF9]" />
    </div>
  </div>
);
