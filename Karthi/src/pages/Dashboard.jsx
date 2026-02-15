import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { Button } from "../components/ui/button"



export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const role = useAuthStore((state) => state.role)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/signin", { replace: true })
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Dashboard</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Welcome, {user?.fullName || user?.email}</h1>
          <p className="mt-2 text-sm text-slate-600">Your account details and quick navigation are below.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-1 font-medium text-slate-900">{user?.email || "-"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-1 font-medium text-slate-900">{role || "user"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Status</p>
            <p className="mt-1 font-medium text-emerald-600">Active</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Quick Links</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/profile"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Profile
            </Link>
            <Link
              to="/admin"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Admin Panel
            </Link>
            <Button onClick={handleLogout} className="bg-slate-900 text-white hover:bg-slate-800">
              Logout
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
