import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { useAuthStore } from "../store/authStore"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

export default function SignIn() {
  const register = useAuthStore((state) => state.register)
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [age, setAge] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  const validatePhone = (value) => /^\d{10}$/.test(value)

  const handleSignIn = async () => {
    setError("")

    const nameValue = fullName.trim()
    const ageValue = age.trim()
    const phoneValue = phone.trim()
    const emailValue = email.trim()
    const passwordValue = password.trim()
    const confirmValue = confirmPassword.trim()

    if (!nameValue || !ageValue || !phoneValue || !emailValue || !passwordValue || !confirmValue) {
      setError("Please fill all fields")
      return
    }

    if (nameValue.length < 3) {
      setError("Name must be at least 3 characters")
      return
    }

    const ageNumber = Number(ageValue)
    if (!Number.isInteger(ageNumber) || ageNumber < 18 || ageNumber > 100) {
      setError("Age must be a whole number between 18 and 100")
      return
    }

    if (!validatePhone(phoneValue)) {
      setError("Phone must be exactly 10 digits")
      return
    }

    if (!validateEmail(emailValue)) {
      setError("Please enter a valid email")
      return
    }

    if (passwordValue.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (passwordValue !== confirmValue) {
      setError("Passwords do not match")
      return
    }

    try {
      setLoading(true)
      await register({
        fullName: nameValue,
        age: ageNumber,
        phone: phoneValue,
        email: emailValue,
        password: passwordValue,
      })
      toast.success("Sign in successful. Please log in.")
      navigate("/login", { replace: true })
    } catch (err) {
      setError(err?.message || "Unable to sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <Card className="border-0 shadow-none">
          <CardContent className="space-y-6 p-0">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
              <p className="mt-1 text-sm text-slate-500">Create an account first, then log in.</p>
            </div>

            {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Full name</label>
                <Input
                  className="border-slate-300 focus-visible:ring-blue-500"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Age</label>
                <Input
                  className="border-slate-300 focus-visible:ring-blue-500"
                  type="number"
                  min="18"
                  max="100"
                  placeholder="24"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Phone</label>
                <Input
                  className="border-slate-300 focus-visible:ring-blue-500"
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <Input
                  className="border-slate-300 focus-visible:ring-blue-500"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Input
                  className="border-slate-300 focus-visible:ring-blue-500"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Confirm password</label>
                <Input
                  className="border-slate-300 focus-visible:ring-blue-500"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800" onClick={handleSignIn} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="text-center text-sm text-slate-600">
              Already signed in?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:underline">
                Go to Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
