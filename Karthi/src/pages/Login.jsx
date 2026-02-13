import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

export default function Login() {
  const login = useAuthStore((state) => state.login)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    setError("")

    // ✅ Basic validation
    if (!email || !password) {
      setError("Please enter email and password")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // ✅ Fake login success
    login(email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] rounded-xl shadow-lg">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Sign In
          </h1>

          {/* ✅ Error Message */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={!email || !password}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
