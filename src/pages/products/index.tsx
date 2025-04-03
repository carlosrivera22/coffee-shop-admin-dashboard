import React, { useState } from 'react';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Search,
    Plus,
    FileDown,
    Star,
    Coffee,
    CupSoda,
    Sandwich,
    Croissant,
    Edit,
    Eye,
    MoreHorizontal,
    Filter,
    ToggleLeft
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
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

// Types
type ProductCategory = 'coffee' | 'tea' | 'food' | 'bakery';

interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    price: string;
    costPrice: string;
    profit: string;
    stock: number;
    sales: number;
    rating: number;
    active: boolean;
    featured: boolean;
    image: string;
    description: string;
}

// Sample data
const productsData: Product[] = [
    {
        id: 'PRD-001',
        name: 'Espresso',
        category: 'coffee',
        price: '$3.50',
        costPrice: '$0.85',
        profit: '$2.65',
        stock: 0,
        sales: 842,
        rating: 4.8,
        active: true,
        featured: true,
        image: '/coffee1.jpg',
        description: 'Rich, full-bodied espresso shot'
    },
    {
        id: 'PRD-002',
        name: 'Cappuccino',
        category: 'coffee',
        price: '$4.75',
        costPrice: '$1.25',
        profit: '$3.50',
        stock: 0,
        sales: 756,
        rating: 4.7,
        active: true,
        featured: true,
        image: '/coffee2.jpg',
        description: 'Equal parts espresso, steamed milk, and milk foam'
    },
    {
        id: 'PRD-003',
        name: 'Latte',
        category: 'coffee',
        price: '$4.95',
        costPrice: '$1.35',
        profit: '$3.60',
        stock: 0,
        sales: 912,
        rating: 4.9,
        active: true,
        featured: true,
        image: '/coffee3.jpg',
        description: 'Espresso with steamed milk and a light layer of foam'
    },
    {
        id: 'PRD-004',
        name: 'Cold Brew',
        category: 'coffee',
        price: '$4.50',
        costPrice: '$1.10',
        profit: '$3.40',
        stock: 48,
        sales: 634,
        rating: 4.6,
        active: true,
        featured: false,
        image: '/coffee4.jpg',
        description: '12-hour steeped cold brew coffee'
    },
    {
        id: 'PRD-005',
        name: 'Green Tea',
        category: 'tea',
        price: '$3.95',
        costPrice: '$0.75',
        profit: '$3.20',
        stock: 35,
        sales: 428,
        rating: 4.4,
        active: true,
        featured: false,
        image: '/tea1.jpg',
        description: 'Japanese green tea, delicate and refreshing'
    },
    {
        id: 'PRD-006',
        name: 'Earl Grey Tea',
        category: 'tea',
        price: '$3.75',
        costPrice: '$0.65',
        profit: '$3.10',
        stock: 42,
        sales: 385,
        rating: 4.3,
        active: true,
        featured: false,
        image: '/tea2.jpg',
        description: 'Black tea infused with bergamot oil'
    },
    {
        id: 'PRD-007',
        name: 'Avocado Toast',
        category: 'food',
        price: '$8.95',
        costPrice: '$3.25',
        profit: '$5.70',
        stock: 12,
        sales: 245,
        rating: 4.7,
        active: true,
        featured: true,
        image: '/food1.jpg',
        description: 'Smashed avocado on artisan sourdough with chili flakes'
    },
    {
        id: 'PRD-008',
        name: 'Breakfast Sandwich',
        category: 'food',
        price: '$7.95',
        costPrice: '$2.85',
        profit: '$5.10',
        stock: 8,
        sales: 312,
        rating: 4.6,
        active: true,
        featured: false,
        image: '/food2.jpg',
        description: 'Egg, cheese, and bacon on a toasted bagel'
    },
    {
        id: 'PRD-009',
        name: 'Chocolate Croissant',
        category: 'bakery',
        price: '$4.25',
        costPrice: '$1.45',
        profit: '$2.80',
        stock: 15,
        sales: 486,
        rating: 4.8,
        active: true,
        featured: true,
        image: '/bakery1.jpg',
        description: 'Buttery croissant with rich chocolate filling'
    },
    {
        id: 'PRD-010',
        name: 'Blueberry Muffin',
        category: 'bakery',
        price: '$3.95',
        costPrice: '$1.25',
        profit: '$2.70',
        stock: 18,
        sales: 354,
        rating: 4.5,
        active: true,
        featured: false,
        image: '/bakery2.jpg',
        description: 'Moist muffin packed with fresh blueberries'
    },
    {
        id: 'PRD-011',
        name: 'Seasonal Latte',
        category: 'coffee',
        price: '$5.50',
        costPrice: '$1.65',
        profit: '$3.85',
        stock: 0,
        sales: 124,
        rating: 4.2,
        active: false,
        featured: false,
        image: '/coffee5.jpg',
        description: 'Limited edition seasonal flavored latte'
    },
    {
        id: 'PRD-012',
        name: 'Cinnamon Roll',
        category: 'bakery',
        price: '$4.50',
        costPrice: '$1.35',
        profit: '$3.15',
        stock: 0,
        sales: 278,
        rating: 4.7,
        active: false,
        featured: false,
        image: '/bakery3.jpg',
        description: 'Freshly baked cinnamon roll with cream cheese frosting'
    }
];

// Helper component for star rating
const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-500 text-amber-500" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
    );
};

// Helper component for category badge
const CategoryBadge: React.FC<{ category: ProductCategory }> = ({ category }) => {
    const categoryConfig = {
        coffee: { color: "bg-amber-100 text-amber-800", icon: <Coffee size={14} className="mr-1" /> },
        tea: { color: "bg-green-100 text-green-800", icon: <CupSoda size={14} className="mr-1" /> },
        food: { color: "bg-blue-100 text-blue-800", icon: <Sandwich size={14} className="mr-1" /> },
        bakery: { color: "bg-purple-100 text-purple-800", icon: <Croissant size={14} className="mr-1" /> }
    };

    const { color, icon } = categoryConfig[category];

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
            {icon}
            {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
    );
};

// Product Card component for grid view
const ProductCard: React.FC<{ product: Product, onToggleActive: (id: string) => void }> = ({ product, onToggleActive }) => {
    return (
        <Card className="overflow-hidden">
            <div className="h-48 bg-gray-100 relative">
                {product.featured && (
                    <div className="absolute top-2 left-2">
                        <Badge className="bg-amber-500">Featured</Badge>
                    </div>
                )}
                {!product.active && (
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <Badge variant="outline" className="bg-gray-800 text-white border-gray-600">Inactive</Badge>
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <CategoryBadge category={product.category} />
                </div>
            </div>
            <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.id}</p>
                    </div>
                    <RatingStars rating={product.rating} />
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="font-semibold">{product.price}</span>
                    <span className="text-xs text-gray-500">{product.sales} sold</span>
                </div>
                <div className="mt-4 flex justify-between">
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={product.active}
                            onCheckedChange={() => onToggleActive(product.id)}
                        />
                        <span className="text-xs">{product.active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <MoreHorizontal size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                                <Edit size={14} className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                                <Eye size={14} className="mr-2" /> View
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    );
};

export default function Products() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [showInactive, setShowInactive] = useState(true);
    const [products, setProducts] = useState<Product[]>(productsData);

    // Filter products based on search, category, and active status
    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.id.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = category === 'all' || product.category === category;

        const matchesActiveState = showInactive || product.active;

        return matchesSearch && matchesCategory && matchesActiveState;
    });

    // Category counts
    const categoryCounts = {
        all: products.length,
        coffee: products.filter(product => product.category === 'coffee').length,
        tea: products.filter(product => product.category === 'tea').length,
        food: products.filter(product => product.category === 'food').length,
        bakery: products.filter(product => product.category === 'bakery').length
    };

    // Featured products
    const featuredProducts = products.filter(product => product.featured);

    // Toggle product active status
    const handleToggleActive = (id: string) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, active: !product.active } : product
            )
        );
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                        <FileDown size={16} />
                        Export
                    </Button>
                    <Button className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2">
                        <Plus size={16} />
                        Add Product
                    </Button>
                </div>
            </div>

            {/* Product Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Products</p>
                            <p className="text-2xl font-bold">{products.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <Coffee size={20} className="text-gray-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Active Products</p>
                            <p className="text-2xl font-bold">{products.filter(p => p.active).length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <ToggleLeft size={20} className="text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Featured Products</p>
                            <p className="text-2xl font-bold">{featuredProducts.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <Star size={20} className="text-amber-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Categories</p>
                            <p className="text-2xl font-bold">4</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Filter size={20} className="text-blue-600" />
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
                                placeholder="Search products..."
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
                                    <SelectItem value="all">All Categories ({categoryCounts.all})</SelectItem>
                                    <SelectItem value="coffee">Coffee ({categoryCounts.coffee})</SelectItem>
                                    <SelectItem value="tea">Tea ({categoryCounts.tea})</SelectItem>
                                    <SelectItem value="food">Food ({categoryCounts.food})</SelectItem>
                                    <SelectItem value="bakery">Bakery ({categoryCounts.bakery})</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="show-inactive" className="text-sm text-gray-600 cursor-pointer">
                                Show Inactive
                            </label>
                            <Switch
                                id="show-inactive"
                                checked={showInactive}
                                onCheckedChange={setShowInactive}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                                className={viewMode === 'grid' ? 'bg-slate-900' : ''}
                            >
                                Grid
                            </Button>
                            <Button
                                variant={viewMode === 'table' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('table')}
                                className={viewMode === 'table' ? 'bg-slate-900' : ''}
                            >
                                Table
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Product Listings */}
            {viewMode === 'grid' ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onToggleActive={handleToggleActive}
                        />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No products found matching your criteria
                        </div>
                    )}
                </div>
            ) : (
                // Table View
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">Status</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Profit</TableHead>
                                    <TableHead>Sales</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Switch
                                                        checked={product.active}
                                                        onCheckedChange={() => handleToggleActive(product.id)}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded bg-gray-100 mr-3 flex-shrink-0"></div>
                                                    <div>
                                                        <div className="font-medium flex items-center">
                                                            {product.name}
                                                            {product.featured && (
                                                                <Badge className="ml-2 bg-amber-500">Featured</Badge>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500">{product.id}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <CategoryBadge category={product.category} />
                                            </TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>
                                                <span className="text-green-600">{product.profit}</span>
                                            </TableCell>
                                            <TableCell>{product.sales}</TableCell>
                                            <TableCell>
                                                <RatingStars rating={product.rating} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal size={16} />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className="flex items-center">
                                                            <Edit size={14} className="mr-2" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex items-center">
                                                            <Eye size={14} className="mr-2" /> View
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                            No products found matching your criteria
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}