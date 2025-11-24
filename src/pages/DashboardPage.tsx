
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Folder, Database, Newspaper, TrendingUp, Users, FileText, ArrowRight, Activity, BarChart3, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function DashboardPage() {
    const stats = [
        { label: 'Total Dataset', value: '1,234', change: '+12%', icon: Database, trend: 'up' },
        { label: 'OPD Terdaftar', value: '45', change: '+5%', icon: Users, trend: 'up' },
        { label: 'Publikasi', value: '89', change: '+8%', icon: Newspaper, trend: 'up' },
        { label: 'Total Views', value: '12.5K', change: '+23%', icon: TrendingUp, trend: 'up' },
    ];

    const sections = [
        {
            title: 'Data Sektoral',
            description: 'Kelola data sektoral antar OPD secara terpusat dan terintegrasi.',
            icon: Folder,
            stats: '234 Dataset',
            badge: 'Terintegrasi',
            badgeVariant: 'default',
        },
        {
            title: 'Dataset',
            description: 'Lihat dan kelola dataset publik maupun internal dengan mudah.',
            icon: Database,
            stats: '1,234 Total',
            badge: 'Publik',
            badgeVariant: 'secondary',
        },
        {
            title: 'Publikasi',
            description: 'Bagikan hasil analisis dan laporan data dalam bentuk publikasi.',
            icon: Newspaper,
            stats: '89 Artikel',
            badge: 'Terbaru',
            badgeVariant: 'outline',
        },
    ];

    const recentActivity = [
        { title: 'Dataset APBD 2024 diperbarui', time: '2 jam lalu', icon: FileText, status: 'success' },
        { title: 'Publikasi baru: Analisis Pendidikan', time: '5 jam lalu', icon: Newspaper, status: 'success' },
        { title: '3 OPD baru terdaftar', time: '1 hari lalu', icon: Users, status: 'info' },
        { title: 'Maintenance terjadwal malam ini', time: '2 hari lagi', icon: AlertCircle, status: 'warning' },
    ];

    const quickActions = [
        { title: 'Upload Dataset', icon: Database },
        { title: 'Buat Publikasi', icon: Newspaper },
        { title: 'Lihat Laporan', icon: BarChart3 },
    ];

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset>
                        <div className="flex flex-1 flex-col gap-8 p-6 bg-muted/30">
                            {/* Welcome Section with Quick Actions */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
                                        <p className="text-muted-foreground text-lg">
                                            Selamat datang di sistem Satu Data Lampung Timur
                                        </p>
                                    </div>
                                    <div className="hidden md:flex items-center gap-2">
                                        {quickActions.map((action, index) => {
                                            const Icon = action.icon;
                                            return (
                                                <Button key={index} variant="outline" size="sm" className="gap-2">
                                                    <Icon className="h-4 w-4" />
                                                    {action.title}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid with Enhanced Design */}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {stats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300" />
                                            <CardContent className="p-6 relative">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                        <Icon className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <Badge variant="secondary" className="gap-1">
                                                        <TrendingUp className="h-3 w-3" />
                                                        {stat.change}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-muted-foreground">
                                                        {stat.label}
                                                    </p>
                                                    <h3 className="text-3xl font-bold tracking-tight">
                                                        {stat.value}
                                                    </h3>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Main Content Grid */}
                            <div className="grid gap-6 lg:grid-cols-3">
                                {/* Main Cards - 2 Columns */}
                                <div className="lg:col-span-2">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {sections.map((section, index) => {
                                            const Icon = section.icon;
                                            return (
                                                <Card key={index} className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-2 overflow-hidden">
                                                    <div className="h-1 bg-primary group-hover:h-2 transition-all duration-300" />
                                                    <CardHeader className="pb-3">
                                                        <div className="flex items-start justify-between mb-6">
                                                            <div className="relative">
                                                                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                                                                <div className="relative p-4 rounded-xl bg-background border-2 group-hover:border-primary/50 transition-colors">
                                                                    <Icon className="h-7 w-7 text-primary" />
                                                                </div>
                                                            </div>
                                                            <Badge variant={section.badgeVariant} className="mt-1">
                                                                {section.badge}
                                                            </Badge>

                                                        </div>
                                                        <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                                                            {section.title}
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <CardDescription className="text-base leading-relaxed">
                                                            {section.description}
                                                        </CardDescription>
                                                        <div className="flex items-center justify-between pt-4 border-t-2">
                                                            <div className="flex items-center gap-2">
                                                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm font-semibold text-muted-foreground">
                                                                    {section.stats}
                                                                </span>
                                                            </div>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="sm" 
                                                                className="group/btn font-semibold"
                                                            >
                                                                Lihat Detail
                                                                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    {/* Recent Activity */}
                                    <Card className="border-2">
                                        <CardHeader className="pb-4">
                                            <CardTitle className="flex items-center gap-2 text-xl">
                                                <Activity className="h-5 w-5 text-primary" />
                                                Aktivitas Terbaru
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-1">
                                            {recentActivity.map((activity, index) => {
                                                const Icon = activity.icon;
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/80 transition-all cursor-pointer group/item border border-transparent hover:border-border"
                                                    >
                                                        <div className="relative">
                                                            {activity.status === 'success' && (
                                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                                                            )}
                                                            {activity.status === 'warning' && (
                                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-background" />
                                                            )}
                                                            <div className="p-2.5 rounded-lg bg-muted group-hover/item:bg-primary/10 transition-colors">
                                                                <Icon className="h-4 w-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 space-y-1.5 min-w-0">
                                                            <p className="text-sm font-medium leading-tight">
                                                                {activity.title}
                                                            </p>
                                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                                <Clock className="h-3 w-3" />
                                                                {activity.time}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </CardContent>
                                    </Card>

                                    {/* Quick Stats */}
                                    <Card className="border-2">
                                        <CardHeader className="pb-4">
                                            <CardTitle className="flex items-center gap-2 text-xl">
                                                <BarChart3 className="h-5 w-5 text-primary" />
                                                Quick Stats
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                                        <span className="text-sm font-medium">Data Quality</span>
                                                    </div>
                                                    <span className="text-lg font-bold">94%</span>
                                                </div>
                                                <div className="relative w-full bg-muted rounded-full h-3 overflow-hidden">
                                                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                                                    <div className="relative bg-primary h-3 rounded-full transition-all duration-1000 shadow-lg shadow-primary/50" style={{ width: '94%' }} />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <Database className="h-4 w-4 text-primary" />
                                                        <span className="text-sm font-medium">Storage Used</span>
                                                    </div>
                                                    <span className="text-lg font-bold">67%</span>
                                                </div>
                                                <div className="relative w-full bg-muted rounded-full h-3 overflow-hidden">
                                                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                                                    <div className="relative bg-primary h-3 rounded-full transition-all duration-1000 shadow-lg shadow-primary/50" style={{ width: '67%' }} />
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t">
                                                <Button variant="outline" size="sm" className="w-full group/btn">
                                                    Lihat Detail Analytics
                                                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    );
}