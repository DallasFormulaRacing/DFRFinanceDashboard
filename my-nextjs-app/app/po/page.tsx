"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import PurchaseTable from "./purchaseTable";
import { Subteam } from "@/app/types/po";  // <-- Import your Subteam type here

export default function PurchaseOrdersPage() {
  // Explicitly type as Subteam (not generic string)
  const [team, setTeam] = useState<Subteam>("IC");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between text-[black]">
        <Select
          value={team}
          onValueChange={(value) => setTeam(value as Subteam)} // cast here
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent> 
            <SelectItem value="IC">IC</SelectItem>
            <SelectItem value="EV">EV</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PurchaseTable team={team} />
    </div>
  );
}
