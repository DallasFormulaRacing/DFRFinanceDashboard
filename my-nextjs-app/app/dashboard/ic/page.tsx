"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import SubteamTable from "@/components/SubteamTable";
import BarChart from "@/components/BarChart";
import DonutChart from "@/components/DonutChart";

export default function DashboardPage() {
  const [team, setTeam] = useState<"IC" | "EV">("IC");

  // Example dummy data for now — connect this to backend or real subteam table later
  const data = {
    IC: [
      { subteam: "Engine", spent: 4500 },
      { subteam: "Suspension", spent: 3200 },
      { subteam: "Brakes", spent: 2100 },
      { subteam: "Aerodynamics", spent: 1600 },
      { subteam: "Chassis", spent: 2700 },
    ],
    EV: [
      { subteam: "Battery", spent: 5200 },
      { subteam: "Motor", spent: 4800 },
      { subteam: "Electronics", spent: 3500 },
      { subteam: "Cooling", spent: 1800 },
      { subteam: "Body", spent: 2500 },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Header + Team Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-600">Competition Team Spendings</h2>

        <Select value={team} onValueChange={(value) => setTeam(value as "IC" | "EV")}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IC">Internal Combustion (IC)</SelectItem>
            <SelectItem value="EV">Electric Vehicle (EV)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <BarChart team={team} data={data[team]} />
        <DonutChart team={team} data={data[team]} />
      </div>

      {/* Table */}
      <SubteamTable team={team} data={data[team]} />
    </div>
  );
}
