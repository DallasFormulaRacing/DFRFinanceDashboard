import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type CostCenterData = {
  name: string;
  budgetAllowed: number;
  actualExpenses: number;
  remaining: number;
  status: "under" | "over" | "at-limit";
};

interface CostCenterTableProps {
  data: CostCenterData[];
  teamName: string;
}

export default function CostCenterTable({ data, teamName }: CostCenterTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-black font-semibold">Cost Center</TableHead>
          <TableHead className="text-black font-semibold">Budget Allowed</TableHead>
          <TableHead className="text-black font-semibold">Actual Expenses</TableHead>
          <TableHead className="text-black font-semibold">Remaining</TableHead>
          <TableHead className="text-black font-semibold">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((costCenter) => (
          <TableRow key={costCenter.name}>
            <TableCell className="font-medium text-black">{costCenter.name}</TableCell>
            <TableCell className="text-black">${costCenter.budgetAllowed.toLocaleString()}</TableCell>
            <TableCell className="text-black">${costCenter.actualExpenses.toLocaleString()}</TableCell>
            <TableCell className={`font-semibold ${
              costCenter.status === "over" ? "text-red-600" : "text-green-600"
            }`}>
              ${Math.abs(costCenter.remaining).toLocaleString()}
              {costCenter.status === "over" && " (Over)"}
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                costCenter.status === "under" ? "bg-green-100 text-green-700" :
                costCenter.status === "over" ? "bg-red-100 text-red-700" :
                "bg-yellow-100 text-yellow-700"
              }`}>
                {costCenter.status === "under" ? "Under Budget" :
                 costCenter.status === "over" ? "Over Budget" : "At Limit"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}