import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const TemperatureChart = ({ hourly = [] }) => {
  const labels = hourly.map((h) => h.timeLabel);
  const temps = hourly.map((h) => h.temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temp (°C) next 24h',
        data: temps,
        borderColor: 'rgba(99, 179, 237, 1)',
        backgroundColor: 'rgba(99, 179, 237, 0.2)',
        tension: 0.35,
        pointRadius: 3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        ticks: { color: '#cbd5e1' },
        grid: { color: 'rgba(255,255,255,0.08)' },
      },
      x: {
        ticks: { color: '#cbd5e1' },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="card chart-card">
      <div className="card-header">Today's Temperature</div>
      <div style={{ height: 240 }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default TemperatureChart;


