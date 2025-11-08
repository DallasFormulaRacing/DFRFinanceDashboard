"use client";

import * as React from "react";
import { PieChart, Pie, Cell, Label, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#FF8C00", "#FFA500", "#FFB84D", "#FF6600", "#FF944D"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { subteam, spent } = payload[0].payload;
    return (
      <div className="rounded-md bg-white shadow-md p-2 border border-gray-200 text-sm">
        <p className="font-semibold text-gray-800">{subteam}</p>
        <p className="text-gray-600">${spent.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function DonutChart({ team, data }: { team: string; data?: any[] }) {
  // 🛡️ Handle undefined data safely
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex items-center justify-end h-72 pr-4 text-gray-400">
        No data available
      </div>
    );
  }

  const totalSpent = data.reduce((sum, item) => sum + item.spent, 0);

  return (
    <div className="flex items-center justify-end h-72 pr-4">
      <ResponsiveContainer width={230} height={230}>
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={data}
            dataKey="spent"
            nameKey="subteam"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}

            {/* Center label */}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-xl font-bold"
                      >
                        ${totalSpent.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground text-sm"
                      >
                        Total Spent
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
