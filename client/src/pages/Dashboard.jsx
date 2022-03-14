import React from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="page dashboard">
      <Navbar current="dashboard" />
      <p>Dashboard</p>
    </div>
  );
}

export default Dashboard;
