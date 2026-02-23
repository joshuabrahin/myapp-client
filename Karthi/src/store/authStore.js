import { create } from "zustand"

const AUTH_KEY = "auth"
const PROFILE_KEY = "user_profiles"
const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "")

const getErrorMessage = async (response, fallback) => {
  try {
    const data = await response.json()
    return data?.message || fallback
  } catch {
    return fallback
  }
}

const loadProfiles = () => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return {}

    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === "object" ? parsed : {}
  } catch {
    return {}
  }
}

const saveProfiles = (profiles) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles))
}

let storedAuth = null

try {
  const localAuth = localStorage.getItem(AUTH_KEY)
  const sessionAuth = sessionStorage.getItem(AUTH_KEY)
  const raw = localAuth || sessionAuth
  storedAuth = raw ? JSON.parse(raw) : null
} catch {
  storedAuth = null
}

export const useAuthStore = create((set) => ({
  user: storedAuth?.user || null,
  token: storedAuth?.token || null,
  role: storedAuth?.role || null,
  isAuthenticated: !!storedAuth?.token,

  register: async ({ fullName, age, phone, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: normalizedEmail,
        password: password.trim(),
      }),
    })

    if (!response.ok) {
      throw new Error(await getErrorMessage(response, "Unable to sign in"))
    }

    const profiles = loadProfiles()
    profiles[normalizedEmail] = {
      fullName: fullName?.trim() || "",
      age,
      phone: phone?.trim() || "",
    }
    saveProfiles(profiles)
  },

  login: async ({ email, password, remember }) => {
    const normalizedEmail = email.trim().toLowerCase()

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: normalizedEmail,
        password: password.trim(),
      }),
    })

    if (!response.ok) {
      throw new Error(await getErrorMessage(response, "Invalid email or password"))
    }

    const data = await response.json()
    const token = data?.accessToken || data?.access_token || null

    if (!token) {
      throw new Error("Login response did not include an access token")
    }

    const profiles = loadProfiles()
    const profile = profiles[normalizedEmail] || {}

    const authData = {
      user: {
        fullName: profile.fullName || data?.user?.email,
        email: data?.user?.email || normalizedEmail,
        age: profile.age || null,
        phone: profile.phone || "",
      },
      token,
      role: "user",
    }

    if (remember) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData))
      sessionStorage.removeItem(AUTH_KEY)
    } else {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(authData))
      localStorage.removeItem(AUTH_KEY)
    }

    set({
      ...authData,
      isAuthenticated: true,
    })
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY)
    sessionStorage.removeItem(AUTH_KEY)

    set({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
    })
  },
}))
