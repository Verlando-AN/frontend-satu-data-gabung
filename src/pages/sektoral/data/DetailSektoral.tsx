import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Database, 
  CheckCircle2, 
  XCircle, 
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
  Globe,
  Clock,
  User,
  Fingerprint,
} from "lucide-react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { getAuthHeaders } from "@/api/auth";

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

const API_URL = import.meta.env.VITE_API_URL || "https://api-satudata.lampungtimurkab.go.id";

interface InputItem {
  id_opd: number;
  id_data_sektoral: number;
  tahun: number;
  jumlah: number;
}

interface DetailSektoral {
  id: number;
  kode_urusan: string;
  jenis: number;
  kategori: number;
  jenis_string: string;
  kategori_string: string;
  kode_dssd: string;
  uraian_dssd: string;
  satuan: string;
  dimensi: string;
  active: boolean;
  input: InputItem[];
}

// Interface untuk data dataset
interface DatasetDetail {
  nama_publisher: string;
  type_publisher: string;
  access_level: string;
  type_dataset: string;
  description: string;
  issued: string;
  IssuedFormatted: string;
  identifier: string;
  landing_page: string;
  modified: string;
  ModifiedFormatted: string;
}

export default function DetailSektoral() {
  const { id } = useParams();
  
  const [data, setData] = useState<DetailSektoral | null>(null);
  const [loading, setLoading] = useState(true);

  // Data contoh dataset
  const sampleDataset: DatasetDetail[] = [
    {
      "nama_publisher": "Dinas Komunikasi dan Informatika",
      "type_publisher": "org:Organization",
      "access_level": "public",
      "type_dataset": "dcat:Dataset",
      "description": "Aplikasi layanan berbasis elektronik adalah sistem atau platform yang menggunakan teknologi informasi dan komunikasi untuk menyediakan layanan kepada pengguna secara online. Aplikasi dalam teknologi informasi merujuk pada program atau perangkat lunak yang dirancang untuk membantu pengguna dalam menjalankan tugas tertentu, menyelesaikan masalah, atau mengelola informasi",
      "issued": "2024-10-17T00:00:00Z",
      "IssuedFormatted": "2024-10-17",
      "identifier": "c6865d0f-9c68-44cf-9b42-653840c8ba62",
      "landing_page": "",
      "modified": "2024-10-17T00:00:00Z",
      "ModifiedFormatted": "2024-10-17"
    }
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/strict/data-sektoral/detail/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const result = await response.json();
      setData(result);
      
    } catch (error) {
      console.error("Error fetching detail:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Prepare chart data - sort by year
  const chartData = data?.input?.map(item => ({
    tahun: item.tahun.toString(),
    jumlah: item.jumlah,
    satuan: data.satuan
  })).sort((a, b) => parseInt(a.tahun) - parseInt(b.tahun)) || [];

  // Calculate statistics
  const totalYears = data?.input?.length || 0;
  const latestYear = data?.input?.length ? Math.max(...data.input.map(i => i.tahun)) : 0;
  const totalValue = data?.input?.reduce((sum, item) => sum + item.jumlah, 0) || 0;
  const avgValue = totalYears > 0 ? Math.round(totalValue / totalYears) : 0;

  const InfoRow = ({ icon: Icon, label, value, valueClassName = "" }: any) => (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className={`text-sm font-semibold ${valueClassName}`}>{value}</p>
      </div>
    </div>
  );

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-col flex-1 gap-6 p-6 bg-muted/30">

              {/* Header Section */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Database className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Detail Data Sektoral</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Informasi lengkap dan riwayat input data
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={fetchData} className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
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
                  {/* Stats Cards */}
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-2 hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Total Tahun
                            </p>
                            <h3 className="text-2xl font-bold mt-1">{totalYears}</h3>
                          </div>
                          <div className="p-3 rounded-xl bg-primary/10">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Tahun Terakhir
                            </p>
                            <h3 className="text-2xl font-bold mt-1">{latestYear || '-'}</h3>
                          </div>
                          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
                            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Total Nilai
                            </p>
                            <h3 className="text-2xl font-bold mt-1">{totalValue.toLocaleString()}</h3>
                          </div>
                          <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
                            <Hash className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Rata-rata
                            </p>
                            <h3 className="text-2xl font-bold mt-1">{avgValue.toLocaleString()}</h3>
                          </div>
                          <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20">
                            <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main Info Card */}
                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            {data.uraian_dssd}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            Informasi detail dan spesifikasi data sektoral
                          </CardDescription>
                        </div>
                        <Badge variant={data.active ? "default" : "secondary"} className="gap-1">
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

                  {/* Charts Section */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Bar Chart */}
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
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

                    {/* Line Chart */}
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
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

                  {/* Input Data Table */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Riwayat Input Data
                      </CardTitle>
                      <CardDescription>
                        Data input per tahun dari berbagai OPD
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead className="font-semibold">Tahun</TableHead>
                              <TableHead className="font-semibold">Jumlah</TableHead>
                              <TableHead className="font-semibold">Satuan</TableHead>
                              <TableHead className="font-semibold">OPD</TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {data.input?.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={4} className="text-center py-12">
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
                                    <Badge variant="secondary" className="gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {row.tahun}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-lg font-bold">
                                    {row.jumlah.toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                    <span className="text-sm text-muted-foreground">{data.satuan}</span>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Building2 className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-sm">ID OPD: {row.id_opd}</span>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Dataset Information Card */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Database className="w-5 h-5 text-primary" />
                        Informasi Dataset
                      </CardTitle>
                      <CardDescription>
                        Metadata dan informasi lengkap dataset
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {sampleDataset.map((dataset, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <InfoRow 
                            icon={User} 
                            label="Publisher" 
                            value={dataset.nama_publisher}
                          />
                          <InfoRow 
                            icon={Fingerprint} 
                            label="Identifier" 
                            value={dataset.identifier}
                          />
                          <InfoRow 
                            icon={Globe} 
                            label="Access Level" 
                            value={
                              <Badge variant="outline" className="capitalize">
                                {dataset.access_level}
                              </Badge>
                            }
                          />
                          <InfoRow 
                            icon={Tag} 
                            label="Tipe Dataset" 
                            value={dataset.type_dataset}
                          />
                          <InfoRow 
                            icon={Clock} 
                            label="Tanggal Diterbitkan" 
                            value={dataset.IssuedFormatted}
                          />
                          <InfoRow 
                            icon={Clock} 
                            label="Tanggal Dimodifikasi" 
                            value={dataset.ModifiedFormatted}
                          />
                          <div className="md:col-span-2">
                            <InfoRow 
                              icon={FileText} 
                              label="Deskripsi" 
                              value={dataset.description}
                            />
                          </div>
                        </div>
                      ))}
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