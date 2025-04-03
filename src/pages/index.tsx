'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Button } from '@/components/ui/button';
import {
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Types
type StatCardProps = {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  description: string;
};

type ProductData = {
  name: string;
  sales: number;
  revenue: string;
  growth: string;
  isPositive: boolean;
};

type SalesData = {
  date: string;
  coffeeRevenue: number;
  teaRevenue: number;
};

// Sample Data
const salesData: SalesData[] = [
  { date: 'Mar 23', coffeeRevenue: 800, teaRevenue: 400 },
  { date: 'Mar 24', coffeeRevenue: 1200, teaRevenue: 600 },
  { date: 'Mar 25', coffeeRevenue: 900, teaRevenue: 700 },
  { date: 'Mar 26', coffeeRevenue: 1500, teaRevenue: 900 },
  { date: 'Mar 27', coffeeRevenue: 1000, teaRevenue: 1000 },
  { date: 'Mar 28', coffeeRevenue: 1300, teaRevenue: 800 },
  { date: 'Mar 29', coffeeRevenue: 1700, teaRevenue: 1200 },
];

const popularProducts: ProductData[] = [
  { name: 'Cafe Latte', sales: 426, revenue: '$1,704.00', growth: '+12.3%', isPositive: true },
  { name: 'Cappuccino', sales: 352, revenue: '$1,408.00', growth: '+8.7%', isPositive: true },
  { name: 'Espresso', sales: 284, revenue: '$852.00', growth: '+5.2%', isPositive: true },
  { name: 'Mocha', sales: 247, revenue: '$1,111.50', growth: '-2.1%', isPositive: false },
  { name: 'Cold Brew', sales: 203, revenue: '$913.50', growth: '+15.8%', isPositive: true },
];

// Components
const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendType, description }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <span
          className={`flex items-center text-sm ${trendType === 'up' ? 'text-green-500' :
            trendType === 'down' ? 'text-red-500' :
              'text-gray-500'
            }`}
        >
          {trendType === 'up' ? <ChevronUp size={16} /> :
            trendType === 'down' ? <ChevronDown size={16} /> : null}
          {trend}
        </span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const [activeTimeFilter, setActiveTimeFilter] = React.useState('week');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Daily Sales"
          value="$892.50"
          trend="+12.5%"
          trendType="up"
          description="Trending up for the past week"
        />
        <StatCard
          title="New Customers"
          value="24"
          trend="-5%"
          trendType="down"
          description="Down from last week"
        />
        <StatCard
          title="Orders Today"
          value="78"
          trend="+8.3%"
          trendType="up"
          description="12 pending fulfillment"
        />
        <StatCard
          title="Top Seller"
          value="Latte"
          trend=""
          trendType="neutral"
          description="28% of daily sales"
        />
      </div>

      {/* Sales Chart */}
      <Card className="mb-8">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                variant={activeTimeFilter === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTimeFilter('day')}
                className={activeTimeFilter === 'day' ? 'bg-slate-900' : ''}
              >
                Day
              </Button>
              <Button
                variant={activeTimeFilter === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTimeFilter('week')}
                className={activeTimeFilter === 'week' ? 'bg-slate-900' : ''}
              >
                Week
              </Button>
              <Button
                variant={activeTimeFilter === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTimeFilter('month')}
                className={activeTimeFilter === 'month' ? 'bg-slate-900' : ''}
              >
                Month
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="coffeeRevenue"
                  stroke="#6F4E37"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Coffee Sales"
                />
                <Line
                  type="monotone"
                  dataKey="teaRevenue"
                  stroke="#C8A27C"
                  strokeWidth={2}
                  name="Tea Sales"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Popular Products */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Products</CardTitle>
          <p className="text-sm text-gray-500">Best selling items this month</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Sales</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {popularProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-right">{product.sales}</TableCell>
                  <TableCell className="text-right">{product.revenue}</TableCell>
                  <TableCell className={`text-right ${product.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {product.growth}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}