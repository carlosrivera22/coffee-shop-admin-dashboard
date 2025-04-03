'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Search,
    Coffee,
    Clock,
    CheckCircle,
    TruckIcon,
    XCircle,
    MoreHorizontal
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

// Types
type OrderStatus = 'pending' | 'processing' | 'delivered' | 'canceled';

interface Order {
    id: string;
    customer: string;
    date: string;
    items: number;
    total: string;
    status: OrderStatus;
}

// Sample data
const ordersData: Order[] = [
    { id: 'ORD-2024-1429', customer: 'Alex Johnson', date: '2024-04-03 08:15 AM', items: 3, total: '$18.75', status: 'delivered' },
    { id: 'ORD-2024-1428', customer: 'Maria Garcia', date: '2024-04-03 08:02 AM', items: 2, total: '$9.50', status: 'processing' },
    { id: 'ORD-2024-1427', customer: 'Sam Taylor', date: '2024-04-03 07:48 AM', items: 4, total: '$24.30', status: 'pending' },
    { id: 'ORD-2024-1426', customer: 'Olivia Chen', date: '2024-04-03 07:36 AM', items: 1, total: '$5.25', status: 'delivered' },
    { id: 'ORD-2024-1425', customer: 'James Williams', date: '2024-04-03 07:15 AM', items: 3, total: '$16.80', status: 'delivered' },
    { id: 'ORD-2024-1424', customer: 'Emma Rodriguez', date: '2024-04-02 05:52 PM', items: 2, total: '$12.50', status: 'canceled' },
    { id: 'ORD-2024-1423', customer: 'Noah Brown', date: '2024-04-02 05:30 PM', items: 5, total: '$32.15', status: 'delivered' },
    { id: 'ORD-2024-1422', customer: 'Sophia Martinez', date: '2024-04-02 04:45 PM', items: 2, total: '$10.75', status: 'processing' },
    { id: 'ORD-2024-1421', customer: 'Liam Wilson', date: '2024-04-02 04:22 PM', items: 3, total: '$15.90', status: 'delivered' },
    { id: 'ORD-2024-1420', customer: 'Isabella Lopez', date: '2024-04-02 03:58 PM', items: 1, total: '$6.25', status: 'pending' },
];

// Helper components
const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statusConfig = {
        pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock size={14} className="mr-1" /> },
        processing: { color: "bg-blue-100 text-blue-800", icon: <Coffee size={14} className="mr-1" /> },
        delivered: { color: "bg-green-100 text-green-800", icon: <CheckCircle size={14} className="mr-1" /> },
        canceled: { color: "bg-red-100 text-red-800", icon: <XCircle size={14} className="mr-1" /> }
    };

    const { color, icon } = statusConfig[status];

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
            {icon}
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default function Orders() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<OrderStatus | 'all'>('all');

    // Filter orders based on search and status
    const filteredOrders = ordersData.filter(order => {
        const matchesSearch =
            order.customer.toLowerCase().includes(search.toLowerCase()) ||
            order.id.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = status === 'all' || order.status === status;

        return matchesSearch && matchesStatus;
    });

    // Count orders by status
    const statusCounts = {
        all: ordersData.length,
        pending: ordersData.filter(o => o.status === 'pending').length,
        processing: ordersData.filter(o => o.status === 'processing').length,
        delivered: ordersData.filter(o => o.status === 'delivered').length,
        canceled: ordersData.filter(o => o.status === 'canceled').length
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Orders</h1>
                <Button className="bg-amber-600 hover:bg-amber-700">
                    Export Orders
                </Button>
            </div>

            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Orders</p>
                            <p className="text-2xl font-bold">{statusCounts.all}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <TruckIcon size={20} className="text-gray-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Pending</p>
                            <p className="text-2xl font-bold">{statusCounts.pending}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Clock size={20} className="text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Processing</p>
                            <p className="text-2xl font-bold">{statusCounts.processing}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Coffee size={20} className="text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Delivered</p>
                            <p className="text-2xl font-bold">{statusCounts.delivered}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle size={20} className="text-green-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                placeholder="Search by order ID or customer..."
                                value={search}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant={status === 'all' ? 'default' : 'outline'}
                                onClick={() => setStatus('all')}
                                className={status === 'all' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                            >
                                All ({statusCounts.all})
                            </Button>
                            <Button
                                variant={status === 'pending' ? 'default' : 'outline'}
                                onClick={() => setStatus('pending')}
                                className={status === 'pending' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                            >
                                Pending ({statusCounts.pending})
                            </Button>
                            <Button
                                variant={status === 'processing' ? 'default' : 'outline'}
                                onClick={() => setStatus('processing')}
                                className={status === 'processing' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                            >
                                Processing ({statusCounts.processing})
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{order.customer}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.items}</TableCell>
                                        <TableCell>{order.total}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={order.status} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                        No orders found matching your search criteria
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}