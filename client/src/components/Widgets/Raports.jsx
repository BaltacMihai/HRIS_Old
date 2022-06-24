import React from "react";
import useUserLastReport from "../../hooks/getUserLastReport";
import useUserReport from "../../hooks/getUserReports";
import ReportsAll from "./ReportsAll";

function Raports({ userId }) {
  let userStats = useUserReport(userId);
  let userStatsLast = useUserLastReport(userId);
  if (userStats && userStatsLast)
    return (
      <div className="row dashboard_content-row">
        <ReportsAll title={"All time"} userStats={userStats} period={"All"} />
        <ReportsAll
          title={"Last month"}
          userStats={userStatsLast}
          period={"Current"}
        />
      </div>
    );
  else {
    return (
      <div className="row dashboard_content-row">
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Raports;
