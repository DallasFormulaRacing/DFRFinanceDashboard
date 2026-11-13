import { supabase } from "@/lib/supabaseClient";
import { Donation, DonationsByMonth } from "@/app/types/donations";

export async function getDonationsByMonth(): Promise<DonationsByMonth> {
  const { data, error } = await supabase
    .from("donations")
    .select('name, amount, date, status, notes')
    .order("date", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  // Group donations by month and year
  const donationsByMonth: DonationsByMonth = {};
  (data || []).forEach(d => {
    const datePart = d.date.slice(0, 10);
    const monthKey = datePart.slice(0, 7);

    const donation: Donation = {
      donor: d.name,
      amount: d.amount,
      time: d.date,
      status: d.status,
      comment: d.notes || "",
    };

    if (!donationsByMonth[monthKey]) {
      donationsByMonth[monthKey] = [];
    }
    donationsByMonth[monthKey].push(donation);
  });

  return donationsByMonth;
}