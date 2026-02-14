import { DonationsByMonth } from "@/app/types/donations";

export const donationsByMonth: DonationsByMonth = {
  January: [
    { donor: "Tesla", amount: 15600, time: "2025-01-17T00:50:00", comment: "EV research" },
    { donor: "Google", amount: 14000, time: "2025-01-10T15:20:00", comment: "IC research" },
    { donor: "Drake", amount: 100000, time: "2025-01-26T17:40:00", comment: "EV Car" },
  ],
  February: [
    { donor: "Meta", amount: 12500, time: "2025-02-12T09:00:00", comment: "Car Parts" },
  ],
  March: [
    { donor: "Palantir", amount: 13000, time: "2025-03-05T14:10:00", comment: "Tech initiative" },
  ],
  April: [
    { donor: "TI Instruments", amount: 9000, time: "2025-04-21T10:30:00", comment: "Software grant" },
  ],
};
