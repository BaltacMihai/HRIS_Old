import React from "react";
import Navbar from "../../components/Navbar";

function RepDepartments() {
  return (
    <div className="page report_page">
      <Navbar current="reports" />
      <div className="report_page_content">
        <h1 className="title">Deparmtens Reports</h1>
        <div className="details">
          <div className="reports">...</div>
          <div className="list"></div>
        </div>
      </div>
    </div>
  );
}

export default RepDepartments;
