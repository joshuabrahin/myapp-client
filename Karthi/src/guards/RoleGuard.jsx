import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export default function RoleGuard({ children, allowedRoles }) {
  const role = useAuthStore((s) => s.role)

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
