import { SidebarTrigger } from "@/components/base/sidebar";
import { Button } from "@/components/base/button";
import { Bell, Search, LogOut, Settings, User, Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";
import { Input } from "@/components/base/input";
import { Badge } from "@/components/base/badge";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-white/80 backdrop-blur-md px-6">
      {/* Left Section */}
      <div className="flex items-center gap-5">
        {/* Mobile Sidebar Trigger */}
        <SidebarTrigger className="lg:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition" />

        {/* Optional: Breadcrumbs or Page Title */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-black-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            V
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Valyron ERP</h1>
            <p className="text-xs text-gray-500 -mt-1">Business Management Suite</p>
          </div>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search invoices, customers, orders, products..."
            className="pl-10 pr-4 py-2 w-96 bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-300 transition"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Company Switcher (Optional but looks pro) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">Valyron Labs</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Switch Company</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Valyron Labs Pvt Ltd</DropdownMenuItem>
            <DropdownMenuItem>Valyron Solutions</DropdownMenuItem>
            <DropdownMenuItem className="text-blue-600">+ Add New Company</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 hover:bg-gray-100 rounded-full pr-3">
              <Avatar className="h-9 w-9 ring-2 ring-gray-200">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-gray-900">Prasad A</p>
                <p className="text-xs text-gray-500">admin@valyronlabs.com</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Prasad A</p>
                <p className="text-xs text-muted-foreground">admin@valyronlabs.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}