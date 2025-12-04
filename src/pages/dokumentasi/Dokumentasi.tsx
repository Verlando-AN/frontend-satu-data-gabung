"use client";

import React, { useState, useEffect, useRef } from 'react';
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
    Home,
    User,
    Database,
    FileJson,
    BookOpen,
    BarChart3,
    Settings,
    HelpCircle,
    ChevronRight,
    Search,
    Shield,
    Key,
    Plus,
    Edit,
    Trash,
    Download,
    Upload,
    Eye,
    CheckCircle,
    AlertCircle,
    Info,
    FileText,
    Folder,
    Users,
    Building2,
    Calendar,
    TrendingUp,
    FileSpreadsheet,
    Lock,
    Bell,
    LogOut,
    Menu,
    Grid,
    List,
    Filter,
    SortAsc,
    Save,
    RefreshCw,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Data panduan yang dipisahkan dari komponen
const panduanSections = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: Home,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: "Halaman utama setelah login",
    steps: [
      {
        title: "Mengakses Dashboard",
        description: "Dashboard adalah halaman pertama yang Anda lihat setelah berhasil login ke sistem.",
        details: [
          "Pada bagian atas, Anda akan melihat statistik ringkas seperti jumlah data sektoral, dataset, dan buku digital",
          "Grafik tren data ditampilkan di bagian tengah untuk visualisasi perkembangan data",
          "Aktivitas terbaru ditampilkan di bagian bawah untuk memantau perubahan terkini"
        ],
        tips: "Klik pada setiap kartu statistik untuk melihat detail lebih lanjut"
      },
    ]
  },
  {
    id: "manajemen-akun",
    title: "Manajemen Akun",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    description: "Kelola akun pengguna sistem",
    steps: [
      {
        title: "Membuat Akun Baru",
        description: "Tambahkan akun pengguna baru sesuai dengan peran dan OPD masing-masing.",
        details: [
          "Klik menu 'Akun User' di sidebar",
          "Pilih 'Tambah Akun Baru'",
          "Isi form yang tersedia: email, nama lengkap, NIP, dan pilih peran (Kepala OPD/Kepala Bidang)",
          "Klik 'Simpan' untuk menyimpan akun baru"
        ],
        tips: "Pastikan email yang dimasukkan valid dan belum terdaftar di sistem"
      },
      {
        title: "Mengedit Akun Pengguna",
        description: "Perbarui informasi akun pengguna yang sudah ada.",
        details: [
          "Cari akun yang ingin diedit Akun User",
          "Klik ikon 'Edit' pada baris akun tersebut",
          "Ubah informasi yang diperlukan",
          "Klik 'Update' untuk menyimpan perubahan"
        ],
        tips: "Hanya admin OPD yang dapat mengedit akun di bawah OPDnya"
      },
      {
        title: "Menghapus Akun",
        description: "Hapus akun pengguna yang tidak lagi aktif.",
        details: [
          "Temukan akun yang akan dihapus",
          "Klik ikon 'Hapus' pada baris akun tersebut",
          "Konfirmasi penghapusan dengan mengklik 'Ya, Hapus'",
          "Akun akan dihapus secara permanen"
        ],
        tips: "Pastikan akun yang dihapus tidak memiliki data penting terkait"
      }
    ]
  },
  {
    id: "data-sektoral",
    title: "Data Sektoral",
    icon: Database,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    description: "Kelola data sektoral dan referensi",
    steps: [
      {
        title: "Menambah Data Sektoral",
        description: "Input data sektoral baru ke dalam sistem.",
        details: [
          "Pilih menu 'Data Sektoral' di sidebar",
          "Klik tombol 'Tambah Data Sektoral'",
          "Isi form: dimensi, jenis, kategori, kode DSSD, kode urusan, satuan, dan uraian DSSD",
          "Klik 'Simpan' untuk menambahkan data"
        ],
        tips: "Pastikan semua field wajib diisi dengan benar"
      },
      {
        title: "Mengubah Status Aktif",
        description: "Aktifkan atau nonaktifkan data sektoral untuk OPD Anda.",
        details: [
          "Cari data sektoral yang ingin diubah statusnya",
          "Klik toggle pada kolom 'Status'",
          "Status akan berubah secara otomatis",
          "Data yang aktif wajib dilengkapi informasinya"
        ],
        tips: "Nonaktifkan data yang tidak relevan untuk OPD Anda"
      },
      {
        title: "Memindahkan Data ke OPD Lain",
        description: "Transfer data sektoral ke OPD lain jika diperlukan.",
        details: [
          "Pilih data sektoral yang akan dipindahkan",
          "Klik 'Pindahkan ke OPD Lain'",
          "Pilih OPD tujuan dari dropdown",
          "Konfirmasi perpindahan data"
        ],
        tips: "Pastikan OPD tujuan memiliki kewenangan atas data tersebut"
      }
    ]
  },
  {
    id: "dataset",
    title: "Dataset",
    icon: FileJson,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    description: "Kelola dataset dan distribusi data",
    steps: [
      {
        title: "Membuat Dataset Baru",
        description: "Unggah dan kelola dataset untuk data sektoral tertentu.",
        details: [
          "Pilih data sektoral terkait dari daftar",
          "Klik 'Buat Dataset'",
          "Isi informasi dataset: judul, deskripsi, publisher, tema, dan keyword",
          "Unggah file dataset (format CSV, Excel, atau JSON)",
          "Klik 'Publikasikan' untuk menyimpan dataset"
        ],
        tips: "Pastikan file dataset sudah dalam format yang benar dan tidak mengandung error"
      },
      {
        title: "Mengelola Metadata Dataset",
        description: "Perbarui informasi metadata dataset yang sudah ada.",
        details: [
          "Temukan dataset yang ingin diperbarui",
          "Klik 'Edit'",
          "Ubah informasi yang diperlukan",
          "Klik 'Simpan Perubahan'"
        ],
        tips: "Metadata yang lengkap akan membantu pengguna menemukan dataset Anda"
      },
    ]
  },
  {
    id: "buku-digital",
    title: "Buku Digital",
    icon: BookOpen,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    description: "Kelola buku digital dan publikasi",
    steps: [
      {
        title: "Mengunggah Buku Digital",
        description: "Tambahkan buku digital baru ke dalam sistem.",
        details: [
          "Pilih menu 'Buku Digital' di 'Reference'",
          "Klik 'Tambah Buku Baru'",
          "Pilih OPD dan tahun publikasi",
          "Isi judul buku",
          "Unggah file buku (format PDF)",
          "Klik 'Simpan' untuk menyelesaikan pengunggahan"
        ],
        tips: "Pastikan file PDF tidak terlalu besar untuk mempercepat proses unggah"
      },
      {
        title: "Memperbarui Buku Digital",
        description: "Ganti file atau perbarui informasi buku yang ada.",
        details: [
          "Temukan buku yang ingin diperbarui",
          "Klik 'Edit'",
          "Ubah informasi yang diperlukan atau unggah file baru",
          "Klik 'Update' untuk menyimpan perubahan"
        ],
        tips: "Perubahan akan langsung terlihat oleh semua pengguna"
      }
    ]
  },
  {
    id: "pengaturan",
    title: "Pengaturan Profil",
    icon: Settings,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    description: "Kelola pengaturan akun personal",
    steps: [
      {
        title: "Mengubah Password",
        description: "Perbarui password akun Anda untuk keamanan.",
        details: [
          "Klik menu 'Profil'",
          "Masukkan password lama",
          "Isi password baru dan konfirmasi",
          "Klik 'Ubah Password' untuk menyimpan"
        ],
        tips: "Gunakan password yang kuat dengan kombinasi huruf, angka, dan simbol"
      },
    ]
  }
];

const SectionSkeleton = () => (
  <div className="space-y-6 p-6 rounded-xl bg-slate-50 border-2 border-slate-200">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
    
    <div className="space-y-4">
      {[1, 2].map((item) => (
        <Card key={item} className="bg-white border border-slate-200 overflow-hidden shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const QuickNavigationSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
    {Array.from({ length: 8 }).map((_, index) => (
      <Skeleton key={index} className="h-12 w-full" />
    ))}
  </div>
);

export default function PanduanPenggunaan() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && panduanSections.some(section => section.id === hash)) {
        setActiveSection(hash);
        setTimeout(() => {
          sectionRefs.current[hash]?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      }
    };

    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    
    const newUrl = `${window.location.pathname}#${sectionId}`;
    window.history.pushState(null, '', newUrl);
    
    // Scroll to section
    setTimeout(() => {
      sectionRefs.current[sectionId]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const filteredSections = panduanSections.map(section => ({
    ...section,
    steps: section.steps.filter(step => 
      step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      step.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.steps.length > 0);

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
              
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Home className="h-4 w-4" />
                  <ChevronRight className="h-4 w-4" />
                  <span>Dokumentasi Panduan Penggunaan</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Panduan Penggunaan Website Satu Data</h1>
                    <p className="text-lg text-muted-foreground mt-2">
                      Pelajari cara menggunakan semua fitur sistem dengan mudah
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <BookOpen className="h-3 w-3" />
                      {panduanSections.length} Modul
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <FileText className="h-3 w-3" />
                      {panduanSections.reduce((acc, section) => acc + section.steps.length, 0)} Panduan
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Cari panduan atau fitur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base shadow-sm focus:ring-2 focus:ring-primary/20 focus-visible:ring-primary/20"
                />
              </div>

              {isLoading ? (
                <QuickNavigationSkeleton />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                  {panduanSections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <Button
                        key={section.id}
                        variant={isActive ? "default" : "outline"}
                        className="justify-center h-auto p-3"
                        onClick={() => handleSectionChange(section.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span className="text-sm font-medium truncate">{section.title}</span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              )}

              <Separator />

              <div className="space-y-8">
                {isLoading ? (
                  <>
                    <SectionSkeleton />
                    <SectionSkeleton />
                  </>
                ) : filteredSections.length > 0 ? (
                  filteredSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <div 
                        key={section.id} 
                        id={section.id}
                        ref={(el) => sectionRefs.current[section.id] = el}
                        className={`space-y-6 p-6 rounded-xl ${section.bgColor} ${section.borderColor} border-2 transition-all duration-300 hover:shadow-md scroll-mt-24`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`${section.color} p-3 rounded-xl bg-white shadow-sm transition-transform duration-300 hover:scale-105`}>
                              <Icon className="h-7 w-7" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold">{section.title}</h2>
                              <p className="text-muted-foreground">
                                {section.description}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="gap-1">
                            <FileText className="h-3 w-3" />
                            {section.steps.length} panduan
                          </Badge>
                        </div>
                        
                        <div className="space-y-4">
                          {section.steps.map((step, index) => (
                            <Card key={index} className="bg-white border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                              <CardHeader className="pb-3">
                                <div className="flex items-start gap-3">
                                  <div className="bg-primary/10 p-2 rounded-lg">
                                    <span className="font-bold text-primary">{index + 1}</span>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{step.title}</h3>
                                    <CardDescription className="text-base">
                                      {step.description}
                                    </CardDescription>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <Accordion type="single" collapsible className="w-full">
                                  <AccordionItem value="details" className="border-0">
                                    <AccordionTrigger className="py-2 text-sm font-medium">
                                      Langkah-langkah Detail
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="space-y-3">
                                        {step.details.map((detail, detailIndex) => (
                                          <div key={detailIndex} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm">{detail}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                  <AccordionItem value="tips" className="border-0">
                                    <AccordionTrigger className="py-2 text-sm font-medium">
                                      Tips & Trik
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                          <p className="text-sm text-blue-800">{step.tips}</p>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Card className="border-2 border-dashed border-slate-300 bg-slate-50">
                    <CardContent className="p-12 text-center">
                      <Search className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Tidak ada hasil</h3>
                      <p className="text-slate-500 max-w-md mx-auto">
                        Coba gunakan kata kunci yang berbeda atau jelajahi semua modul panduan kami
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setSearchQuery("")}
                      >
                        Reset Pencarian
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-blue-50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    Butuh Bantuan Cepat?
                  </CardTitle>
                  <CardDescription className="text-base">
                    Temukan jawaban untuk pertanyaan umum tentang penggunaan sistem
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Pertanyaan Umum</h4>
                      <div className="space-y-2">
                        <Button variant="ghost" className="justify-start h-auto p-3 w-full text-left hover:bg-slate-100">
                          <div className="flex items-center gap-3">
                            <Lock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Bagaimana cara reset password?</span>
                          </div>
                        </Button>
                        <Button variant="ghost" className="justify-start h-auto p-3 w-full text-left hover:bg-slate-100">
                          <div className="flex items-center gap-3">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Format file apa yang didukung?</span>
                          </div>
                        </Button>
                        <Button variant="ghost" className="justify-start h-auto p-3 w-full text-left hover:bg-slate-100">
                          <div className="flex items-center gap-3">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Siapa yang bisa mengakses data saya?</span>
                          </div>
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Kontak Dukungan</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="justify-start h-auto p-3 w-full hover:bg-primary/5">
                          <div className="flex items-center gap-3">
                            <Bell className="h-4 w-4 text-primary" />
                            <div className="text-left">
                              <p className="text-sm font-medium">Buka Tiket Dukungan</p>
                              <p className="text-xs text-muted-foreground">Dapatkan bantuan dari tim kami</p>
                            </div>
                          </div>
                        </Button>
                        <Button variant="outline" className="justify-start h-auto p-3 w-full hover:bg-primary/5">
                          <div className="flex items-center gap-3">
                            <ExternalLink className="h-4 w-4 text-primary" />
                            <div className="text-left">
                              <p className="text-sm font-medium">Pusat Bantuan</p>
                              <p className="text-xs text-muted-foreground">Jawaban untuk pertanyaan umum</p>
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}