import { useEffect, useState } from "react";

type Metric = {
  icon: string;
  label: string;
  value: number;
  color: string;
  change: number;
};

const generateMetric = (base: number) =>
  base + parseFloat((Math.random() * 2 - 1).toFixed(2)); // ±1.00

const SidebarPanel = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { icon: "💰", label: "Revenue", value: 92300, color: "text-green-600", change: 0.12 },
    { icon: "👥", label: "Users", value: 1340, color: "text-green-600", change: 1 },
    { icon: "🔁", label: "Conversions", value: 120, color: "text-red-600", change: -0.20 },
    { icon: "📈", label: "Growth", value: 12.5, color: "text-green-600", change: 0.30 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev =>
        prev.map(m => {
          const newVal = generateMetric(m.value);
          const change = parseFloat((newVal - m.value).toFixed(2));
          const color = change >= 0 ? "text-green-600" : "text-red-600";
          return { ...m, value: parseFloat(newVal.toFixed(2)), color, change };
        })
      );
    }, 1500); // update every 1.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel panel2">
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] rounded-xl shadow px-3 py-2 flex flex-col items-start justify-center border-l-4 border-gray-700"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{metric.icon}</span>
              <span className="text-xs font-semibold text-white uppercase">
                {metric.label}
              </span>
            </div>
            <div className="mt-1 text-sm font-bold text-white">
              {metric.label === "Growth"
                ? `${metric.value.toFixed(2)}%`
                : metric.label === "Revenue"
                ? `$${(metric.value / 1000).toFixed(1)}K`
                : metric.value.toLocaleString()}
            </div>
            <div className={`text-xs font-bold ${metric.color}`}>
              {metric.change > 0 ? "▲" : "▼"} {Math.abs(metric.change).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarPanel;