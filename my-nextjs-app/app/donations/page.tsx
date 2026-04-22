"use client";

import { useState } from "react";
import { MoreHorizontal, DollarSign } from "lucide-react";
import { donationsByMonth } from "@/lib/donationsSampleData";
import { Donation, DonationSummaryData } from "@/app/types/donations";

// Reusable summary component
const DonationSummary = ({ totalDonations, totalSpent }: DonationSummaryData) => (
  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 shadow-sm grid grid-cols-2 gap-4">
    {/* Total Donations */}
    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
      <div>
        <h2 className="text-sm font-semibold text-green-800">Total Donations</h2>
        <p className="text-2xl font-bold text-green-700">${totalDonations.toLocaleString()}</p>
      </div>
      <div className="bg-green-100 p-3 rounded-full">
        <DollarSign size={24} className="text-green-700" />
      </div>
    </div>

    {/* Total Spent */}
    <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-4">
      <div>
        <h2 className="text-sm font-semibold text-red-800">Total Spent</h2>
        <p className="text-2xl font-bold text-red-700">${totalSpent.toLocaleString()}</p>
      </div>
      <div className="bg-red-100 p-3 rounded-full">
        <DollarSign size={24} className="text-red-700" />
      </div>
    </div>
  </div>
);

// Reusable table component
const DonationTable = ({ data }: { data: Donation[] }) => (
  <div className="bg-white p-6 mt-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-900">Donation History</h2>
      <button className="text-gray-500 hover:text-gray-700 transition-colors">
        <MoreHorizontal size={20} />
      </button>
    </div>

    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="text-left text-gray-500 text-xs uppercase tracking-wider">
          <th className="py-3 px-4">Donor</th>
          <th className="py-3 px-4">Donation</th>
          <th className="py-3 px-4">Time</th>
          <th className="py-3 px-4">Comment</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data.length > 0 ? (
          data.map((d, index) => (
            <tr key={index} className="text-gray-800 text-sm hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-medium">{d.donor}</td>
              <td className="py-3 px-4 font-semibold text-green-600">${d.amount.toLocaleString()}</td>
              <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                {new Date(d.time).toLocaleString()}
              </td>
              <td className="py-3 px-4 text-gray-500">{d.comment}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="py-4 text-center text-gray-400 italic">
              No donations recorded for this month.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Main page
export default function DonationsPage() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const currentData = donationsByMonth[monthName] || [];
  const totalDonations = currentData.reduce((sum, d) => sum + d.amount, 0);
  const totalSpent = Math.round(totalDonations * 0.4); // placeholder

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Donation</h1>
        <p className="text-sm text-gray-600">
          01 - {daysInMonth} {monthName}, {year}
        </p>
      </div>

      {/* Selectors */}
      <div className="flex gap-4">
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="border rounded-lg p-2 text-gray-700"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="border rounded-lg p-2 text-gray-700"
        >
          {Array.from({ length: 7 }).map((_, i) => {
            const y = 2020 + i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mt-6">
        <DonationSummary totalDonations={totalDonations} totalSpent={totalSpent} />
      </div>

      <DonationTable data={currentData} />
    </div>
  );
}
