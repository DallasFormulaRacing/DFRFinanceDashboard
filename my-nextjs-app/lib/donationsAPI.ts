import { supabase } from "@/lib/supabaseClient";
import { Donation, DonationsByMonth, NewDonation } from "@/app/types/donations";

/**
 * Parse a date string from the DB without timezone surprises.
 * A date-only value like "2025-03-01" would otherwise be treated as UTC midnight,
 * which shows up as Feb 28 in US timezones (and gets grouped into the wrong month).
 */
export function parseDonationDate(value: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(value);
}

/** Build the "YYYY-MonthName" key the donations page groups by. */
export function getMonthKey(date: Date): string {
  const monthName = date.toLocaleString("default", { month: "long" });
  return `${date.getFullYear()}-${monthName}`;
}

export async function getDonationsByMonth(): Promise<DonationsByMonth> {
  const { data, error } = await supabase
    .from("donations")
    .select("name, amount, date, notes")
    .order("date", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  // Group donations by month and year
  const donationsByMonth: DonationsByMonth = {};
  (data || []).forEach((d) => {
    const monthKey = getMonthKey(parseDonationDate(d.date));

    const donation: Donation = {
      donor: d.name,
      amount: Number(d.amount),
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

/**
 * Insert a new donation row. Maps the frontend shape back to the
 * snake_case columns on the Supabase `donations` table.
 */
export async function addDonation(donation: NewDonation): Promise<void> {
  const { error } = await supabase.from("donations").insert({
    name: donation.donor,
    amount: donation.amount,
    date: donation.time,
    notes: donation.comment || null,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }
}
