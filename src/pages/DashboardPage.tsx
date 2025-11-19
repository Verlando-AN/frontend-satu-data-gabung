import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Folder, Database, Newspaper } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset>
                        <div className="flex flex-1 flex-col gap-6 p-6">
                            {/* Grid 3 Kolom */}
                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Card 1 - Sektoral */}
                                <Card className="hover:shadow-lg transition-all">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-lg font-semibold">Data Sektoral</CardTitle>
                                        <Folder className="h-5 w-5 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            Kelola data sektoral antar OPD secara terpusat dan terintegrasi.
                                        </CardDescription>
                                        <div className="mt-4">
                                            <Button variant="secondary" size="sm">Lihat Detail</Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Card 2 - Dataset */}
                                <Card className="hover:shadow-lg transition-all">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-lg font-semibold">Dataset</CardTitle>
                                        <Database className="h-5 w-5 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            Lihat dan kelola dataset publik maupun internal dengan mudah.
                                        </CardDescription>
                                        <div className="mt-4">
                                            <Button variant="secondary" size="sm">Lihat Dataset</Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Card 3 - Publikasi */}
                                <Card className="hover:shadow-lg transition-all">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-lg font-semibold">Publikasi</CardTitle>
                                        <Newspaper className="h-5 w-5 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            Bagikan hasil analisis dan laporan data dalam bentuk publikasi.
                                        </CardDescription>
                                        <div className="mt-4">
                                            <Button variant="secondary" size="sm">Lihat Publikasi</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
}
