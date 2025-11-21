import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { getAuthHeaders } from "@/api/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Hash, 
  Shield, 
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Edit,
  Save,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

interface ProfileResponse {
  id: string;
  nip: string;
  email: string;
  phone: string;
  level: number;
  level_string: string;
  full_name: string;
  kode_wilayah: string;
  id_opd: number;
  kode_bidang_urusan_1: string;
  kode_bidang_urusan_2: string;
  kode_bidang_urusan_3: string;
  kode_main_opd: string;
  kode_sub_opd: string;
  kode_opd: string;
  nama_opd: string;
  level_opd: number;
  level_opd_string: string;
}

export default function Profile() {
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Password form states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/strict/user/profile`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      const result = await response.json();
      const finalData = result?.data ?? result?.hasil ?? result?.result ?? result;

      setData(finalData || null);
    } catch (error) {
      console.error("Error fetching:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Semua field harus diisi' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Password baru dan konfirmasi tidak cocok' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password minimal 6 karakter' });
      return;
    }

    try {
      setPasswordLoading(true);
      setPasswordMessage(null);

      const response = await fetch(`${API_URL}/strict/user/change-password`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Gagal mengubah password');
      }

      setPasswordMessage({ type: 'success', text: 'Password berhasil diubah!' });
      
      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
    } catch (error: any) {
      setPasswordMessage({ type: 'error', text: error.message || 'Terjadi kesalahan' });
    } finally {
      setPasswordLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group">
      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
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
            <div className="flex flex-1 flex-col gap-6 p-6 bg-muted/30">
              {/* Header Section */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profil Pengguna</h1>
                    <p className="text-sm text-muted-foreground">
                      Kelola informasi akun dan keamanan Anda
                    </p>
                  </div>
                </div>
              </div>

              {loading ? (
                <Card className="max-w-4xl border-2">
                  <CardContent className="p-12">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      <p className="text-sm text-muted-foreground">Memuat data profil...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : !data ? (
                <Card className="max-w-4xl border-2">
                  <CardContent className="p-12">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <User className="h-12 w-12 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">Tidak ada data profil tersedia.</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 lg:grid-cols-3 max-w-7xl">
                  {/* Left Column - Profile Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Profile Header Card */}
                    <Card className="border-2">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <div className="relative">
                              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-lg">
                                {data.full_name.charAt(0).toUpperCase()}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-background" />
                            </div>
                            <div className="space-y-2">
                              <CardTitle className="text-2xl">{data.full_name}</CardTitle>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="default" className="gap-1">
                                  <Shield className="h-3 w-3" />
                                  {data.level_string}
                                </Badge>
                                <Badge variant="secondary" className="gap-1">
                                  <Hash className="h-3 w-3" />
                                  NIP: {data.nip}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Organization Info Card */}
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          Informasi Organisasi
                        </CardTitle>
                        <CardDescription>
                          Detail perangkat daerah dan kode organisasi
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <InfoRow 
                          icon={Building2} 
                          label="Nama OPD" 
                          value={data.nama_opd} 
                        />
                        <InfoRow 
                          icon={Hash} 
                          label="Kode OPD" 
                          value={data.kode_opd} 
                        />
                        <InfoRow 
                          icon={Shield} 
                          label="Level OPD" 
                          value={data.level_opd_string} 
                        />
                        <InfoRow 
                          icon={MapPin} 
                          label="Kode Wilayah" 
                          value={data.kode_wilayah} 
                        />
                      </CardContent>
                    </Card>

                    {/* Contact Info Card */}
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Mail className="h-5 w-5 text-primary" />
                          Informasi Kontak
                        </CardTitle>
                        <CardDescription>
                          Detail kontak dan komunikasi
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <InfoRow 
                          icon={Mail} 
                          label="Email" 
                          value={data.email || "Tidak ada data"} 
                        />
                        <InfoRow 
                          icon={Phone} 
                          label="Nomor Telepon" 
                          value={data.phone || "Tidak ada data"} 
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Column - Password Change */}
                  <div className="space-y-6">
                    <Card className="border-2 sticky top-6">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <KeyRound className="h-5 w-5 text-primary" />
                          Keamanan Akun
                        </CardTitle>
                        <CardDescription>
                          Ubah password untuk keamanan akun Anda
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Current Password */}
                          <div className="space-y-2">
                            <Label htmlFor="current-password" className="text-sm font-medium">
                              Password Lama
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="current-password"
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Masukkan password lama"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="pl-10 pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* New Password */}
                          <div className="space-y-2">
                            <Label htmlFor="new-password" className="text-sm font-medium">
                              Password Baru
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Masukkan password baru"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="pl-10 pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              >
                                {showNewPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Minimal 6 karakter
                            </p>
                          </div>

                          {/* Confirm Password */}
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password" className="text-sm font-medium">
                              Konfirmasi Password
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Konfirmasi password baru"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-10 pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Message */}
                          {passwordMessage && (
                            <Alert variant={passwordMessage.type === 'error' ? 'destructive' : 'default'}>
                              {passwordMessage.type === 'success' ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <AlertCircle className="h-4 w-4" />
                              )}
                              <AlertDescription>{passwordMessage.text}</AlertDescription>
                            </Alert>
                          )}

                          {/* Submit Button */}
                          <Button 
                            onClick={handleChangePassword}
                            className="w-full gap-2"
                            disabled={passwordLoading}
                          >
                            {passwordLoading ? (
                              <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Menyimpan...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Ubah Password
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Security Tips Card */}
                    <Card className="border-2 bg-primary/5">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Tips Keamanan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-xs space-y-2 text-muted-foreground">
                          <p>• Gunakan kombinasi huruf besar, kecil, angka</p>
                          <p>• Hindari menggunakan informasi pribadi</p>
                          <p>• Ubah password secara berkala</p>
                          <p>• Jangan bagikan password ke siapapun</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}