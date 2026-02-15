import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export default function AuthGuard({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/signin" replace />
}
