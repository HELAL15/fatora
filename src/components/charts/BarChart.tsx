import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  PointElement,
  LinearScale,
  BarElement,
  RadialLinearScale,
  LineElement,

  Tooltip,
  Legend
);

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [
    {
      label: 'Total Invoices',
      data: [150, 200, 180, 220],
      backgroundColor: ['#2196f3', '#219624', '#219689', '#281120', '#219600']
    }
  ]
};

export default function BarChart() {
  return (
    <>
      <Bar data={barData} />
    </>
  );
}
