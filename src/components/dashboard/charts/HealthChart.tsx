import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

interface HealthChartProps {
  type: 'area' | 'bar' | 'line' | 'pie';
  data: Record<string, unknown>[];
  dataKeys: { key: string; color: string; label?: string }[];
  xAxisKey?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
      {label && <p className="font-semibold text-gray-700 mb-1.5">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.name}: <span className="font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

const HealthChart: React.FC<HealthChartProps> = ({
  type, data, dataKeys, xAxisKey = 'day', height = 260, showGrid = true, showLegend = false
}) => {
  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey={dataKeys[0].key} paddingAngle={3}>
            {data.map((_, index) => (
              <Cell key={index} fill={dataKeys[index % dataKeys.length]?.color || '#10B981'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barCategoryGap="30%">
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />}
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16,185,129,0.05)' }} />
          {showLegend && <Legend />}
          {dataKeys.map(dk => (
            <Bar key={dk.key} dataKey={dk.key} name={dk.label || dk.key} fill={dk.color} radius={[6, 6, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <defs>
            {dataKeys.map(dk => (
              <linearGradient key={dk.key} id={`grad_${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={dk.color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={dk.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />}
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend />}
          {dataKeys.map(dk => (
            <Area key={dk.key} type="monotone" dataKey={dk.key} name={dk.label || dk.key}
              stroke={dk.color} fill={`url(#grad_${dk.key})`} strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: dk.color }} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />}
        <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && <Legend />}
        {dataKeys.map(dk => (
          <Line key={dk.key} type="monotone" dataKey={dk.key} name={dk.label || dk.key}
            stroke={dk.color} strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: dk.color }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HealthChart;
