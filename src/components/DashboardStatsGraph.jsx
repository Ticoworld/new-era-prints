import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';

const DashboardStatsGraph = ({ pendingOrdersCount, completedOrdersCount }) => {
  // Prepare data for the graph
  const data = [
    { name: 'Pending Orders', value: pendingOrdersCount },
    { name: 'Completed Orders', value: completedOrdersCount },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Different colors for each bar */}
        <Bar dataKey="value" fill="#82ca9d" name="Orders Count" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardStatsGraph;
