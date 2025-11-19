// src/pages/LoginPage.tsx
import { useNavigate } from "react-router-dom"
import { LoginForm } from "@/components/login-form"
import { login } from "@/api/auth"

export default function LoginPage() {
    const navigate = useNavigate()

    const handleLogin = async (nip: string, password: string) => {
        try {
            const user = await login({ nip, password })
            localStorage.setItem("token", user.token)
            navigate("/dashboard") // redirect ke dashboard
        } catch (error: any) {
            alert(error.message)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <div className="w-full max-w-4xl">
                <LoginForm onSubmit={handleLogin} />
            </div>
        </div>
    )
}
