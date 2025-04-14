import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler 
} from 'chart.js';
import { useTheme } from '../../context/ThemeContext';
import './EarningsChart.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EarningsChart = ({ data, labels, currency = '$', timeframe = 'Weekly' }) => {
  const { theme } = useTheme();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Earnings',
        data,
        fill: true,
        backgroundColor: theme === 'dark' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme === 'dark' ? '#fff' : '#666',
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${currency}${context.raw.toFixed(2)}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#fff' : '#666',
        }
      },
      y: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#fff' : '#666',
          callback: (value) => `${currency}${value}`
        }
      },
    },
  };

  return (
    <div className={`earnings-chart ${theme}`}>
      <div className="chart-header">
        {timeframe} Earnings Overview
      </div>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
      <div className="chart-footer">
        Hover over points for detailed earnings information
      </div>
    </div>
  );
};

export default EarningsChart;