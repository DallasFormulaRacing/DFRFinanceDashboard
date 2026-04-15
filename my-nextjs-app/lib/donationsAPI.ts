import { supabase } from "./supabase";
import { Donation, DonationsByMonth } from "@/app/types/donations";

export async function getDonationsByMonth(): Promise<DonationsByMonth> {
  const { data, error } = await supabase
    .from("donations")
    .select('name, amount, date, notes')
    .order("date", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  // Group donations by month
  const donationsByMonth: DonationsByMonth = {};
  (data || []).forEach(d => {
    const monthName = new Date(d.date).toLocaleString("default", { month: "long" });

    const donation: Donation = {
      donor: d.name,
      amount: d.amount,
      time: d.date,
      comment: d.notes || "",
    };

    if (!donationsByMonth[monthName]) {
      donationsByMonth[monthName] = [];
    }
    donationsByMonth[monthName].push(donation);
  });

  return donationsByMonth;
}