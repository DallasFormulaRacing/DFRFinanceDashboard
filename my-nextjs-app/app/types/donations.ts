export interface Donation {
  donor: string;
  amount: number;
  time: string;      // ISO date string from DB (e.g. "2025-01-17" or "2025-01-17T00:50:00")
  comment: string;
}

// Shape of a donation being created from the Add form (same fields, no DB id yet)
export type NewDonation = Donation;

export type DonationsByMonth = Record<string, Donation[]>;

export interface DonationSummaryData {
  totalDonations: number;
  totalSpent: number;
}
