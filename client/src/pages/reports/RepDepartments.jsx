import React from "react";
import { Link } from "react-router-dom";
import { BarChart } from "../../components/Charts/BarDepartments";
import Navbar from "../../components/Navbar";
import useDepartmentsStats from "../../hooks/getDepartmentsStats";

function RepDepartments() {
  let departmentStats = useDepartmentsStats();

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
              <h3>Comparison of Departments</h3>
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
    let link = "/reports/departments/" + e.id;
    return (
      <Link to={link}>
        <div className="department card">
          <img src={e.icon} alt="" />
          <p>{e.name}</p>
        </div>
      </Link>
    );
  });
}

export default RepDepartments;
