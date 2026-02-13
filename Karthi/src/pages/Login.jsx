import { useState } from "react"
import { useAuthStore } from "@/store/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Login() {
  const [email, setEmail] = useState("")
  const login = useAuthStore((state) => state.login)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] rounded-xl shadow-lg">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">Sign In</h1>

          <div className="space-y-4">
            <Input
              placeholder="Enter your email"
              className="rounded-lg border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg"
            onClick={() => login(email)}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
