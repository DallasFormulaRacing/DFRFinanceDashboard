import { supabase } from "@/lib/supabaseClient";
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

  // Group donations by month and year
  const donationsByMonth: DonationsByMonth = {};
  (data || []).forEach(d => {
    const rowDate = new Date(d.date);
    const monthName = rowDate.toLocaleString("default", { month: "long" });
    const year = rowDate.getFullYear();
    const monthKey = `${year}-${monthName}`;

    const donation: Donation = {
      donor: d.name,
      amount: d.amount,
      time: d.date,
      comment: d.notes || "",
    };

    if (!donationsByMonth[monthKey]) {
      donationsByMonth[monthKey] = [];
    }
    donationsByMonth[monthKey].push(donation);
  });

  return donationsByMonth;
}