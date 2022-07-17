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
import FreeDay from "./hooks/postFreeDay";
import FreeDayPage from "./pages/FreeDayPage";

function Main() {
  const cookies = new Cookies();

  //  let login = useLogin("baltacm", "pass");
  let user = cookies.get("user");

  if (user == undefined) {
    return <Login />;
  } else {
    let username = user.id;
    return (
      <BrowserRouter>
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
        </Routes>
        {returnUserPosibilities(user.specialRights)}
      </BrowserRouter>
    );
  }
}

function returnUserPosibilities(role) {
  if (role != "EMPLOYEE") {
    if (role != "SUPPORT")
      return (
        <Routes>
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/departments" element={<RepDepartments />} />
          <Route
            path="/reports/departments/:departmentId"
            element={<RepDepartment />}
          />
          <Route path="/reports/users" element={<RepUser />} />
          <Route path="/reports/users/:departmentId" element={<RepUser />} />
          <Route path="/user/:userId" element={<User />} />
        </Routes>
      );
    else {
      return (
        <Routes>
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
        </Routes>
      );
    }
  } else {
    return (
      <Routes>
        <Route path="/search" element={<SearchUser />} />
        <Route path="/user/:searchedUser" element={<Dashboard />} />
      </Routes>
    );
  }
}

export default Main;
