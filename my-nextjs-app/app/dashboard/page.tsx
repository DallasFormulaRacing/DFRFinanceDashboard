"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { supabase } from "@/lib/supabaseClient";

import SubteamTable from "./SubteamTable";
import BarChart from "./charts/BarChart";
import DonutChart from "./charts/DonutChart";

type Team = "IC" | "EV";

type SubteamData = {
  subteam: string;
  spent: number;
};

export default function DashboardPage() {
  const [team, setTeam] = useState<Team>("IC");
  const [data, setData] = useState<SubteamData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("subteams")
        .select("name, budget")
        .eq("competition", team);

      if (error) {
        console.error("Supabase fetch error:", error);
        return;
      }

      if (data) {
        const formatted = data.map((row) => ({
          subteam: row.name,
          spent: row.budget,
        }));

        setData(formatted);
      }
    }

    fetchData();
  }, [team]);

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
      <div className="grid grid-cols-[2.3fr_1.1fr] gap-8 items-start">
        <BarChart team={team} data={data} />

        <div className="flex justify-end">
          <DonutChart team={team} data={data} />
        </div>
      </div>

      {/* Subteam table */}
      <div>
        <SubteamTable team={team} data={data} />
      </div>
    </div>
  );
}