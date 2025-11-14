"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import CostCenterTable from "./CostCenterTable";
import { costCenterData } from "./costCenterData";

type Team = "IC" | "EV";

export default function CostCenterPage() {
  const [team, setTeam] = useState<Team>("IC"); // Default to IC as requested

  return (
    <div className="p-6 space-y-10">
      {/* Header + Dropdown */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Cost Centers</h1>

        <Select value={team} onValueChange={(val: Team) => setTeam(val)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IC">Internal Combustion (IC)</SelectItem>
            <SelectItem value="EV">Electric Vehicle (EV)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cost Center Table */}
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">{team} Team Cost Centers</h3>
          <CostCenterTable data={costCenterData[team]} teamName={team} />
        </Card>
      </div>
    </div>
  );
}