"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import SubteamTable from "./SubteamTable";
import BarChart from "./charts/BarChart";
import DonutChart from "./charts/DonutChart";

type Team = "IC" | "EV";
type SubteamData = { subteam: string; spent: number };

export default function DashboardPage() {
  const [team, setTeam] = useState<Team>("IC");

  //subteams per team
  const data: Record<Team, SubteamData[]> = {
    IC: [
      { subteam: "Manufacturing", spent: 5000 },
      { subteam: "Composites", spent: 3000 },
      { subteam: "Software", spent: 4200 },
      { subteam: "Ergonomics", spent: 2500 },
      { subteam: "Chassis", spent: 4800 },
      { subteam: "Aerodynamics", spent: 3500 },
      { subteam: "Electrical", spent: 3900 },
    ],
    EV: [
      { subteam: "Manufacturing", spent: 4600 },
      { subteam: "Composites", spent: 3800 },
      { subteam: "Powertrain", spent: 5200 },
      { subteam: "Embedded", spent: 4100 },
      { subteam: "Electrical", spent: 6000 },
    ],
  };

  return (
    <div className="space-y-10">
      {/* Header + Dropdown */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[black]">Competition Teams</h2>

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

      {/* Charts Section */}
      {/* Sidebar (donut chart) increased by ~10% */}
      <div className="grid grid-cols-[2.3fr_1.1fr] gap-8 items-start">
        {/* Wider bar chart */}
        <BarChart team={team} data={data[team]} />

        {/* Right-aligned donut chart */}
        <div className="flex justify-end">
          <DonutChart team={team} data={data[team]} />
        </div>
      </div>

      {/* Subteam table */}
      <div>
        <SubteamTable team={team} data={data[team]} />
      </div>
    </div>
  );
}
