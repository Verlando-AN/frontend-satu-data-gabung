import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, RefreshCw, Download, BookOpen, Hash, Filter, Briefcase } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { useUrusanData } from "@/hooks/useUrusanData";

// Simplified table components
const Table = ({ children, ...props }: any) => (
  <div className="w-full overflow-auto">
    <table className="w-full caption-bottom text-sm" {...props}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, ...props }: any) => (
  <thead className="[&_tr]:border-b" {...props}>{children}</thead>
);

const TableBody = ({ children, ...props }: any) => (
  <tbody className="[&_tr:last-child]:border-0" {...props}>{children}</tbody>
);

const TableRow = ({ children, className = "", ...props }: any) => (
  <tr className={`border-b transition-colors ${className}`} {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, className = "", ...props }: any) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className}`} {...props}>
    {children}
  </th>
);

const TableCell = ({ children, className = "", ...props }: any) => (
  <td className={`p-4 align-middle ${className}`} {...props}>
    {children}
  </td>
);

const NativeSelect = ({ children, className = "", ...props }: any) => (
  <select className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${className}`} {...props}>
    {children}
  </select>
);

const NativeSelectOption = ({ children, ...props }: any) => (
  <option {...props}>{children}</option>
);

export default function DataUrusan() {
  const {
    data,
    filteredData,
    loading,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    categories,
    categoryNames,
    fetchData,
    resetFilters,
    getActiveFiltersCount
  } = useUrusanData();

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
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Data Urusan</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Daftar urusan pemerintahan daerah
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
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Urusan
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{data.length}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Kategori
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{categories.length}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
                        <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Hasil Filter
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{filteredData.length}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
                        <Filter className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Filter Aktif
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{getActiveFiltersCount()}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20">
                        <Search className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                    Cari urusan berdasarkan kode, nama, atau kategori
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="space-y-1.5 flex-1 min-w-[300px]">
                      <label className="text-xs font-medium text-muted-foreground">
                        Cari Urusan
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="Cari berdasarkan kode atau nama urusan..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 min-w-[250px]">
                      <label className="text-xs font-medium text-muted-foreground">
                        Kategori
                      </label>
                      <NativeSelect
                        value={categoryFilter}
                        onChange={(e: any) => setCategoryFilter(e.target.value)}
                      >
                        <NativeSelectOption value="">Semua Kategori</NativeSelectOption>
                        {categories.map((cat) => (
                          <NativeSelectOption key={cat} value={cat}>
                            Kategori {cat} - {categoryNames[cat] || 'Lainnya'}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </div>

                    {(searchQuery || categoryFilter) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-6"
                        onClick={resetFilters}
                      >
                        Reset Filter
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Single Table Section */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Daftar Urusan</CardTitle>
                  <CardDescription>
                    Menampilkan {filteredData.length} dari {data.length} total urusan
                    {categoryFilter && ` - Kategori ${categoryFilter}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold w-[180px]">Kode Urusan</TableHead>
                          <TableHead className="font-semibold w-[150px]">Kategori</TableHead>
                          <TableHead className="font-semibold">Nama Urusan</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-12">
                              <div className="flex flex-col items-center gap-2">
                                <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Memuat data...</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : filteredData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-12">
                              <div className="flex flex-col items-center gap-2">
                                <BookOpen className="w-12 h-12 text-muted-foreground/50" />
                                <p className="text-sm text-muted-foreground">
                                  {searchQuery || categoryFilter ? 'Tidak ada data yang sesuai filter' : 'Tidak ada data urusan'}
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredData.map((item) => {
                            const category = item.kode_urusan.split('.')[0];
                            return (
                              <TableRow key={item.kode_urusan} className="hover:bg-muted/50 transition-colors">
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Hash className="w-3 h-3 text-muted-foreground" />
                                    <code className="px-2 py-1 rounded bg-muted text-sm font-mono font-semibold">
                                      {item.kode_urusan}
                                    </code>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="default">
                                    Kategori {category}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span className="font-medium">{item.nama_urusan}</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
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
                    Menampilkan {filteredData.length} urusan 
                    {searchQuery && ' dari pencarian'}
                    {categoryFilter && ` dalam kategori ${categoryFilter}`}
                  </p>
                  <p>
                    Total: {data.length} urusan dalam {categories.length} kategori
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