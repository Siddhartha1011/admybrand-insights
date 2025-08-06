import React, { useState } from "react";
import AnimatedPanel from "./components/AnimatedPanel";
import SidebarPanel from "./components/SidebarPanel";
import Panel3 from "./components/Panel3";
import Panel4 from "./components/Panel4";
import Panel5 from "./components/Panel5";
import Panel6 from "./components/Panel6";

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedPanel3Data, setSelectedPanel3Data] = useState<{
    date: Date;
    revenue: number;
    cogs: number;
    opex: number;
  } | null>(null);

  return (
    <div className="min-h-screen overflow-y-auto">
      <AnimatedPanel />
      <SidebarPanel />
      <Panel3
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setSelectedData={setSelectedPanel3Data}
      />
      <Panel4 startDate={startDate} endDate={endDate} />
      <Panel5 startDate={startDate} endDate={endDate}/>
      <Panel6 selectedData={selectedPanel3Data} />
    </div>
  );
};

export default App;
