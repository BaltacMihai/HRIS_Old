import React from "react";
import useData from "../../hooks/useData";
import { USER_URL } from "../../routes";
import ReportsAll from "./ReportsAll";

function Raports({ userId }) {
  let userStats = useData(USER_URL.GET_REPORT(userId));
  let userStatsLast = useData(USER_URL.GET_LAST_REPORT(userId));
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
