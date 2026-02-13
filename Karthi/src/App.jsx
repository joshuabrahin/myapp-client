import Login from "./pages/login"
import Dashboard from "./pages/Dashboard"
import { useAuthStore } from "./store/authStore"

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return isAuthenticated ? <Dashboard /> : <Login />
}
