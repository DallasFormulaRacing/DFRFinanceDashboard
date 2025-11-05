// app/po/internal-combustion/page.tsx
"use client"

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import PurchaseTable from "./purchaseTable";

export default function PurchaseOrdersPage() {
  const [team, setTeam] = useState("IC")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between text-[black]">
        <Select value={team} onValueChange={setTeam}>
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
  )
}
