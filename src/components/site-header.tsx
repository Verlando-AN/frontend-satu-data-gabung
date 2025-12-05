import { SidebarIcon } from "lucide-react"
// import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { useLocation, Link } from "react-router-dom"
import React from "react"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const location = useLocation()

  // 🔹 Pisahkan URL path menjadi array, misal "/projects/detail" -> ["projects", "detail"]
  const pathSegments = location.pathname.split("/").filter(Boolean)

  // 🔹 Bangun breadcrumb item berdasarkan URL
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const isLast = index === pathSegments.length - 1
    const url = "/" + pathSegments.slice(0, index + 1).join("/")

    // Capitalize segment
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())

    return (
      <React.Fragment key={url}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to={url}>{label}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    )
  })

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />

        {/* 🔹 Breadcrumb Dinamis */}
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Satu Data Lampung Timur</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {pathSegments.length > 0 && <BreadcrumbSeparator />}

            {breadcrumbItems}
          </BreadcrumbList>
        </Breadcrumb>

        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
      </div>
    </header>
  )
}
