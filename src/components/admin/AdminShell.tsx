import { Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar, { adminNavItems } from "./AdminSidebar";

const AdminShell = () => {
  const location = useLocation();
  const { adminUser, user, signOut } = useAdminAuth();
  const currentNavItem = adminNavItems.find((item) => item.to === location.pathname) ?? adminNavItems[0];

  return (
    <SidebarProvider defaultOpen>
      <AdminSidebar />
      <SidebarInset className="bg-muted/20">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-9 w-9" />
            <div>
              <p className="text-sm font-semibold text-foreground">{currentNavItem.label}</p>
              <p className="text-xs text-muted-foreground">{currentNavItem.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-sm font-medium text-foreground">{user?.email ?? "Admin user"}</p>
              <p className="text-xs capitalize text-muted-foreground">{adminUser?.role ?? "admin"}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => void signOut()}>
              Log out
            </Button>
          </div>
        </header>

        <div className="flex-1 px-4 py-6 md:px-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminShell;
