import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  Users, 
  DollarSign, 
  Activity, 
  Moon, 
  Sun, 
  ChevronDown 
} from 'lucide-react';
import Nav from '../Nav.jsx';

// Mock data for analytics
const monthlyUserData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 450 },
  { name: 'May', users: 600 },
  { name: 'Jun', users: 550 }
];

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 }
];

const userSourceData = [
  { name: 'Direct', value: 400 },
  { name: 'Social Media', value: 300 },
  { name: 'Referral', value: 200 },
  { name: 'Email', value: 100 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  // State management
  const [theme, setTheme] = useState('light');
  const [timeframe, setTimeframe] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('users');

  // Theme toggle effect
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDarkMode);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Key metrics
  const keyMetrics = [
    {
      icon: <Users />,
      title: 'Total Users',
      value: '12,345',
      change: '+15.3%',
      color: 'text-green-500'
    },
    {
      icon: <DollarSign />,
      title: 'Revenue',
      value: '$45,678',
      change: '+22.1%',
      color: 'text-blue-500'
    },
    {
      icon: <Activity />,
      title: 'Conversion Rate',
      value: '3.5%',
      change: '+5.2%',
      color: 'text-purple-500'
    }
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <p className="text-gray-600 dark:text-gray-300">{label}</p>
          <p className="font-bold text-gray-900 dark:text-gray-100">
            {payload[0].dataKey}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex bg-white dark:bg-gray-900 min-h-screen">
      {/* Fixed Navigation */}
      <Nav />

      {/* Main Content with Left Margin */}
      <div className="ml-64 flex-1 p-8">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Insights into your business performance</p>
        </header>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <div className={`p-3 rounded-full bg-white dark:bg-gray-700 ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className={`${metric.color} font-semibold`}>
                  {metric.change}
                </div>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 mb-2">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Chart Container */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {selectedMetric === 'users' ? 'Monthly Users' : 'Monthly Revenue'}
              </h2>
              <div className="relative">
                <select 
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md pl-3 pr-8 py-2 text-gray-900 dark:text-gray-100"
                >
                  <option value="users">Users</option>
                  <option value="revenue">Revenue</option>
                </select>
                <ChevronDown 
                  size={20} 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 pointer-events-none" 
                />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart 
                data={selectedMetric === 'users' ? monthlyUserData : revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} 
                />
                <XAxis 
                  dataKey="name" 
                  stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric === 'users' ? 'users' : 'revenue'}
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              User Acquisition Sources
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userSourceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {userSourceData.map((entry, index) => (
                <div 
                  key={entry.name} 
                  className="flex items-center space-x-2"
                >
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;