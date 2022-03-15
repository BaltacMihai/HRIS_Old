import React from "react";

function MeetingsCard({ name, date, hour }) {
  return (
    <div className="meetings">
      <div className="meetings_project_color"></div>
      <div className="meetings_infos">
        <p className="meetings_infos_name">{name}</p>
        <div className="meetings_infos_details">
          <div className="meetings_infos_details_date">
            <span className="icon-calendar"></span>
            <p>{date}</p>
          </div>
          <div className="meetings_infos_details_date">
            <span className="icon-clock"></span>
            <p>{hour}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingsCard;
