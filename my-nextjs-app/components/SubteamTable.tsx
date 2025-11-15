"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SubteamData {
  subteam: string;
  spent: number;
}

export default function SubteamTable({
  team,
  data = [],
}: {
  team: string;
  data?: SubteamData[];
}) {
  return (
    <Card className="shadow-sm rounded-none -mt-[5%] border-0 p-0">
      <div className="overflow-hidden border border-gray-500 rounded-md">
        <Table className="border-collapse border-spacing-0 w-full m-0">
          <TableHeader className="bg-orange-100 border-b border-gray-400">
            <TableRow className="m-0">
              <TableHead
                className="text-center font-bold text-black border-r border-gray-500 text-[16px] align-middle"
                style={{ borderRightWidth: "1px", borderColor: "#6b7280" }}
              >
                Subteam
              </TableHead>
              <TableHead
                className="text-center font-bold text-black text-[16px] align-middle"
              >
                Amount Spent
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                className="border-t border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <TableCell
                  className="text-center border-r border-gray-500 align-middle"
                  style={{ borderRightWidth: "1px", borderColor: "#6b7280" }}
                >
                  {row.subteam}
                </TableCell>
                <TableCell className="text-center font-medium text-gray-700 align-middle">
                  ${row.spent.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
