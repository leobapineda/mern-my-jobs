import React, { useEffect } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { StatsContainer, ChartContainer, Loading } from "../../components";
function Stats() {
  const { showStats, stats, monthlyApplications, isLoading } =
    useGlobalContext();

  useEffect(() => {
    showStats();
  }, []);


  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  );
}

export default Stats;
