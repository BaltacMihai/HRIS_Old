import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Projects from "./pages/Projects";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Tasks from "./pages/Tasks";

function Main() {
  const username = 1;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard userId={username} />} />
        <Route path="/calendar" element={<Calendar userId={username} />} />
        <Route path="/meetings" element={<Meetings userId={username} />} />
        <Route path="/projects" element={<Projects userId={username} />} />
        <Route path="/tasks" element={<Tasks userId={username} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
