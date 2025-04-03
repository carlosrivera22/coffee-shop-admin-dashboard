import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import {
    Coffee,
    Plus,
    BarChart2,
    FileText,
    Users,
    ShoppingCart,
    Store,
    PieChart,
    DollarSign,
    UserCircle,
    Menu,
    X
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type NavItemProps = {
    href: string;
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, onClick }) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} legacyBehavior>
            <a className="block" onClick={onClick}>
                <div
                    className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-800 transition-colors ${isActive ? 'border-l-2 border-amber-500 bg-gray-800' : ''
                        }`}
                >
                    <div className="mr-3 text-gray-400">{icon}</div>
                    <span>{text}</span>
                </div>
            </a>
        </Link>
    );
};

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMobileView, setIsMobileView] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Check if we're in a mobile view based on screen width
    useEffect(() => {
        const checkMobileView = () => {
            setIsMobileView(window.innerWidth < 1024);
        };

        // Initial check
        checkMobileView();

        // Add event listener for resize
        window.addEventListener('resize', checkMobileView);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const renderSidebarContent = () => (
        <>
            <div className="p-4 flex items-center">
                <div className="w-8 h-8 bg-amber-600 rounded-md flex items-center justify-center mr-2">
                    <Coffee size={20} />
                </div>
                <h2 className="text-xl font-bold">Bean Brew</h2>
                {isMobileView && (
                    <Button
                        variant="ghost"
                        className="ml-auto text-gray-400 hover:text-white"
                        onClick={closeSidebar}
                    >
                        <X size={24} />
                    </Button>
                )}
            </div>

            <div className="mx-4 my-4">
                <Button className="w-full flex items-center justify-center bg-amber-700 hover:bg-amber-800">
                    <Plus size={16} className="mr-2" /> Quick Create
                </Button>
            </div>

            <nav>
                <NavItem href="/" icon={<BarChart2 size={20} />} text="Dashboard" onClick={closeSidebar} />
                <NavItem href="/orders" icon={<FileText size={20} />} text="Orders" onClick={closeSidebar} />
                <NavItem href="/products" icon={<Coffee size={20} />} text="Products" onClick={closeSidebar} />
                <NavItem href="/customers" icon={<Users size={20} />} text="Customers" onClick={closeSidebar} />
                <NavItem href="/inventory" icon={<ShoppingCart size={20} />} text="Inventory" onClick={closeSidebar} />

                <div className="pt-6 mt-6 border-t border-gray-800">
                    <div className="px-4 mb-2 text-xs text-gray-400">REPORTS</div>
                    <NavItem href="/reports/sales" icon={<PieChart size={20} />} text="Sales Reports" onClick={closeSidebar} />
                    <NavItem href="/reports/products" icon={<ShoppingCart size={20} />} text="Product Analytics" onClick={closeSidebar} />
                    <NavItem href="/reports/financial" icon={<DollarSign size={20} />} text="Financial" onClick={closeSidebar} />
                </div>

                <div className="pt-6 mt-6 border-t border-gray-800">
                    <div className="px-4 mb-2 text-xs text-gray-400">SETTINGS</div>
                    <NavItem href="/settings/account" icon={<UserCircle size={20} />} text="Account" onClick={closeSidebar} />
                    <NavItem href="/settings/store" icon={<Store size={20} />} text="Store Settings" onClick={closeSidebar} />
                </div>
            </nav>

            <div className="mt-auto p-4 border-t border-gray-800 flex items-center">
                <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                    BB
                </div>
                <div>
                    <div className="text-sm font-medium">Barista Admin</div>
                    <div className="text-xs text-gray-400">admin@beanbrew.com</div>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Desktop Sidebar - Shown on larger screens */}
            {!isMobileView && (
                <aside className="w-64 bg-gray-900 text-white flex flex-col">
                    {renderSidebarContent()}
                </aside>
            )}

            {/* Mobile Header and Sheet Sidebar */}
            {isMobileView && (
                <div className="fixed top-0 left-0 right-0 z-10 bg-gray-900 text-white flex items-center p-3">
                    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="text-white p-2">
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64 bg-gray-900 text-white flex flex-col h-full">
                            {renderSidebarContent()}
                        </SheetContent>
                    </Sheet>

                    <div className="flex items-center ml-2">
                        <div className="w-6 h-6 bg-amber-600 rounded-md flex items-center justify-center mr-2">
                            <Coffee size={14} />
                        </div>
                        <h2 className="text-lg font-bold">Bean Brew</h2>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className={`flex-1 overflow-y-auto ${isMobileView ? 'pt-16' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;