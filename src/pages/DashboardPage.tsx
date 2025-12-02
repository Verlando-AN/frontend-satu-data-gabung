"use client";
import React from 'react';

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
      count: dataTotal?.data_sektoral || 0,
      link: '/sektoral',
    },
    {
      title: 'Dataset',
      description: 'Kumpulan data terstruktur di Portal Satu Data',
      icon: Database,
      count: dataTotal.dataset,
      link: '/dataset',
    },
    {
      title: 'Urusan',
      description: 'Kebijakan tata kelola data untuk data berkualitas',
      icon: Newspaper,
      count: dataTotal?.urusan || 0,
      link: '/urusan',
    }
  ];

  const documentationLinks = [
    { title: "Panduan Upload Dataset", icon: Database },
    { title: "API Documentation", icon: FileText },
    { title: "FAQ & Support", icon: BookOpen }
  ];

  const quickLinks = [
    { label: "Portal Data Nasional", href: "#" },
    { label: "Peraturan & Kebijakan", href: "#" },
    { label: "Hubungi Admin", href: "#" }
  ];

  return (
    
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="p-4 md:p-6 lg:p-8 space-y-6">
              {/* Hero Section */}
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
                    Selamat datang di portal data terpadu Lampung Timur
                  </p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid gap-6 lg:grid-cols-12">
                {/* Left Column */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Stats Cards */}
                  {loading ? (
                    <div className="flex items-center justify-center p-12">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                      <div
                        id="counterSection"
                        ref={counterRef}
                        className="grid gap-4 md:grid-cols-3"
                    >
                      {sections.map((section, index) => {
                        const Icon = section.icon;
                        return (
                          <a 
                            key={index}
                            href={section.link}
                            className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <div className="p-6 space-y-4">
                              <div className={`inline-flex rounded-lgp-3`}>
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
                                  {section.count.toLocaleString('id-ID')}
                                </span>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  )}

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
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Cari dataset..."
                          value={datasetSearch}
                          onChange={(e) => setDatasetSearch(e.target.value)}
                          className="pl-9"
                        />
                      </div>

                      {/* Dataset List */}
                      <div className="space-y-3">
                        {filteredDatasets.length === 0 ? (
                          <div className="text-center py-12 text-muted-foreground">
                            <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Tidak ada dataset ditemukan</p>
                          </div>
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

                                <div className="pt-2 border-t">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="w-full justify-center gap-2"
                                  >
                                    <Eye className="h-4 w-4" />
                                    Lihat Detail
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>

                      {/* Pagination */}
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

                {/* Right Column */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Documentation Card */}
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
                          <Button 
                            key={index}
                            variant="outline" 
                            className="w-full justify-between group"
                          >
                            <span className="flex items-center gap-2 text-sm font-medium">
                              <Icon className="h-4 w-4" />
                              {doc.title}
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                          </Button>
                        );
                      })}
                      <Separator className="my-3" />
                      <Button className="w-full gap-2">
                        <BookOpen className="h-4 w-4" />
                        Lihat Semua Dokumentasi
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Quick Links Card */}
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-4 border-b">
                      <CardTitle className="text-lg">Link Cepat</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-1">
                      {quickLinks.map((link, index) => (
                        <a 
                          key={index}
                          href={link.href}
                          className="flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors text-sm group"
                        >
                          <span className="font-medium">{link.label}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </a>
                      ))}
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