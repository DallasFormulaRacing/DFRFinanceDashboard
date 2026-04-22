import { CostCenterData } from "./CostCenterTable";

export const costCenterData: Record<"IC" | "EV", CostCenterData[]> = {
  IC: [
    { name: "Manufacturing", budgetAllowed: 5000, actualExpenses: 4800, remaining: 200, status: "under" },
    { name: "Composites", budgetAllowed: 3000, actualExpenses: 3200, remaining: -200, status: "over" },
    { name: "Software", budgetAllowed: 4200, actualExpenses: 3900, remaining: 300, status: "under" },
    { name: "Ergonomics", budgetAllowed: 2500, actualExpenses: 2500, remaining: 0, status: "at-limit" },
    { name: "Chassis", budgetAllowed: 4800, actualExpenses: 4600, remaining: 200, status: "under" },
    { name: "Aerodynamics", budgetAllowed: 3500, actualExpenses: 3800, remaining: -300, status: "over" },
    { name: "Electrical", budgetAllowed: 3900, actualExpenses: 3700, remaining: 200, status: "under" },
  ],
  EV: [
    { name: "Manufacturing", budgetAllowed: 4600, actualExpenses: 4400, remaining: 200, status: "under" },
    { name: "Composites", budgetAllowed: 3800, actualExpenses: 3900, remaining: -100, status: "over" },
    { name: "Powertrain", budgetAllowed: 5200, actualExpenses: 5000, remaining: 200, status: "under" },
    { name: "Embedded", budgetAllowed: 4100, actualExpenses: 4100, remaining: 0, status: "at-limit" },
    { name: "Electrical", budgetAllowed: 6000, actualExpenses: 5800, remaining: 200, status: "under" },
  ],
};