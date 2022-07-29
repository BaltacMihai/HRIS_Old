import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useUsers from "../hooks/getUsers";
import useData from "../hooks/useData";
import { DEPARTMENT_URL } from "../routes";
import useNavbarOption from "../utils/useNavbarOption";

function SearchUser() {
  let { departmentId } = useParams();
  let user = useUsers(departmentId);
  let departmentName = useData(DEPARTMENT_URL.GET(departmentId));
  let departmentStats = useData(DEPARTMENT_URL.GET_STATS);
  let listOfDepartments;
  useNavbarOption("reports");

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
        {returnContent(user, departmentName, listOfDepartments)}
      </div>
    );
  } else {
    return <div className="page projects"></div>;
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
