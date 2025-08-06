import React, { useEffect, useState } from "react";

type IncomeData = {
  date: Date;
  revenue: number;
  cogs: number;
  opex: number;
};

type Panel6Props = {
  selectedData: IncomeData | null;
};

const Panel6: React.FC<Panel6Props> = ({ selectedData }) => {
  const [summary, setSummary] = useState<string>("Loading summary...");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedData) {
      setSummary("No data selected from Panel 3.");
      return;
    }

    const generateSummary = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:4000/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: selectedData.date,
            revenue: selectedData.revenue,
            cogs: selectedData.cogs,
            opex: selectedData.opex,
          }),
        });

        const result = await response.json();
        if (response.ok && result.summary) {
          const rawText = result.summary;
        
          // Extract only the part after "**Overall Insight:**"
          const insightMatch = rawText.split("**Overall Insight:**");
          if (insightMatch.length > 1) {
            setSummary(insightMatch[1].trim());
          } else {
            // fallback: take last 2-3 lines if the marker is missing
            const lines = rawText.trim().split("\n");
            setSummary(lines.slice(-3).join(" ").trim());
          }
        } else {
          setSummary("Failed to load summary.");
          console.error(result.details || "Unknown error");
        }
      } catch (error) {
        console.error("Error calling server:", error);
        setSummary("Failed to load summary.");
      } finally {
        setLoading(false);
      }
    };

    generateSummary();
  }, [selectedData]);

  return (
    <div className="panel panel6 p-4 text-white">
      <h2 className="text-lg font-semibold mb-3">LLM Summary</h2>
      <div className="bg-[#1f1f1f] p-4 rounded-lg min-h-[200px]">
        {loading ? (
          <p className="text-gray-400">Generating summary...</p>
        ) : (
          <p className="text-sm leading-6 whitespace-pre-line">{summary}</p>
        )}
      </div>
    </div>
  );
};

export default Panel6;