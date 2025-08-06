// src/components/Panel5.tsx
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  Legend,
} from "recharts";

interface IncomeData {
  date: Date;
  revenue: number;
  cogs: number;
  opex: number;
}

const mockIncomeData: IncomeData[] = [
  { date: new Date("2025-07-01"), revenue: 50000, cogs: 20000, opex: 10000 },
  { date: new Date("2025-07-05"), revenue: 52000, cogs: 21000, opex: 10500 },
  { date: new Date("2025-07-10"), revenue: 48000, cogs: 19000, opex: 9800 },
  { date: new Date("2025-07-15"), revenue: 60000, cogs: 25000, opex: 12000 },
  { date: new Date("2025-07-20"), revenue: 58000, cogs: 24000, opex: 11500 },
  { date: new Date("2025-07-25"), revenue: 55000, cogs: 22000, opex: 11000 },
];

type Panel5Props = {
  startDate: Date | null;
  endDate: Date | null;
};

const formatDate = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

const Panel5: React.FC<Panel5Props> = ({ startDate, endDate }) => {
  const filtered = useMemo<IncomeData[]>(() => {
    if (startDate && endDate) {
      return mockIncomeData
        .filter((e) => e.date >= startDate && e.date <= endDate)
        .sort((a, b) => a.date.getTime() - b.date.getTime());
    }
    return mockIncomeData.slice().sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [startDate, endDate]);

  const chartData = filtered.map((d) => {
    const grossProfit = d.revenue - d.cogs;
    const netProfit = grossProfit - d.opex;
    return {
      date: formatDate(d.date),
      Revenue: d.revenue,
      "Net Profit": netProfit,
    };
  });

  return (
    <div className="panel panel5 p-4 text-white">
      <div className="bg-[#1f1f1f] rounded-lg p-3">
        <div className="flex justify-between mb-2">
          <div className="font-medium">Revenue Trend</div>
          <div className="text-sm text-gray-400">
            {startDate && endDate
              ? `${formatDate(startDate)} – ${formatDate(endDate)}`
              : "All time"}
          </div>
        </div>
        <div style={{ width: "100%", height: 120 }}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#2c2c2c" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#aaa" }} />
              <YAxis tick={{ fill: "#aaa" }} />
              <Tooltip
                contentStyle={{ background: "#222", border: "none", color: "#fff" }}
                formatter={(value: any, name: string) => [`₹${Number(value).toLocaleString()}`, name]}
              />
              <Legend wrapperStyle={{ color: "#ccc", fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="Revenue"
                stroke="#10b981"
                fill="url(#revGradient)"
                strokeWidth={2}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="Net Profit"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Panel5;