import { Home, Settings, Search } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard", // Pastikan URL sesuai routing
    icon: Home,
  },
  {
    title: "Database",
    url: "/dashboard/database", // URL untuk halaman database
    icon: Settings,
  },
  {
    title: "Search",
    url: "/dashboard/search", // URL untuk halaman pencarian
    icon: Search,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-4 px-6 py-4 text-lg font-medium hover:bg-gray-200 rounded-md transition-all"
                    >
                      <item.icon className="w-6 h-6 text-gray-700" />
                      <span className="text-gray-800">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
