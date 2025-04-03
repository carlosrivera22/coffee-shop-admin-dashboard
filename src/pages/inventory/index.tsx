import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Search,
    Plus,
    FileDown,
    AlertTriangle,
    Coffee,
    Milk,
    Leaf,
    Package,
    RefreshCw,
    MoreHorizontal,
    Filter
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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Types
interface InventoryItem {
    id: string;
    name: string;
    category: 'beans' | 'dairy' | 'syrups' | 'supplies';
    stock: number;
    unit: string;
    minLevel: number;
    maxLevel: number;
    reorderLevel: number;
    supplier: string;
    lastOrdered: string;
    price: string;
}

// Helper function to get stock status
const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.stock / item.maxLevel) * 100;

    if (item.stock <= item.reorderLevel) {
        return {
            status: 'low',
            color: 'bg-red-600',
            percentage,
            text: 'Low Stock'
        };
    } else if (item.stock <= item.minLevel) {
        return {
            status: 'warning',
            color: 'bg-yellow-500',
            percentage,
            text: 'Running Low'
        };
    } else {
        return {
            status: 'ok',
            color: 'bg-green-600',
            percentage,
            text: 'In Stock'
        };
    }
};

// Sample data
const inventoryData: InventoryItem[] = [
    {
        id: 'INV-001',
        name: 'Colombian Coffee Beans',
        category: 'beans',
        stock: 25,
        unit: 'lb',
        minLevel: 20,
        maxLevel: 100,
        reorderLevel: 15,
        supplier: 'Coffee Farms Inc.',
        lastOrdered: '2024-03-15',
        price: '$15.99/lb'
    },
    {
        id: 'INV-002',
        name: 'Ethiopian Coffee Beans',
        category: 'beans',
        stock: 42,
        unit: 'lb',
        minLevel: 30,
        maxLevel: 100,
        reorderLevel: 20,
        supplier: 'Global Bean Co.',
        lastOrdered: '2024-03-20',
        price: '$18.50/lb'
    },
    {
        id: 'INV-003',
        name: 'Organic Whole Milk',
        category: 'dairy',
        stock: 12,
        unit: 'gal',
        minLevel: 15,
        maxLevel: 50,
        reorderLevel: 10,
        supplier: 'Local Dairy',
        lastOrdered: '2024-04-01',
        price: '$5.99/gal'
    },
    {
        id: 'INV-004',
        name: 'Almond Milk',
        category: 'dairy',
        stock: 8,
        unit: 'gal',
        minLevel: 10,
        maxLevel: 30,
        reorderLevel: 5,
        supplier: 'Plant Basics',
        lastOrdered: '2024-03-28',
        price: '$7.50/gal'
    },
    {
        id: 'INV-005',
        name: 'Vanilla Syrup',
        category: 'syrups',
        stock: 5,
        unit: 'bottles',
        minLevel: 8,
        maxLevel: 20,
        reorderLevel: 3,
        supplier: 'Flavor Co.',
        lastOrdered: '2024-03-10',
        price: '$12.99/bottle'
    },
    {
        id: 'INV-006',
        name: 'Caramel Syrup',
        category: 'syrups',
        stock: 7,
        unit: 'bottles',
        minLevel: 8,
        maxLevel: 20,
        reorderLevel: 3,
        supplier: 'Flavor Co.',
        lastOrdered: '2024-03-10',
        price: '$12.99/bottle'
    },
    {
        id: 'INV-007',
        name: 'To-Go Cups (12oz)',
        category: 'supplies',
        stock: 350,
        unit: 'pcs',
        minLevel: 300,
        maxLevel: 1000,
        reorderLevel: 200,
        supplier: 'Supply Chain Inc.',
        lastOrdered: '2024-03-25',
        price: '$0.15/pc'
    },
    {
        id: 'INV-008',
        name: 'To-Go Cups (16oz)',
        category: 'supplies',
        stock: 150,
        unit: 'pcs',
        minLevel: 300,
        maxLevel: 1000,
        reorderLevel: 200,
        supplier: 'Supply Chain Inc.',
        lastOrdered: '2024-03-25',
        price: '$0.18/pc'
    },
    {
        id: 'INV-009',
        name: 'Cup Lids',
        category: 'supplies',
        stock: 400,
        unit: 'pcs',
        minLevel: 300,
        maxLevel: 1000,
        reorderLevel: 200,
        supplier: 'Supply Chain Inc.',
        lastOrdered: '2024-03-25',
        price: '$0.05/pc'
    },
    {
        id: 'INV-010',
        name: 'Napkins',
        category: 'supplies',
        stock: 800,
        unit: 'pcs',
        minLevel: 500,
        maxLevel: 2000,
        reorderLevel: 300,
        supplier: 'Supply Chain Inc.',
        lastOrdered: '2024-03-25',
        price: '$0.02/pc'
    },
];

export default function Inventory() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<string>('all');
    const [activeTab, setActiveTab] = useState('all');

    // Get low stock items
    const lowStockItems = inventoryData.filter(item => item.stock <= item.reorderLevel);

    // Filter inventory based on search, category, and tab
    const filteredInventory = inventoryData.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.id.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = category === 'all' || item.category === category;

        const matchesTab =
            activeTab === 'all' ||
            (activeTab === 'low-stock' && item.stock <= item.reorderLevel);

        return matchesSearch && matchesCategory && matchesTab;
    });

    // Category counts
    const categoryCounts = {
        all: inventoryData.length,
        beans: inventoryData.filter(item => item.category === 'beans').length,
        dairy: inventoryData.filter(item => item.category === 'dairy').length,
        syrups: inventoryData.filter(item => item.category === 'syrups').length,
        supplies: inventoryData.filter(item => item.category === 'supplies').length
    };

    // Category Icon mapping
    const categoryIcons = {
        beans: <Coffee size={20} />,
        dairy: <Milk size={20} />,
        syrups: <Leaf size={20} />,
        supplies: <Package size={20} />
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Inventory Management</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                        <FileDown size={16} />
                        Export
                    </Button>
                    <Button className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2">
                        <Plus size={16} />
                        Add Item
                    </Button>
                </div>
            </div>

            {/* Inventory Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Items</p>
                            <p className="text-2xl font-bold">{inventoryData.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <Package size={20} className="text-gray-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Low Stock Items</p>
                            <p className="text-2xl font-bold">{lowStockItems.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertTriangle size={20} className="text-red-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Coffee Beans</p>
                            <p className="text-2xl font-bold">{categoryCounts.beans}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <Coffee size={20} className="text-amber-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Last Update</p>
                            <p className="text-2xl font-bold">Today</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <RefreshCw size={20} className="text-blue-600" />
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
                                placeholder="Search inventory..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex gap-2 items-center">
                            <Filter size={16} className="text-gray-500" />
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="beans">Coffee Beans</SelectItem>
                                    <SelectItem value="dairy">Dairy Products</SelectItem>
                                    <SelectItem value="syrups">Syrups</SelectItem>
                                    <SelectItem value="supplies">Supplies</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Inventory Tabs and Table */}
            <Card>
                <CardHeader className="pb-0">
                    <CardTitle>Inventory Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-2">
                        <TabsList>
                            <TabsTrigger value="all">All Items</TabsTrigger>
                            <TabsTrigger value="low-stock" className="flex items-center gap-1">
                                <AlertTriangle size={14} className="text-red-500" />
                                Low Stock
                            </TabsTrigger>
                        </TabsList>

                        {/* Tab content */}
                        <TabsContent value="all" className="mt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">Category</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Stock Level</TableHead>
                                        <TableHead>Supplier</TableHead>
                                        <TableHead>Last Ordered</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredInventory.length > 0 ? (
                                        filteredInventory.map((item) => {
                                            const stockStatus = getStockStatus(item);
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                            {categoryIcons[item.category]}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium">{item.name}</div>
                                                            <div className="text-xs text-gray-500">{item.id}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between text-xs">
                                                                <span>{item.stock} {item.unit}</span>
                                                                <span className={stockStatus.status === 'low' ? 'text-red-500' : 'text-gray-500'}>
                                                                    {stockStatus.text}
                                                                </span>
                                                            </div>
                                                            <Progress value={stockStatus.percentage} className={stockStatus.color} />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{item.supplier}</TableCell>
                                                    <TableCell>{item.lastOrdered}</TableCell>
                                                    <TableCell>{item.price}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button variant="outline" size="sm">
                                                                <RefreshCw size={14} />
                                                            </Button>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreHorizontal size={14} />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                                No inventory items found matching your criteria
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TabsContent>

                        <TabsContent value="low-stock" className="mt-4">
                            {/* Same table but filtered for low stock items */}
                            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 flex items-start">
                                <AlertTriangle size={20} className="text-red-500 mr-2 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-red-800">Low Stock Alert</h4>
                                    <p className="text-sm text-red-700">
                                        The following items are below their reorder levels and need to be restocked soon.
                                    </p>
                                </div>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">Category</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Stock Level</TableHead>
                                        <TableHead>Supplier</TableHead>
                                        <TableHead>Last Ordered</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredInventory.length > 0 ? (
                                        filteredInventory.map((item) => {
                                            const stockStatus = getStockStatus(item);
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                            {categoryIcons[item.category]}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium">{item.name}</div>
                                                            <div className="text-xs text-gray-500">{item.id}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between text-xs">
                                                                <span>{item.stock} {item.unit}</span>
                                                                <span className="text-red-500">
                                                                    {stockStatus.text}
                                                                </span>
                                                            </div>
                                                            <Progress value={stockStatus.percentage} className="bg-red-600" />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{item.supplier}</TableCell>
                                                    <TableCell>{item.lastOrdered}</TableCell>
                                                    <TableCell>{item.price}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                                                            Reorder
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                                No low stock items found matching your criteria
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}