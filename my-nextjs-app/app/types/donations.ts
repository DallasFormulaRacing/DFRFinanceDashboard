export interface Donation {
  donor: string;
  amount: number;
  time: string;      // ideally use ISO string from DB later
  comment: string;
}

export type DonationsByMonth = Record<string, Donation[]>;

export interface DonationSummaryData {
  totalDonations: number;
  totalSpent: number;
}
