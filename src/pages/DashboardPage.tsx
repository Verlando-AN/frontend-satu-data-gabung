"use client";

import React from 'react';
import { Link } from "react-router-dom";
import useDataset from "@/hooks/useDataset.js";
import useBerandaData from "@/hooks/useBerandaData";
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
import {
    Folder,
    Database,
    Newspaper,
    FileText,
    ArrowRight,
    Activity,
    BookOpen,
    Search,
    Building2,
    Calendar,
    Eye,
    Download,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface Produsen {
  id_opd: string | number;
  nama_opd: string;
}

interface Dataset {
  id: string | number;
  title: string;
  description?: string;
  producer: string;
  date: string;
  daysAgo: number;
  views?: string | number;
  downloads?: string | number;
}

interface DataTotal {
  dataset: number;
  data_sektoral: number;
  urusan: number;
}

const StatsCardSkeleton = () => (
  <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className="p-6 space-y-4">
      <div className="inline-flex rounded-lg p-3">
        <Skeleton className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-5 w-5" />
      </div>
    </div>
  </div>
);

const DatasetListSkeleton = () => (
  <>
    {Array.from({ length: 3 }).map((_, index) => (
      <Card key={index} className="hover:bg-accent/50 transition-all duration-200">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          
          <div className="flex items-center flex-wrap gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </CardContent>
      </Card>
    ))}
  </>
);

const DocumentationCardSkeleton = () => (
  <Card className="border shadow-sm">
    <CardHeader className="pb-4 border-b">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-4 w-48 mt-1" />
    </CardHeader>
    <CardContent className="p-4 space-y-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
      <Separator className="my-3" />
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const {
    datasetSearch,
    setDatasetSearch,
    filteredDatasets,
    handlePrev,
    handleNext,
    currentPage,
    totalPages,
    totalDatasets,
  } = useDataset() as {
    datasetSearch: string;
    setDatasetSearch: (value: string) => void;
    filteredDatasets: Dataset[];
    handlePrev: () => void;
    handleNext: () => void;
    currentPage: number;
    totalPages: number;
    totalDatasets: number;
  };

  const { loading, dataTotal, counterRef } = useBerandaData();

  const sections = [
    {
      title: 'Data Sektoral',
      description: 'Data statistik untuk kebutuhan instansi pemerintah tertentu',
      icon: Folder,
      count: dataTotal?.data_sektoral,
      link: '/data-sektoral',
    },
    {
      title: 'Dataset',
      description: 'Kumpulan data terstruktur di Portal Satu Data',
      icon: Database,
      count: dataTotal.dataset,
      link: '/monitoring-data',
    },
    {
      title: 'Urusan',
      description: 'Kebijakan tata kelola data untuk data berkualitas',
      icon: Newspaper,
      count: dataTotal?.urusan,
      link: '/data-urusan',
    }
  ];

  const documentationLinks = [ 
    { 
      title: "Panduan Upload Dataset",
      icon: Database,
      link: "/dokumentasi#dataset",
    },
    { 
      title: "Membuat Akun Baru",
      icon: FileText,
      link: "/dokumentasi#manajemen-akun",
    },
    {
      title: "Panduan Sistem",
      icon: BookOpen,
      link: "/dokumentasi#dashboard",
    }
  ];

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="p-4 md:p-6 lg:p-8 space-y-6">
              <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 md:p-10 text-primary-foreground shadow-lg">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                
                <div className="relative z-10 space-y-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    <Activity className="h-3 w-3 mr-1" />
                    Sistem Aktif
                  </Badge>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                    Dashboard Satu Data
                  </h1>
                  <p className="text-lg text-primary-foreground/90 max-w-2xl">
                    Selamat Datang di Portal Satu Data Lampung Timur
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-6">
                  <div
                    id="counterSection"
                    ref={counterRef}
                    className="grid gap-4 md:grid-cols-3"
                  >
                    {loading ? (
                      <>
                        <StatsCardSkeleton />
                        <StatsCardSkeleton />
                        <StatsCardSkeleton />
                      </>
                    ) : (
                      sections.map((section, index) => {
                        const Icon = section.icon;
                        return (
                          <a 
                            key={index}
                            href={section.link}
                            className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <div className="p-6 space-y-4">
                              <div className={`inline-flex rounded-lg p-3 bg-primary/10 text-primary`}>
                                <Icon className={`h-6 w-6`} />
                              </div>
                              <div className="space-y-2">
                                <h3 className="font-semibold text-lg">{section.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {section.description}
                                </p>
                              </div>
                              <div className="flex items-center justify-between pt-2">
                                <span className={`text-2xl font-bold`}>
                                  {section.count?.toLocaleString('id-ID') || '0'}
                                </span>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </a>
                        );
                      })
                    )}
                  </div>

                  <Card className="border shadow-sm">
                    <CardHeader className="border-b bg-muted/50">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <CardTitle className="text-xl md:text-2xl">Dataset Terbaru</CardTitle>
                          <CardDescription className="mt-1">
                            Jelajahi koleksi dataset dari berbagai OPD
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {totalDatasets || filteredDatasets.length} Dataset
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4 md:p-6 space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Cari dataset..."
                          value={datasetSearch}
                          onChange={(e) => setDatasetSearch(e.target.value)}
                          className="pl-9"
                        />
                      </div>

                      <div className="space-y-3">
                        {filteredDatasets.length === 0 ? (
                          datasetSearch ? (
                            <div className="text-center py-12 text-muted-foreground">
                              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                              <p>Tidak ada dataset ditemukan</p>
                            </div>
                          ) : (
                            <DatasetListSkeleton />
                          )
                        ) : (
                          filteredDatasets.map((dataset) => (
                            <Card 
                              key={dataset.id} 
                              className="group hover:bg-accent/50 transition-all duration-200 cursor-pointer"
                            >
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                                      {dataset.title}
                                    </h4>
                                    {dataset.description && (
                                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                        {dataset.description}
                                      </p>
                                    )}
                                  </div>
                                  <Badge variant="outline" className="shrink-0">
                                    Publik
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center flex-wrap gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1.5">
                                    <Building2 className="h-3.5 w-3.5" />
                                    {dataset.producer}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {dataset.date}
                                  </span>
                                  {dataset.views && (
                                    <span className="flex items-center gap-1.5">
                                      <Eye className="h-3.5 w-3.5" />
                                      {dataset.views}
                                    </span>
                                  )}
                                  {dataset.downloads && (
                                    <span className="flex items-center gap-1.5">
                                      <Download className="h-3.5 w-3.5" />
                                      {dataset.downloads}
                                    </span>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>

                      {filteredDatasets.length > 0 && (
                        <div className="flex items-center justify-between pt-4 border-t">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            Halaman {currentPage} dari {totalPages || 1}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleNext}
                            disabled={currentPage >= totalPages}
                          >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  {loading ? (
                    <DocumentationCardSkeleton />
                  ) : (
                    <Card className="border shadow-sm">
                      <CardHeader className="pb-4 border-b">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">Dokumentasi</CardTitle>
                        </div>
                        <CardDescription className="mt-1">
                          Panduan lengkap sistem
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 space-y-2">
                        {documentationLinks.map((doc, index) => {
                          const Icon = doc.icon;
                          return (
                            <Link key={index} to={doc.link}>
                              <Button 
                                variant="outline" 
                                className="w-full justify-between group"
                              >
                                <span className="flex items-center gap-2 text-sm font-medium">
                                  <Icon className="h-4 w-4" />
                                  {doc.title}
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          );
                        })}
                        <Separator className="my-3" />
                        <Link to="/dokumentasi">  
                          <Button className="w-full gap-2">
                            <BookOpen className="h-4 w-4" />
                            Lihat Semua Dokumentasi
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}