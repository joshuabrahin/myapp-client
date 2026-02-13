import { useAuthStore } from "../store/authStore"
import { Button } from "../components/ui/button"

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">
        Welcome {user?.email}
      </h1>

      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
