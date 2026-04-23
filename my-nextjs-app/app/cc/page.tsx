"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import CostCenterTable from "./CostCenterTable";
// import { costCenterData } from "./costCenterData";
import { CostCenter, getAllCostCenters } from "@/services/cc.services";

type Team = "IC" | "EV";

export default function CostCenterPage() {
  const [team, setTeam] = useState<Team>("IC");
  const [data, setData] = useState<(CostCenter & { remaining: number })[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCostCenters(team);
      setData(result);
    };

    fetchData();
  }, [team]);

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
        <CostCenterTable data={data} teamName="IC" />
      </div>
    </div>
  );
}