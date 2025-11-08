"use client";

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  team: string;
  data: { subteam: string; spent: number }[];
}

export default function BarChart({ team, data }: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No data available for {team} team</p>
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    subteam: item.subteam,
    allocated: Math.round(item.spent * 1.2),
    spent: item.spent,
  }));

  return (
    <div className="flex-1 pr-4">
      {/* Centered custom legend */}
      <div className="flex justify-center items-center space-x-8 mb-2">
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-4 h-4 rounded-sm"
            style={{ backgroundColor: "#FF8C00" }}
          ></span>
          <span className="text-sm text-gray-700 font-medium">Allocated</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-4 h-4 rounded-sm"
            style={{ backgroundColor: "#006400" }}
          ></span>
          <span className="text-sm text-gray-700 font-medium">
            Actual Spending
          </span>
        </div>
      </div>

      <ResponsiveContainer width="110%" height={365}>
        <ReBarChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
          barCategoryGap="20%"
          barGap={2}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="subteam"
            tick={{ fill: "#555", fontSize: 12 }}
            angle={-20}
            textAnchor="end"
            interval={0}
            height={50}
          />
          <YAxis tick={{ fill: "#555", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          {/* Orange first = Allocated */}
          <Bar dataKey="allocated" fill="#FF8C00" name="Allocated" radius={[6, 6, 0, 0]} />
          {/* Green second = Actual Spending */}
          <Bar dataKey="spent" fill="#006400" name="Actual Spending" radius={[6, 6, 0, 0]} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
