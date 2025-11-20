import { Navigate } from "react-router-dom"
import { getToken } from "@/api/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getToken()

  if (!token) {
    return <Navigate to="/Notfound-landing" replace />
  }

  return <>{children}</>
}
