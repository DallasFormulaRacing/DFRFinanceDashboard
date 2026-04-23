"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CostCenter } from "@/services/cc.services";

type CostCenterRow = CostCenter & { remaining: number };

const formatCurrency = (value: number) => {
  const absValue = Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return value < 0 ? `-$${absValue}` : `$${absValue}`;
};

export default function CostCenterTable({
  data,
}: {
  data: CostCenterRow[];
  teamName: string;
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Cost Center</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Additions</TableHead>
            <TableHead>Expenses</TableHead>
            <TableHead>Pending Additions</TableHead>
            <TableHead>Pending Expenses</TableHead>
            <TableHead>Remaining</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No cost centers found
              </TableCell>
            </TableRow>
          ) : (
            data.map((cc) => (
              <TableRow key={cc.name} className="hover:bg-muted/50">

                <TableCell className="font-medium">
                  {cc.name}
                </TableCell>

                <TableCell>
                  {formatCurrency(cc.balance)}
                </TableCell>

                <TableCell>
                  {formatCurrency(cc.add_amount)}
                </TableCell>

                <TableCell>
                  {formatCurrency(cc.exp_amount)}
                </TableCell>

                <TableCell>
                  {formatCurrency(cc.p_add)}
                </TableCell>

                <TableCell>
                  {formatCurrency(cc.p_exp)}
                </TableCell>

                <TableCell
                  className={
                    cc.remaining < 0 ? "text-red-600 font-semibold" : ""
                  }
                >
                  {formatCurrency(cc.remaining)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </div>
  );
}


// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export type CostCenterData = {
//   name: string;
//   budgetAllowed: number;
//   actualExpenses: number;
//   remaining: number;
//   status: "under" | "over" | "at-limit";
// };

// interface CostCenterTableProps {
//   data: CostCenterData[];
//   teamName: string;
// }

// export default function CostCenterTable({ data, teamName }: CostCenterTableProps) {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="text-black font-semibold">Cost Center</TableHead>
//           <TableHead className="text-black font-semibold">Balance</TableHead>
//           <TableHead className="text-black font-semibold">Additions</TableHead>
//           <TableHead className="text-black font-semibold">Expenses</TableHead>
//           <TableHead className="text-black font-semibold">Pending Additions</TableHead>
//           <TableHead className="text-black font-semibold">Pending Expenses</TableHead>
//           <TableHead className="text-black font-semibold">Remaining</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {data.map((costCenter) => (
//           <TableRow key={costCenter.name}>
//             <TableCell className="font-medium text-black">{costCenter.name}</TableCell>
//             <TableCell className="text-black">${costCenter.budgetAllowed.toLocaleString()}</TableCell>
//             <TableCell className="text-black">${costCenter.actualExpenses.toLocaleString()}</TableCell>
//             <TableCell className={`font-semibold ${
//               costCenter.status === "over" ? "text-red-600" : "text-green-600"
//             }`}>
//               ${Math.abs(costCenter.remaining).toLocaleString()}
//               {costCenter.status === "over" && " (Over)"}
//             </TableCell>
//             <TableCell>
//               <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                 costCenter.status === "under" ? "bg-green-100 text-green-700" :
//                 costCenter.status === "over" ? "bg-red-100 text-red-700" :
//                 "bg-yellow-100 text-yellow-700"
//               }`}>
//                 {costCenter.status === "under" ? "Under Budget" :
//                  costCenter.status === "over" ? "Over Budget" : "At Limit"}
//               </span>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }