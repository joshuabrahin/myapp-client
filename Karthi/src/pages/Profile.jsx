import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export default function Profile() {
  const user = useAuthStore((state) => state.user)

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Profile</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">{user?.fullName || "User Profile"}</h1>
          <p className="mt-2 text-sm text-slate-600">Manage and review your registered details.</p>
        </section>
        
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Full Name</p>
            <p className="mt-1 font-medium text-slate-900">{user?.fullName || "-"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-1 font-medium text-slate-900">{user?.email || "-"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Age</p>
            <p className="mt-1 font-medium text-slate-900">{user?.age || "-"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Phone</p>
            <p className="mt-1 font-medium text-slate-900">{user?.phone || "-"}</p>
          </div>
        </section>

        <Link
          to="/dashboard"
          className="inline-block rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  )
}
