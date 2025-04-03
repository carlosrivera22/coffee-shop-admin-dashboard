import React, { useState } from 'react';
import {
    Card,
    CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Search,
    UserPlus,
    Users,
    Star,
    TrendingUp,
    Mail,
    Phone,
    MoreHorizontal,
    Filter,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Types
type CustomerTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    lastOrder: string;
    totalSpent: string;
    orderCount: number;
    tier: CustomerTier;
}

// Sample data
const customersData: Customer[] = [
    {
        id: 'CUST-001',
        name: 'Emma Johnson',
        email: 'emma.j@example.com',
        phone: '(555) 123-4567',
        lastOrder: '2024-03-28',
        totalSpent: '$485.75',
        orderCount: 42,
        tier: 'gold'
    },
    {
        id: 'CUST-002',
        name: 'Michael Chen',
        email: 'mchen@example.com',
        phone: '(555) 987-6543',
        lastOrder: '2024-04-01',
        totalSpent: '$279.30',
        orderCount: 23,
        tier: 'silver'
    },
    {
        id: 'CUST-003',
        name: 'Sophia Rodriguez',
        email: 'sophia.r@example.com',
        phone: '(555) 234-5678',
        lastOrder: '2024-04-02',
        totalSpent: '$728.40',
        orderCount: 65,
        tier: 'platinum'
    },
    {
        id: 'CUST-004',
        name: 'James Wilson',
        email: 'jwilson@example.com',
        phone: '(555) 345-6789',
        lastOrder: '2024-03-15',
        totalSpent: '$142.15',
        orderCount: 13,
        tier: 'bronze'
    },
    {
        id: 'CUST-005',
        name: 'Olivia Kim',
        email: 'olivia.k@example.com',
        phone: '(555) 456-7890',
        lastOrder: '2024-04-03',
        totalSpent: '$563.90',
        orderCount: 48,
        tier: 'gold'
    }
];

// Helper component for customer tier badge
const TierBadge: React.FC<{ tier: CustomerTier }> = ({ tier }) => {
    const tierColors = {
        bronze: "bg-amber-100 text-amber-800",
        silver: "bg-gray-100 text-gray-800",
        gold: "bg-yellow-100 text-yellow-800",
        platinum: "bg-indigo-100 text-indigo-800"
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tierColors[tier]}`}>
            <Star size={12} className="mr-1" />
            {tier.charAt(0).toUpperCase() + tier.slice(1)}
        </span>
    );
};

export default function Customers() {
    const [search, setSearch] = useState('');
    const [tierFilter, setTierFilter] = useState<string>('all');

    // Filter customers based on search and tier filter
    const filteredCustomers = customersData.filter(customer => {
        const matchesSearch =
            customer.name.toLowerCase().includes(search.toLowerCase()) ||
            customer.email.toLowerCase().includes(search.toLowerCase()) ||
            customer.id.toLowerCase().includes(search.toLowerCase());

        const matchesTier = tierFilter === 'all' || customer.tier === tierFilter;

        return matchesSearch && matchesTier;
    });

    // Tier counts
    const tierCounts = {
        all: customersData.length,
        bronze: customersData.filter(c => c.tier === 'bronze').length,
        silver: customersData.filter(c => c.tier === 'silver').length,
        gold: customersData.filter(c => c.tier === 'gold').length,
        platinum: customersData.filter(c => c.tier === 'platinum').length
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Customers</h1>
                <Button className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2">
                    <UserPlus size={16} />
                    Add Customer
                </Button>
            </div>

            {/* Customer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Customers</p>
                            <p className="text-2xl font-bold">{customersData.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <Users size={20} className="text-gray-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Gold & Platinum</p>
                            <p className="text-2xl font-bold">{tierCounts.gold + tierCounts.platinum}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <Star size={20} className="text-amber-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Recent Orders</p>
                            <p className="text-2xl font-bold">
                                {customersData.filter(c => {
                                    const lastOrderDate = new Date(c.lastOrder);
                                    const sevenDaysAgo = new Date();
                                    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                                    return lastOrderDate >= sevenDaysAgo;
                                }).length}
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <TrendingUp size={20} className="text-green-600" />
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
                                placeholder="Search customers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex gap-2 items-center">
                            <Filter size={16} className="text-gray-500" />
                            <Select value={tierFilter} onValueChange={setTierFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All Tiers" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Tiers ({tierCounts.all})</SelectItem>
                                    <SelectItem value="bronze">Bronze ({tierCounts.bronze})</SelectItem>
                                    <SelectItem value="silver">Silver ({tierCounts.silver})</SelectItem>
                                    <SelectItem value="gold">Gold ({tierCounts.gold})</SelectItem>
                                    <SelectItem value="platinum">Platinum ({tierCounts.platinum})</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Customers Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Tier</TableHead>
                                <TableHead>Last Order</TableHead>
                                <TableHead>Total Spent</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
                                                    {customer.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{customer.name}</div>
                                                    <div className="text-xs text-gray-500">{customer.id}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-sm gap-1">
                                                <Mail size={14} className="text-gray-400" />
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center text-sm gap-1">
                                                <Phone size={14} className="text-gray-400" />
                                                {customer.phone}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <TierBadge tier={customer.tier} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">{new Date(customer.lastOrder).toLocaleDateString()}</div>
                                            <div className="text-xs text-gray-500">
                                                {Math.floor((new Date().getTime() - new Date(customer.lastOrder).getTime()) / (24 * 60 * 60 * 1000))} days ago
                                            </div>
                                        </TableCell>
                                        <TableCell>{customer.totalSpent}</TableCell>
                                        <TableCell>{customer.orderCount}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                                                    <DropdownMenuItem>Order History</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">Delete Customer</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                        No customers found matching your criteria
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