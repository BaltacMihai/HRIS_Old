import React from "react";
import { Link, useParams } from "react-router-dom";
import { BarChart } from "../../components/Charts/BarCompare2Values";
import Navbar from "../../components/Navbar";
import useDepartmentStats from "../../hooks/getDepartmentStats";

function RepDepartments() {
  let { departmentId } = useParams();
  let departmentStats = useDepartmentStats(departmentId);

  console.log(departmentStats);

  if (departmentStats)
    return (
      <div className="page report_page report_page-dep">
        <Navbar current="reports" />
        <div className="report_page_content">
          <div className="card">
            <h1 className="title">
              {departmentStats.name} <span>department reports </span>
            </h1>
          </div>
          <div className="actions">
            <button>See Members</button>
            <button>See Projects</button>
          </div>
          <div className="details">
            <div className="row">
              <div className="reports card">
                <h3>Task vs Meetings</h3>
                <BarChart
                  name="Task vs Meetings"
                  firstElement={{ name: "Tasks", value: departmentStats.Tasks }}
                  secondElement={{
                    name: "Meetings",
                    value: departmentStats.Meeting,
                  }}
                />
                <div className="details">
                  <h4>Summary:</h4>
                  <p>
                    Number of Tasks: <span>{departmentStats.Tasks}</span>
                  </p>
                  <p>
                    Number of Meetings: <span>{departmentStats.Meeting}</span>
                  </p>
                </div>
              </div>
              <div className="reports card">
                <h3>Projects vs Members</h3>
                <BarChart
                  name="Projects vs Members"
                  firstElement={{
                    name: "Projects",
                    value: departmentStats.noProjects,
                  }}
                  secondElement={{
                    name: "Members",
                    value: departmentStats.noUsers,
                  }}
                />
                <div className="details">
                  <h4>Summary:</h4>
                  <p>
                    Number of Projects:{" "}
                    <span>{departmentStats.noProjects}</span>
                  </p>
                  <p>
                    Number of Users: <span>{departmentStats.noUsers}</span>
                  </p>
                </div>
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
