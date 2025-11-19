import { Navigate } from "react-router-dom"
import { getToken } from "@/api/auth"

interface GuestRouteProps {
  children: React.ReactNode
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const token = getToken()

  if (token) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
