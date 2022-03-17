import React, { useEffect } from "react";

function MeetingsCard({ name, date, hour, id, color }) {
  useEffect(() => {
    let projectColor = document.getElementById(name + "-" + id);
    projectColor.style.backgroundColor = color;
  });
  return (
    <div className="meetingsCard">
      <div className="meetingsCard_project_color" id={name + "-" + id}></div>
      <div className="meetingsCard_infos">
        <p className="meetingsCard_infos_name">{name}</p>
        <div className="meetingsCard_infos_details">
          <div className="meetingsCard_infos_details_date">
            <span className="icon-calendar"></span>
            <p>{date}</p>
          </div>
          <div className="meetingsCard_infos_details_date">
            <span className="icon-clock"></span>
            <p>{hour}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingsCard;
