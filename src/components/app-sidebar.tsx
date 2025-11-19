import * as React from "react"
import {
  BookOpen,
  Command,
  Home,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Administrator",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Data Sektoral",
      icon: SquareTerminal,
      isActive: false,
      items: [
        { title: "Data Sektoral", url: "/data-sektoral" },
        { title: "Relokasi Sektoral", url: "/relokasi-sektoral" },
      ],
    },
    {
      title: "Monitoring",
      url: "/monitoring-data",
      icon: BookOpen,
    },
    {
      title: "Reference Data",
      icon: Settings2,
      items: [
        { title: "Data OPD", url: "/data-opd" },
        { title: "Data Urusan", url: "/data-urusan" },
        { title: "Data Buku Digital", url: "/data-buku" },
      ],
    },
    {
      title: "Akun User",
      icon: SquareTerminal,
      items: [
        { title: "Akun Kepala Bidang", url: "/akun-kepala-bidang" },
        { title: "Akun Kepala Dinas", url: "/akun-kepala-dinas" },
      ],
    },
  ],

  navSecondary: [],

  projects: [],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/profile">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Administrator</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
