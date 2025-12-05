import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Home, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react"

interface LoginFormProps
  extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSubmit?: (nip: string, password: string) => Promise<void> | void
}

const LoginImageSection = () => (
  <div className="relative hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 md:block">
    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
    <div className="relative flex h-full flex-col items-center justify-center p-8 text-white">
      <div className="mb-8 rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
        <svg
          className="h-16 w-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-center">
        Selamat Datang
      </h2>
      <p className="text-center text-red-100 max-w-sm">
        Portal untuk mengakses dan mengelola data Kabupaten Lampung Timur dengan aman dan efisien
      </p>
      <div className="mt-8 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-white/50"
            style={{
              animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
            }}
          />
        ))}
      </div>
    </div>
  </div>
)

export function LoginForm({ className, onSubmit, ...props }: LoginFormProps) {
  const [nip, setNip] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async () => {
    if (!onSubmit) return
    setLoading(true)
    try {
      await onSubmit(nip, password)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4", className)} {...props}>
      <div className="w-full max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
            <Home className="h-4 w-4" />
            <a href="/" className="text-sm font-medium">Kembali</a>
          </div>
        </div>

        <Card className="overflow-hidden shadow-2xl border-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-8 md:p-10 flex flex-col justify-center" onKeyPress={handleKeyPress}>
              <FieldGroup>
                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-xl bg-red-600 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900">Login</h1>
                      <p className="text-sm text-slate-500">Satu Data Lampung Timur</p>
                    </div>
                  </div>
                  <p className="text-slate-600">
                    Masukkan kredensial Anda untuk melanjutkan
                  </p>
                </div>

                <Field>
                  <FieldLabel htmlFor="nip" className="text-slate-700 font-medium">
                    NIP <span className="text-xs font-normal text-slate-500">(Nomor Induk Pegawai)</span>
                    <span className="text-red-500 ml-1">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="nip"
                      type="number"
                      placeholder="Masukkan NIP Anda"
                      value={nip}
                      onChange={(e) => setNip(e.target.value)}
                      className="pl-10 h-11 border-slate-200 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password" className="text-slate-700 font-medium">
                      Password
                      <span className="text-red-500 ml-1">*</span>
                    </FieldLabel>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11 border-slate-200 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </Field>

                <Field>
                  <Button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-600/30 transition-all hover:shadow-xl hover:shadow-red-600/40"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Memproses...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Masuk
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </Field>

                <FieldDescription className="text-center text-slate-600">
                  Belum punya akun?{" "}
                  <a href="#" className="text-red-600 hover:text-red-700 font-medium hover:underline">
                    Daftar sekarang
                  </a>
                </FieldDescription>
              </FieldGroup>
            </div>

            <LoginImageSection />
          </CardContent>
        </Card>

        <FieldDescription className="mt-6 px-6 text-center text-sm text-slate-500">
          Dengan melanjutkan, Anda menyetujui{" "}
          <a href="#" className="text-blue-600 hover:text-red-700 hover:underline">
            Syarat Layanan
          </a>{" "}
          dan{" "}
          <a href="#" className="text-blue-600 hover:text-red-700 hover:underline">
            Kebijakan Privasi
          </a>{" "}
          kami.
        </FieldDescription>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .bg-grid-white\/\[0\.05\] {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>
    </div>
  )
}