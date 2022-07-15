import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import createUser from "../hooks/createUser";
import useDepartmentsStats from "../hooks/getDepartmentsStats";
import useUsers from "../hooks/getUsers";
import useDeparmtent from "../hooks/useDepartment";

function SearchUser() {
  let { departmentId } = useParams();
  let user = useUsers(departmentId);
  let departmentName = useDeparmtent(departmentId);
  let departmentStats = useDepartmentsStats();
  let listOfDepartments;

  if (departmentStats) {
    listOfDepartments = departmentStats?.map((department) => {
      return {
        name: department.name,
        id: department.id,
      };
    });
  }

  if (user && departmentName) {
    if (departmentName.name == "FREE DAY") departmentName.name = "";
    if (departmentName.name.length > 1)
      listOfDepartments = [
        {
          name: departmentName.name,
          id: departmentId,
        },
      ];

    return (
      <div className="page users">
        <Navbar current={"reports"} />
        {returnContent(user, departmentName, listOfDepartments)}
      </div>
    );
  } else {
    return (
      <div className="page projects">
        <Navbar current={"reports"} />
      </div>
    );
  }
}

function returnContent(user, departmentName, listOfDepartments) {
  return (
    <div className="project_content">
      {returnProjectsContent(user, departmentName)}
    </div>
  );
}

function returnProjectsContent(user, departmentName) {
  let pageName = departmentName.name + " Users ";
  return (
    <div className="project_content_current">
      <div className="header">
        <h2>{pageName}</h2>
      </div>
      <div className="project_content_current_projects">{mapUsers(user)}</div>
    </div>
  );
}

function mapUsers(user) {
  return user?.map((member) => {
    let specialRights =
      member.specialRights == "CEO"
        ? "CEO"
        : "" + member.specialRights == "SUPPORT"
        ? "SUPPORT"
        : "";
    specialRights = specialRights + " member_card_name";
    let link = "/user/" + member.id;
    return (
      <Link to={link}>
        <div className="member_card">
          <img
            className="member_card_photo"
            src={
              member.photo
                ? member.photo
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
            }
          ></img>

          <p className={specialRights}>{member.name}</p>
        </div>
      </Link>
    );
  });
}

export default SearchUser;
