import React from "react";
import { BarChart } from "../../components/Charts/Bar";
import Navbar from "../../components/Navbar";
import useDepartmentStats from "../../hooks/getDepartmentStats";

function RepDepartments() {
  let departmentStats = useDepartmentStats();

  console.log(departmentStats);

  if (departmentStats)
    return (
      <div className="page report_page">
        <Navbar current="reports" />
        <div className="report_page_content">
          <div className="card">
            <h1 className="title">Departments Reports</h1>
          </div>
          <div className="details">
            <div className="reports card">
              <BarChart date={departmentStats} />
            </div>
            <div className="list">
              <p className="title">Departments: </p>
              <div className="departments">
                {returnDepartments(departmentStats)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div className="page report_page">
        <Navbar current="reports" />
        <div className="report_page_content">
          <h1 className="title">Deparmtens Reports</h1>
          <div className="details">
            <div className="reports"></div>
            <div className="list"></div>
          </div>
        </div>
      </div>
    );
  }
}

function returnDepartments(details) {
  return details?.map((e) => {
    return (
      <div className="department card">
        <img src={e.icon} alt="" />
        <p>{e.name}</p>
      </div>
    );
  });
}

export default RepDepartments;
