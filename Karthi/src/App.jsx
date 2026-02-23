import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Admin from "./pages/Admin"

import AuthGuard from "./guards/AuthGuard"
import RoleGuard from "./guards/RoleGuard"
import { useAuthStore } from "./store/authStore"

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />}
        />

        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />}
        />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />

        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
            
          } //changes in the code
        />

        <Route
          path="/admin"
          element={
            <AuthGuard>
              <RoleGuard allowedRoles={["admin"]}>
                <Admin />
              </RoleGuard>
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
