import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const pieData = {
  labels: ['Sold', 'Returned'],
  datasets: [
    {
      label: 'Invoices',
      data: [120, 40],
      backgroundColor: ['#4caf50', '#f44336'],
      borderWidth: 1
    }
  ]
};

export default function PieChart() {
  return (
    <>
      <div className="max-h-[300px]">
        <Pie data={pieData} />
      </div>
    </>
  );
}
