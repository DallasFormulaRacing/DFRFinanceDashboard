// app/types/dashboard.ts
/*
*   RIGHT NOW THIS IS A W.I.P.
*/
// Team options
export type Team = "IC" | "EV";

// Data for each subteam’s spending
export interface SubteamData {
  subteam: string;
  spent: number;
}

// Structure for holding multiple teams’ data
export type TeamData = Record<Team, SubteamData[]>;
