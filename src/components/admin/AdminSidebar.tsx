import { Home, ImagePlay, MessageSquareQuote, Search, Settings, SlidersHorizontal } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export interface AdminNavItem {
  to: string;
  label: string;
  description: string;
  icon: typeof Home;
}

export const adminNavItems: AdminNavItem[] = [
  {
    to: "/admin/home",
    label: "Home",
    description: "Homepage sections and featured selections",
    icon: Home,
  },
  {
    to: "/admin/portfolio",
    label: "Portfolio",
    description: "Portfolio categories and film entries",
    icon: ImagePlay,
  },
  {
    to: "/admin/testimonials",
    label: "Testimonials",
    description: "Testimonials page copy and client stories",
    icon: MessageSquareQuote,
  },
  {
    to: "/admin/services",
    label: "Services",
    description: "Services content and FAQ items",
    icon: SlidersHorizontal,
  },
  {
    to: "/admin/site",
    label: "Site",
    description: "Brand settings, contact details, socials, and footer",
    icon: Settings,
  },
  {
    to: "/admin/seo",
    label: "SEO",
    description: "Route metadata and page-level search content",
    icon: Search,
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { user, signOut } = useAdminAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/50 px-3 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">Serenity</p>
          <p className="mt-1 text-sm font-semibold text-sidebar-foreground">Admin Workspace</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => {
                const isActive = location.pathname === item.to;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                      <NavLink to={item.to}>
                        <Icon />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-3">
          <p className="truncate text-sm font-medium text-sidebar-foreground">{user?.email ?? "Admin user"}</p>
          <p className="mt-1 text-xs text-sidebar-foreground/70">Authenticated with Supabase</p>
        </div>
        <Button variant="outline" className="justify-start" onClick={() => void signOut()}>
          Log out
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
