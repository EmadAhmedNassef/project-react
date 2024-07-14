import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TransactionsGraph({ transactions }) {
  const dates = transactions.map((transaction) => transaction.date);
  const amounts = transactions.map((transaction) => transaction.amount);
  
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Total Transaction Amount",
        data: amounts,
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        time: {
          unit: "day",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
