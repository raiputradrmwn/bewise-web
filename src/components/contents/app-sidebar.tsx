import { Home, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Database",
    url: "/dashboard/database",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-64 bg-gray-100 shadow-lg min-h-screen">
      <SidebarContent>
        <div className="flex items-center justify-center p-4">
          <Link href="/">
            <Image src="/img/logo.svg" alt="logo" width={120} height={40} />
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="w-full">
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-5 px-8 py-5 text-[18px] font-medium text-gray-900 hover:bg-gray-300 rounded-lg transition-all"
                    >
                      <item.icon className="w-8 h-8 text-gray-700" />
                      <span>{item.title}</span>
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
