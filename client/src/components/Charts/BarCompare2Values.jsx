import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

export const BarChart = ({ firstElement, secondElement, name }) => {
  const [userData, setUserData] = useState({
    labels: [name],
    datasets: [
      {
        label: firstElement.name,
        data: [firstElement.value],
        backgroundColor: ["#ecf0f1"],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: secondElement.name,
        data: [secondElement.value],
        backgroundColor: ["#f3ba2f"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return <Bar data={userData} />;
};
