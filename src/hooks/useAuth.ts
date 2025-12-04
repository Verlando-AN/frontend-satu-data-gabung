import { useState, useEffect } from "react"
import { login as apiLogin, logout as apiLogout } from "@/api/auth"

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsAuthenticated(!!token)
    }, [])

    const login = async (nip: string, password: string) => {
        const data = await apiLogin({ nip, password })
        localStorage.setItem("token", data.token)
        setIsAuthenticated(true)
        return data
    }

    const logout = () => {
        apiLogout()
        setIsAuthenticated(false)
    }

    return { isAuthenticated, login, logout }
}
