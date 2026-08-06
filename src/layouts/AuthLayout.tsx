import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import { Navbar } from "@/components/navbar.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Fixed Navbar */}
          <Navbar />

          {/* Page Content - Starts below fixed navbar */}
          <main className="flex-1 pt-16 overflow-y-auto">
            <div className="p-6 max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}