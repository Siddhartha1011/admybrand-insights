// src/components/Panel4.tsx
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
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
  { date: new Date("2025-07-15"), revenue: 60000, cogs: 25000, opex: 12000 },
  { date: new Date("2025-07-25"), revenue: 55000, cogs: 22000, opex: 11000 },
];

type Panel4Props = {
  startDate: Date | null;
  endDate: Date | null;
};

const Panel4: React.FC<Panel4Props> = ({ startDate, endDate }) => {
  const filteredData = useMemo<IncomeData[]>(() => {
    if (startDate && endDate) {
      return mockIncomeData.filter(
        (entry) => entry.date >= startDate && entry.date <= endDate
      );
    }
    return mockIncomeData;
  }, [startDate, endDate]);

  const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0);
  const totalCogs = filteredData.reduce((sum, d) => sum + d.cogs, 0);
  const totalOpex = filteredData.reduce((sum, d) => sum + d.opex, 0);
  const grossProfit = totalRevenue - totalCogs;
  const netProfit = grossProfit - totalOpex;

  const barData = [
    { name: "Revenue", value: totalRevenue },
    { name: "COGS", value: totalCogs },
    { name: "Gross Profit", value: grossProfit },
    { name: "OPEX", value: totalOpex },
    { name: "Net Profit", value: netProfit },
  ];

  const donutData = [
    { name: "COGS", value: totalCogs, color: "#f87171" },
    { name: "OPEX", value: totalOpex, color: "#fb923c" },
    { name: "Net Profit", value: netProfit, color: "#22c55e" },
  ];

  return (
    <div className="panel panel4 p-4 text-white">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Column Chart */}
        <div className="flex-1 min-w-[200px] bg-[#1f1f1f] rounded-lg p-3">
          <h3 className="text-md font-semibold mb-2">Financial Metrics</h3>
          <div style={{ width: "100%", height: 170 }}>
            <ResponsiveContainer>
              <BarChart
                data={barData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="name" tick={{ fill: "#aaa" }} />
                <YAxis tick={{ fill: "#aaa" }} />
                <Tooltip
                  formatter={(value: any) =>
                    `₹${Number(value).toLocaleString()}`
                  }
                  contentStyle={{
                    background: "#222",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {barData.map((entry) => {
                    let fill = "#10b981";
                    if (entry.name === "COGS") fill = "#f87171";
                    else if (entry.name === "OPEX") fill = "#fb923c";
                    else if (entry.name === "Gross Profit") fill = "#eab308";
                    else if (entry.name === "Net Profit") fill = "#22c55e";
                    return <Cell key={entry.name} fill={fill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="w-full max-w-sm bg-[#1f1f1f] rounded-lg p-3">
          <h3 className="text-md font-semibold mb-2">Revenue Composition</h3>
          <div style={{ width: "100%", height: 170 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="20%"
                  outerRadius="50%"
                  paddingAngle={2}
                  stroke="none"
                  label={({
                    name,
                    percent,
                  }: {
                    name?: string;
                    percent?: number;
                  }) =>
                    name && percent !== undefined
                      ? `${name} ${(percent * 100).toFixed(0)}%`
                      : ""
                  }
                >
                  {donutData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) =>
                    [`₹${Number(value).toLocaleString()}`, name]
                  }
                  contentStyle={{
                    background: "#222",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ color: "#ccc", fontSize: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel4;