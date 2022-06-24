import React, { useEffect } from "react";
import { BarChart } from "../Charts/BarCompare2Values";

function ReportsAll({ title, userStats, period = "" }) {
  return (
    <div className="widget myTask">
      <div className="myTask_header">
        <p className="myTask_header_title">{title}</p>
      </div>
      <div className="myTask_container">
        {" "}
        <BarChart
          name="Task vs Meetings"
          firstElement={{ name: period + " Tasks", value: userStats.Task }}
          secondElement={{
            name: period + "  Meetings",
            value: userStats.Meeting,
          }}
        />
        <div className="stats_values">
          <p>
            Tasks: <span>{userStats.Task}</span>
          </p>
          <p>
            Meetings: <span>{userStats.Meeting}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReportsAll;
