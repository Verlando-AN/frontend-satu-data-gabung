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
import LoginImageSection from "@/components/auth/login-image-section"

interface LoginFormProps
  extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSubmit?: (nip: string, password: string) => Promise<void> | void
}

export function LoginForm({ className, onSubmit, ...props }: LoginFormProps) {
  const [nip, setNip] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!onSubmit) return
    setLoading(true)
    try {
      await onSubmit(nip, password)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldDescription className="text-righ">
        <a href="/">- Home</a>
      </FieldDescription>
      <Card className="overflow-hidden p-0">
        
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your credentials to continue
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="nip">
                  NIP <small><i>(Nomor Induk Pegawai)</i></small>
                  <span className="text-red-500 ml-0">*</span>
                </FieldLabel>
                <Input
                  id="nip"
                  type="number"
                  placeholder=""
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    Password
                    <span className="text-red-500 ml-0">*</span>
                  </FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline text-muted-600"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <LoginImageSection />
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
