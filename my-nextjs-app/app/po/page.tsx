"use client"

import * as React from "react"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PurchaseTable from "./purchaseTable"

export default function PurchaseOrders() {
  const [team, setTeam] = useState("IC")

  return (
    <div className="flex flex-col gap-4">
      <Select value={team} onValueChange={setTeam}>
        <SelectTrigger className="w-60 text-black">
          <SelectValue placeholder="Select a team" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Teams</SelectLabel>
            <SelectItem value="IC">Internal Combustion (IC)</SelectItem>
            <SelectItem value="EV">Electric Vehicle (EV)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <PurchaseTable team={team} />
    </div>
  )
}