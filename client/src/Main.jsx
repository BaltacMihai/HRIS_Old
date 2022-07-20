import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Projects from "./pages/Projects";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Tasks from "./pages/Tasks";
import Task from "./pages/Task";
import Meeting from "./pages/Meeting";
import Project from "./pages/Project";
import ProjectDepartment from "./pages/ProjectDepartment";
import Cookies from "universal-cookie";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import RepDepartments from "./pages/reports/RepDepartments";
import RepDepartment from "./pages/reports/RepDepartment";
import RepUser from "./pages/reports/RepUser";
import User from "./pages/User";
import SearchUser from "./pages/SearchUser";
import FreeDayPage from "./pages/FreeDayPage";

function Main() {
  const cookies = new Cookies();

  //  let login = useLogin("baltacm", "pass");
  let user = cookies.get("user");
  let username = user.id;
  return (
    <Routes>
      <Route path="/" element={<Dashboard userId={username} />} />
      <Route path="/calendar" element={<Calendar userId={username} />} />
      <Route path="/meetings" element={<Meetings userId={username} />} />
      <Route path="/projects" element={<Projects userId={username} />} />
      <Route path="/tasks" element={<Tasks userId={username} />} />
      <Route path="/task/:taskId" element={<Task userId={username} />} />
      <Route
        path="/meeting/:meetingId"
        element={<Meeting userId={username} />}
      />
      <Route
        path="/project/:projectId"
        element={<Project userId={username} />}
      />
      <Route
        path="/project/:projectId/department/:departmentId"
        element={<ProjectDepartment userId={username} />}
      />
      <Route
        path="/meetings/:projectId/:departmentId"
        element={<Meetings userId={username} />}
      />
      <Route
        path="/tasks/:projectId/:departmentId"
        element={<Tasks userId={username} />}
      />
      {returnUserPosibilities(user.specialRights)}
    </Routes>
  );
}

function returnUserPosibilities(role) {
  if (role != "EMPLOYEE") {
    if (role != "SUPPORT")
      return (
        <React.Fragment>
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/departments" element={<RepDepartments />} />
          <Route
            path="/reports/departments/:departmentId"
            element={<RepDepartment />}
          />
          <Route path="/reports/users" element={<RepUser />} />
          <Route path="/reports/users/:departmentId" element={<RepUser />} />
          <Route path="/user/:userId" element={<User />} />
        </React.Fragment>
      );
    else {
      return (
        <React.Fragment>
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/departments" element={<RepDepartments />} />
          <Route
            path="/reports/departments/:departmentId"
            element={<RepDepartment />}
          />
          <Route path="/reports/users" element={<RepUser />} />
          <Route path="/reports/users/:departmentId" element={<RepUser />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/freeDay" element={<FreeDayPage />} />
        </React.Fragment>
      );
    }
  } else {
    return (
      <React.Fragment>
        <Route path="/search" element={<SearchUser />} />
        <Route path="/user/:searchedUser" element={<Dashboard />} />
      </React.Fragment>
    );
  }
}

export default Main;
