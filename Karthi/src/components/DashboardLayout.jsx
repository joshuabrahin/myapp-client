
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back 👋 Here’s what’s happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">Total Users</p>
              <h2 className="text-2xl font-bold">1,245</h2>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">Revenue</p>
              <h2 className="text-2xl font-bold">$8,430</h2>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">Active Sessions</p>
              <h2 className="text-2xl font-bold">87</h2>
            </CardContent>
          </Card>

        </div>

        {/* Recent Activity */}
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>

            <div className="text-sm text-gray-600 space-y-2">
              <p>✅ New user registered</p>
              <p>💰 Payment received</p>
              <p>⚙️ Settings updated</p>
            </div>

            <Button variant="outline">
              View Details
            </Button>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  )
}
