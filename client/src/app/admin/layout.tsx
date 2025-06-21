import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-background flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">RojgarHub Admin</h1>
            </div>
          </header>
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
