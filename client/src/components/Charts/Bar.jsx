import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

export const BarChart = ({ date }) => {
  const [userData, setUserData] = useState({
    labels: date.map((data) => data.name),
    datasets: [
      {
        label: "Users",
        data: date.map((data) => data.Users),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Tasks",
        data: date.map((data) => data.Tasks),
        backgroundColor: ["#ecf0f1"],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Meetings",
        data: date.map((data) => data.Meeting),
        backgroundColor: ["#f3ba2f"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return <Bar data={userData} />;
};
