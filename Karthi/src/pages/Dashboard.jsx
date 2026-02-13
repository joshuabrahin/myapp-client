import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      <p className="text-gray-600">
        Welcome, <span className="font-medium">{user?.email}</span>
      </p>

      <Button onClick={logout} variant="destructive">
        Logout
      </Button>
    </div>
  );
}
