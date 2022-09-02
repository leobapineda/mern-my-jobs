import React, { useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import Wrapper from "../../assets/wrappers/ChartsContainer";

function ChartContainer() {
  const { monthlyApplications } = useGlobalContext();
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        type="button"
        onClick={() => setBarChart((prevState) => !prevState)}
      >
        {barChart ? "Show Area Chart" : "Show Bar Chart"}
      </button>
      {barChart ? (
        <BarChart data={monthlyApplications} />
      ) : (
        <AreaChart data={monthlyApplications} />
      )}
    </Wrapper>
  );
}

export default ChartContainer;
