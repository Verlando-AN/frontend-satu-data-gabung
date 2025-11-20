import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Admin() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-1 justify-center items-center p-6">
              <div className="text-center space-y-4">

                <h1 className="text-5xl font-bold text-red-600">404</h1>
                <p className="text-lg text-muted-foreground">
                  Halaman yang kamu cari tidak ditemukan.
                </p>

                <Link to="/dashboard">
                  <Button variant="default" className="mt-4">
                    Kembali ke Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
