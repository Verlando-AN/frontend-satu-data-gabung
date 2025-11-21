import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, RefreshCw, Download, Building2, MapPin, Hash, Shield, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";

import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

interface OpdItem {
  id_opd: number;
  kode_wilayah: string;
  kode_bidang_urusan_1: string;
  kode_bidang_urusan_2: string;
  kode_bidang_urusan_3: string;
  kode_main_opd: string;
  kode_sub_opd: string;
  nama_opd: string;
  level: number;
  level_string: string;
}

export default function DataOpd() {
  const [data, setData] = useState<OpdItem[]>([]);
  const [filteredData, setFilteredData] = useState<OpdItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/strict/ref-data/list-opd`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      const result = await response.json();

      const finalData =
        result?.data ??
        result?.hasil ??
        result?.result ??
        (Array.isArray(result) ? result : null);

      setData(finalData || []);
      setFilteredData(finalData || []);
    } catch (error) {
      console.error("Error fetching:", error);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter data based on search and level
  useEffect(() => {
    let result = data;

    if (searchQuery) {
      result = result.filter(item =>
        item.nama_opd.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kode_wilayah.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (levelFilter) {
      result = result.filter(item => item.level_string === levelFilter);
    }

    setFilteredData(result);
  }, [searchQuery, levelFilter, data]);

  // Get unique levels for filter
  const uniqueLevels = Array.from(new Set(data.map(item => item.level_string)));

  // Calculate statistics
  const stats = {
    total: data.length,
    byLevel: data.reduce((acc: any, item) => {
      acc[item.level_string] = (acc[item.level_string] || 0) + 1;
      return acc;
    }, {})
  };

  const getBadgeVariant = (level: string) => {
    switch(level) {
      case 'MAIN': return 'default';
      case 'SUB': return 'secondary';
      case 'UPTD': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-1 flex-col gap-6 p-6 bg-muted/30">
              {/* Header Section */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Data OPD</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Kelola daftar Organisasi Perangkat Daerah
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fetchData()}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah OPD
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Total OPD
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{stats.total}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          OPD Utama
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{stats.byLevel['MAIN'] || 0}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
                        <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Sub OPD
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{stats.byLevel['SUB'] || 0}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
                        <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          UPTD
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{stats.byLevel['UPTD'] || 0}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20">
                        <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filter Section */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Filter className="w-5 h-5" />
                    Filter & Pencarian
                  </CardTitle>
                  <CardDescription>
                    Gunakan filter untuk menyaring data OPD
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="space-y-1.5 flex-1 min-w-[300px]">
                      <label className="text-xs font-medium text-muted-foreground">
                        Cari OPD
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="Cari berdasarkan nama atau kode wilayah..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 min-w-[200px]">
                      <label className="text-xs font-medium text-muted-foreground">
                        Level OPD
                      </label>
                      <NativeSelect
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                      >
                        <NativeSelectOption value="">Semua Level</NativeSelectOption>
                        {uniqueLevels.map((level) => (
                          <NativeSelectOption key={level} value={level}>
                            {level}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Table Section */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Daftar OPD</CardTitle>
                  <CardDescription>
                    Menampilkan {filteredData.length} dari {stats.total} total OPD
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">ID</TableHead>
                          <TableHead className="font-semibold">Nama OPD</TableHead>
                          <TableHead className="font-semibold">Level</TableHead>
                          <TableHead className="font-semibold">Kode Wilayah</TableHead>
                          <TableHead className="font-semibold">Bidang Urusan 1</TableHead>
                          <TableHead className="font-semibold">Bidang Urusan 2</TableHead>
                          <TableHead className="font-semibold">Bidang Urusan 3</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-12">
                              <div className="flex flex-col items-center gap-2">
                                <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Memuat data...</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : filteredData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-12">
                              <div className="flex flex-col items-center gap-2">
                                <Building2 className="w-12 h-12 text-muted-foreground/50" />
                                <p className="text-sm text-muted-foreground">
                                  {searchQuery || levelFilter ? 'Tidak ada data yang sesuai filter' : 'Tidak ada data OPD'}
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredData.map((item) => (
                            <TableRow key={item.id_opd} className="hover:bg-muted/50 transition-colors">
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Hash className="w-3 h-3 text-muted-foreground" />
                                  {item.id_opd}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-start gap-2">
                                  <Building2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="font-medium">

                                    {item.nama_opd.length > 40
                                  ? item.nama_opd.substring(0, 40) + "..."
                                  : item.nama_opd}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={getBadgeVariant(item.level_string)}>
                                  {item.level_string}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <code className="px-2 py-1 rounded bg-muted text-xs font-mono">
                                  {item.kode_wilayah}
                                </code>
                              </TableCell>
                              <TableCell>
                                <code className="px-2 py-1 rounded bg-muted text-xs font-mono">
                                  {item.kode_bidang_urusan_1 || '-'}
                                </code>
                              </TableCell>
                              <TableCell>
                                <code className="px-2 py-1 rounded bg-muted text-xs font-mono">
                                  {item.kode_bidang_urusan_2 || '-'}
                                </code>
                              </TableCell>
                              <TableCell>
                                <code className="px-2 py-1 rounded bg-muted text-xs font-mono">
                                  {item.kode_bidang_urusan_3 || '-'}
                                </code>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Info */}
              {!loading && filteredData.length > 0 && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p>
                    Menampilkan {filteredData.length} OPD {searchQuery || levelFilter ? 'yang sesuai filter' : ''}
                  </p>
                  <p>
                    Total: {stats.total} OPD terdaftar
                  </p>
                </div>
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}