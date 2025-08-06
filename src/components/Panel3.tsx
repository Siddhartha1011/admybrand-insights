// src/components/Panel3.tsx
import React, { useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

type Panel3Props = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (d: Date | null) => void;
  setEndDate: (d: Date | null) => void;
  setSelectedData: (data: { date: Date; revenue: number; cogs: number; opex: number } | null) => void;
};

const Panel3: React.FC<Panel3Props> = ({ startDate, endDate, setStartDate, setEndDate, setSelectedData}) => {
  const filteredData = useMemo<IncomeData[]>(() => {
    let data = mockIncomeData;
    if (startDate && endDate) {
      data = mockIncomeData.filter((entry) => entry.date >= startDate && entry.date <= endDate);
    }
  
    // Send first entry or aggregated data to parent
    if (data.length > 0) {
      setSelectedData({
        date: data[data.length - 1].date,
        revenue: data[data.length - 1].revenue,
        cogs: data[data.length - 1].cogs,
        opex: data[data.length - 1].opex,
      });
    } else {
      setSelectedData(null);
    }
  
    return data;
  }, [startDate, endDate, setSelectedData]);

  const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0);
  const totalCogs = filteredData.reduce((sum, d) => sum + d.cogs, 0);
  const totalOpex = filteredData.reduce((sum, d) => sum + d.opex, 0);
  const grossProfit = totalRevenue - totalCogs;
  const netProfit = grossProfit - totalOpex;

  const values = [
    { label: "Revenue", value: totalRevenue, color: "bg-green-500" },
    { label: "COGS", value: totalCogs, color: "bg-red-500" },
    { label: "Gross Profit", value: grossProfit, color: "bg-yellow-400" },
    { label: "OPEX", value: totalOpex, color: "bg-orange-400" },
    { label: "Net Profit", value: netProfit, color: "bg-green-700" },
  ];

  const maxValue = Math.max(...values.map((v) => Math.abs(v.value), 1));

  return (
    <div className="panel panel3 p-4 text-white">
      <h2 className="text-xl font-semibold mb-2">Select Period</h2>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex flex-col flex-1">
          <label className="text-xs mb-1">Start Date</label>
          <DatePicker
            selected={startDate ?? undefined}
            onChange={(d) => setStartDate(d)}
            selectsStart
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            placeholderText="Start"
            className="text-black rounded px-2 py-1 w-full"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-xs mb-1">End Date</label>
          <DatePicker
            selected={endDate ?? undefined}
            onChange={(d) => setEndDate(d)}
            selectsEnd
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            minDate={startDate ?? undefined}
            placeholderText="End"
            className="text-black rounded px-2 py-1 w-full"
          />
        </div>
      </div>

      <div className="bg-[#1e1e1e] p-4 rounded-lg">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-lg font-bold">Income Status</h3>
            <p className="text-sm text-gray-400">
              {startDate && endDate
                ? `From ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
                : "All time"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {values.map(({ label, value, color }, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{label}</span>
                <span className="font-medium text-white">₹{value.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-700 rounded h-3">
                <div
                  className={`${color} h-3 rounded transition-all duration-500`}
                  style={{
                    width: `${Math.min(100, (Math.abs(value) / maxValue) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Panel3;