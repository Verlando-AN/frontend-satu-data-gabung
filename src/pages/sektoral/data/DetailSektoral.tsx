import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Database, 
  CheckCircle2, 
  XCircle, 
  Plus,
  FileText, 
  ArrowLeft,
  Hash,
  Layers,
  Tag,
  Ruler,
  Box,
  Calendar,
  TrendingUp,
  RefreshCw,
  Edit,
  Building2,
  BarChart3,
} from "lucide-react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useDetailSektoral, type OperationResult } from "@/hooks/useDetailSektoral";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const InfoRow = ({ icon: Icon, label, value, valueClassName = "" }: any) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div className="flex-1 space-y-1">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className={`text-sm font-semibold ${valueClassName}`}>{value}</p>
    </div>
  </div>
);

export default function DetailSektoral() {
  const { id } = useParams();
  const {
    data,
    dataset,
    loading,
    error,
    chartData,
    totalYears,
    latestYear,
    stripHtml,
    totalValue,
    avgValue,
    fetchAll,
    deleteSektoral,
    updateSektoral,
    deleteDataset,
  } = useDetailSektoral(id);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<{id: number, tahun: number} | null>(null);
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState<{id: number, tahun: number, jumlah: number} | null>(null);
  const [editValue, setEditValue] = useState("");
  
  const [deleteDatasetDialogOpen, setDeleteDatasetDialogOpen] = useState(false);
  const [deleteDatasetId, setDeleteDatasetId] = useState<number | null>(null);

  const openDeleteDialog = (id: number, tahun: number) => {
    setDeleteData({ id, tahun });
    setDeleteDialogOpen(true);
  };
  
  const openEditDialog = (id: number, tahun: number, jumlah: number) => {
    setEditData({ id, tahun, jumlah });
    setEditValue(jumlah.toString());
    setEditDialogOpen(true);
  };
  
  const handleSaveEdit = async () => {
    if (editData && editValue !== "" && !isNaN(Number(editValue))) {
      const result: OperationResult = await updateSektoral(editData.id, editData.tahun, Number(editValue));
      if (result.success) {
        setEditDialogOpen(false);
      } else {
        alert(result.error);
      }
    }
  };
  
  const openDeleteDatasetDialog = (id: number) => {
    setDeleteDatasetId(id);
    setDeleteDatasetDialogOpen(true);
  };

  const handleDeleteSektoral = async () => {
    if (deleteData) {
      const result: OperationResult = await deleteSektoral(deleteData.id, deleteData.tahun);
      if (result.success) {
        setDeleteDialogOpen(false);
      } else {
        alert(result.error);
      }
    }
  };

  const handleDeleteDataset = async () => {
    if (deleteDatasetId) {
      const result: OperationResult = await deleteDataset(deleteDatasetId);
      if (result.success) {
        setDeleteDatasetDialogOpen(false);
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-col flex-1 gap-6 p-6 bg-muted/30">

              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Database className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Detail Data Sektoral</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Informasi lengkap dan riwayat input data
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-initial" asChild>
                    <Link to="/data-sektoral">
                      <ArrowLeft className="w-4 h-4" />
                      Kembali
                    </Link>
                  </Button>
                </div>
              </div>

              {loading ? (
                <Card className="border-2">
                  <CardContent className="p-12">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Memuat data...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : error ? (
                <Card className="border-2 border-red-200 dark:border-red-900">
                  <CardContent className="p-12">
                    <div className="flex flex-col items-center gap-3">
                      <XCircle className="w-12 h-12 text-red-500" />
                      <p className="text-sm text-muted-foreground text-center">{error}</p>
                      <Button variant="outline" onClick={fetchAll} className="mt-2">
                        Coba Lagi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : !data ? (
                <Card className="border-2">
                  <CardContent className="p-12">
                    <div className="flex flex-col items-center gap-2">
                      <Database className="w-12 h-12 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">Data tidak ditemukan</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                    <Card className="border-2 hover:shadow-lg transition-all">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                              Total Tahun
                            </p>
                            <h3 className="text-xl sm:text-2xl font-bold mt-1">{totalYears}</h3>
                          </div>
                          <div className="p-2 sm:p-3 rounded-xl bg-primary/10 flex-shrink-0">
                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:shadow-lg transition-all">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                              Tahun Terakhir
                            </p>
                            <h3 className="text-xl sm:text-2xl font-bold mt-1">{latestYear || '-'}</h3>
                          </div>
                          <div className="p-2 sm:p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex-shrink-0">
                            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:shadow-lg transition-all">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                              Total Nilai
                            </p>
                            <h3 className="text-xl sm:text-2xl font-bold mt-1 truncate">{totalValue.toLocaleString()}</h3>
                          </div>
                          <div className="p-2 sm:p-3 rounded-xl bg-green-100 dark:bg-green-900/20 flex-shrink-0">
                            <Hash className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:shadow-lg transition-all">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                              Rata-rata
                            </p>
                            <h3 className="text-xl sm:text-2xl font-bold mt-1 truncate">{avgValue.toLocaleString()}</h3>
                          </div>
                          <div className="p-2 sm:p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex-shrink-0">
                            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="break-words">{data.uraian_dssd}</span>
                          </CardTitle>
                          <CardDescription className="mt-2">
                            Informasi detail dan spesifikasi data sektoral
                          </CardDescription>
                        </div>
                        <Badge variant={data.active ? "default" : "secondary"} className="gap-1 flex-shrink-0">
                          {data.active ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              Aktif
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              Tidak Aktif
                            </>
                          )}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <InfoRow 
                        icon={Hash} 
                        label="ID Data" 
                        value={`#${data.id}`} 
                      />
                      <InfoRow 
                        icon={Hash} 
                        label="Kode DSSD" 
                        value={data.kode_dssd}
                      />
                      <InfoRow 
                        icon={Hash} 
                        label="Kode Urusan" 
                        value={data.kode_urusan}
                      />
                      <InfoRow 
                        icon={Layers} 
                        label="Jenis Data" 
                        value={data.jenis_string}
                      />
                      <InfoRow 
                        icon={Tag} 
                        label="Kategori" 
                        value={data.kategori_string}
                      />
                      <InfoRow 
                        icon={Ruler} 
                        label="Satuan" 
                        value={data.satuan}
                      />
                      <InfoRow 
                        icon={Box} 
                        label="Dimensi" 
                        value={data.dimensi || "-"}
                      />
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-primary" />
                          Grafik Bar
                        </CardTitle>
                        <CardDescription>
                          Visualisasi data per tahun dalam bentuk bar
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {chartData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                              <XAxis 
                                dataKey="tahun" 
                                tick={{ fontSize: 12 }}
                              />
                              <YAxis tick={{ fontSize: 12 }} />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--background))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }}
                                formatter={(value: any, name: any) => [
                                  `${value} ${data.satuan}`,
                                  'Jumlah'
                                ]}
                              />
                              <Bar dataKey="jumlah" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-[250px] flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">Tidak ada data untuk ditampilkan</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          Grafik Trend
                        </CardTitle>
                        <CardDescription>
                          Trend perkembangan data sepanjang waktu
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {chartData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                              <XAxis 
                                dataKey="tahun" 
                                tick={{ fontSize: 12 }}
                              />
                              <YAxis tick={{ fontSize: 12 }} />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--background))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }}
                                formatter={(value: any) => [
                                  `${value} ${data.satuan}`,
                                  'Jumlah'
                                ]}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="jumlah" 
                                stroke="hsl(var(--primary))" 
                                strokeWidth={2}
                                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-[250px] flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">Tidak ada data untuk ditampilkan</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Riwayat Input Data
                      </CardTitle>
                      <CardDescription>
                        Data input per tahun dari berbagai OPD
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0 sm:p-6">
                      <div className="rounded-lg border overflow-hidden">
                        <ScrollArea className="w-full">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/50">
                                <TableHead className="font-semibold whitespace-nowrap">Tahun</TableHead>
                                <TableHead className="font-semibold whitespace-nowrap">Jumlah</TableHead>
                                <TableHead className="font-semibold whitespace-nowrap">Satuan</TableHead>
                                <TableHead className="font-semibold whitespace-nowrap">OPD</TableHead>
                                <TableHead className="font-semibold whitespace-nowrap">Aksi</TableHead>
                              </TableRow>
                            </TableHeader>

                            <TableBody>
                              {data.input?.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={5} className="text-center py-12">
                                    <div className="flex flex-col items-center gap-2">
                                      <FileText className="w-12 h-12 text-muted-foreground/50" />
                                      <p className="text-sm text-muted-foreground">Belum ada data input</p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ) : (
                                data.input?.sort((a, b) => b.tahun - a.tahun).map((row, idx) => (
                                  <TableRow key={idx} className="hover:bg-muted/50 transition-colors">
                                    <TableCell className="font-medium">
                                      <Badge variant="secondary" className="gap-1 whitespace-nowrap">
                                        <Calendar className="w-3 h-3" />
                                        {row.tahun}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-base sm:text-lg font-bold whitespace-nowrap">
                                      {row.jumlah.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                      <span className="text-sm text-muted-foreground whitespace-nowrap">{data.satuan}</span>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2 whitespace-nowrap">
                                        <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                        <span className="text-sm">ID OPD: {row.id_opd}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex gap-2 whitespace-nowrap">
                                        <AlertDialog open={editDialogOpen && editData?.id === row.id_data_sektoral} onOpenChange={setEditDialogOpen}>
                                          <AlertDialogTrigger asChild>
                                            <Button 
                                              variant="outline" 
                                              size="sm" 
                                              className="gap-1"
                                              onClick={() => openEditDialog(row.id_data_sektoral, row.tahun, row.jumlah)}
                                            >
                                              <Edit className="w-3 h-3" />
                                              <span className="hidden sm:inline">Edit</span>
                                            </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Edit Data</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                Ubah jumlah data untuk tahun {editData?.tahun}
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="py-4">
                                              <Label htmlFor="jumlah">Jumlah</Label>
                                              <Input
                                                id="jumlah"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="mt-1"
                                              />
                                            </div>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>Batal</AlertDialogCancel>
                                              <AlertDialogAction onClick={handleSaveEdit}>Simpan</AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                        
                                        <AlertDialog open={deleteDialogOpen && deleteData?.id === row.id_data_sektoral} onOpenChange={setDeleteDialogOpen}>
                                          <AlertDialogTrigger asChild>
                                            <Button 
                                              variant="outline" 
                                              size="sm" 
                                              className="gap-1 text-red-500 hover:text-red-700"
                                              onClick={() => openDeleteDialog(row.id_data_sektoral, row.tahun)}
                                            >
                                              <XCircle className="w-3 h-3" />
                                              <span className="hidden sm:inline">Hapus</span>
                                            </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                Apakah Anda yakin ingin menghapus data untuk tahun {deleteData?.tahun}? Tindakan ini tidak dapat dibatalkan.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>Batal</AlertDialogCancel>
                                              <AlertDialogAction 
                                                onClick={handleDeleteSektoral}
                                                className="bg-red-500 hover:bg-red-600"
                                              >
                                                Hapus
                                              </AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Dataset
                          </CardTitle>
                          <CardDescription className="mt-1">
                            Daftar dataset yang terkait
                          </CardDescription>
                        </div>
                        <Button className="gap-2 w-full sm:w-auto" asChild>
                          <Link to={`/create-dataset/${id}`}>
                            <Plus className="w-4 h-4" />
                            Tambah Dataset
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0 sm:p-6">
                      {!dataset || dataset.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-12">
                          <FileText className="w-12 h-12 text-muted-foreground/50" />
                          <p className="text-sm text-muted-foreground">
                            Dataset tidak ditemukan
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-lg border overflow-hidden">
                          <ScrollArea className="w-full">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/50">
                                  <TableHead className="font-semibold whitespace-nowrap">ID</TableHead>
                                  <TableHead className="font-semibold whitespace-nowrap">Publisher</TableHead>
                                  <TableHead className="font-semibold whitespace-nowrap">Tipe Publisher</TableHead>
                                  <TableHead className="font-semibold whitespace-nowrap">Akses Level</TableHead>
                                  <TableHead className="font-semibold whitespace-nowrap">Tipe Dataset</TableHead>
                                  <TableHead className="font-semibold whitespace-nowrap">Diterbitkan</TableHead>
                                  <TableHead className="font-semibold whitespace-nowrap">Definisi</TableHead>
                                  <TableHead className="font-semibold whitespace-nowrap">Aksi</TableHead>
                                </TableRow>
                              </TableHeader>

                              <TableBody>
                                {dataset.map((item, index) => (
                                  <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                                    <TableCell className="font-medium whitespace-nowrap">#{item.id}</TableCell>
                                    <TableCell className="whitespace-nowrap">{item.nama_publisher}</TableCell>
                                    <TableCell className="whitespace-nowrap">{item.type_publisher}</TableCell>
                                    <TableCell className="whitespace-nowrap">
                                      <Badge variant="outline" className="capitalize">
                                        {item.access_level}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">{item.type_dataset}</TableCell>
                                    <TableCell className="whitespace-nowrap">{item.IssuedFormatted}</TableCell>
                                    <TableCell className="max-w-[200px]">
                                      <div className="max-h-24 overflow-y-auto whitespace-normal break-words">
                                        {stripHtml(item.description)}
                                      </div>
                                    </TableCell>


                                    <TableCell className="whitespace-nowrap">
                                      <AlertDialog open={deleteDatasetDialogOpen && deleteDatasetId === item.id} onOpenChange={setDeleteDatasetDialogOpen}>
                                        <AlertDialogTrigger asChild>
                                          <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="gap-1 text-red-500 hover:text-red-700"
                                            onClick={() => openDeleteDatasetDialog(item.id)}
                                          >
                                            <XCircle className="w-3 h-3" />
                                            <span className="hidden sm:inline">Hapus</span>
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Konfirmasi Hapus Dataset</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Apakah Anda yakin ingin menghapus dataset ini? Tindakan ini tidak dapat dibatalkan.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                            <AlertDialogAction 
                                              onClick={handleDeleteDataset}
                                              className="bg-red-500 hover:bg-red-600"
                                            >
                                              Hapus
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}