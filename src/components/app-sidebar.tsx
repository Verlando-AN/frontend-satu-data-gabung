import * as React from "react"
import {
  BookOpen,
  Command,
  Settings2,
  Database,
  Users,
  BookMarked,
  LayoutDashboard,
  Activity,
  Folder,
  Shield,
  ChevronRight,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { Separator } from "@/components/ui/separator"

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
    email: "admin@satudata.go.id",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      badge: "New",
    },
    {
      title: "Data Sektoral",
      icon: Database,
      isActive: false,
      items: [
        { 
          title: "Data Sektoral", 
          url: "/data-sektoral",
          icon: Folder,
        },
        { 
          title: "Relokasi Sektoral", 
          url: "/relokasi-sektoral",
          icon: Activity,
        },
      ],
    },
    {
      title: "Monitoring",
      url: "/monitoring-data",
      icon: Activity,
      badge: "12",
    },
    {
      title: "Reference Data",
      icon: Settings2,
      items: [
        { 
          title: "Data OPD", 
          url: "/data-opd",
          icon: Shield,
        },
        { 
          title: "Data Urusan", 
          url: "/data-urusan",
          icon: BookOpen,
        },
        { 
          title: "Data Buku Digital", 
          url: "/data-buku",
          icon: BookMarked,
        },
      ],
    },
    {
      title: "Akun User",
      icon: Users,
      items: [
        { 
          title: "Akun Kepala Bidang", 
          url: "/akun-kepala-bidang",
          icon: Users,
        },
        { 
          title: "Akun Kepala Dinas", 
          url: "/akun-kepala-dinas",
          icon: Shield,
        },
      ],
    },
  ],

  navSecondary: [],

  projects: [],

  quickStats: {
    totalData: "1,234",
    activeUsers: "45",
    monthlyGrowth: "+12%",
  }
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! border-r-2"
      {...props}
    >
      <SidebarHeader className="border-b-2 border-border pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-muted/80 transition-all group">
              <a href="/profile">
                <div className="relative">
                  <div className="bg-primary text-primary-foreground flex aspect-square size-10 items-center justify-center rounded-xl shadow-lg group-hover:shadow-xl transition-all">
                    <Command className="size-5" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-base">Profile Pengguna</span>
                  <span className="truncate text-xs text-muted-foreground">Satu Data Lamtim</span>
                </div>
                <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <div className="space-y-2">
          <div className="px-2 mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Menu Utama
            </span>
          </div>
          <NavMain items={data.navMain} />
        </div>

        {data.projects.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="px-2 mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Projects
                </span>
              </div>
              <NavProjects projects={data.projects} />
            </div>
          </>
        )}

        {data.navSecondary.length > 0 && (
          <>
            <Separator className="my-4" />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </>
        )}

        {/* Help Card */}
        <div className="mt-auto pt-4">
          <div className="mx-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold">Butuh Bantuan?</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Akses dokumentasi dan panduan lengkap sistem
              </p>
              <button className="w-full mt-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                Buka Dokumentasi
              </button>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t-2 border-border pt-4">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}