import { create } from "zustand"

const AUTH_KEY = "auth"
const USERS_KEY = "users"

const defaultUsers = [
  {
    email: "admin@mail.com",
    password: "Admin@123",
    fullName: "Admin User",
    age: 30,
    phone: "9876543210",
    role: "admin",
  },
  {
    email: "user@mail.com",
    password: "User@123",
    fullName: "Regular User",
    age: 25,
    phone: "9123456780",
    role: "user",
  },
]

const loadUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
      return defaultUsers
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
      return defaultUsers
    }

    return parsed
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
    return defaultUsers
  }
}

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
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
    await new Promise((res) => setTimeout(res, 400))

    const normalizedEmail = email.trim().toLowerCase()
    const users = loadUsers()

    const exists = users.some((item) => item.email.toLowerCase() === normalizedEmail)

    if (exists) {
      throw new Error("User already exists")
    }

    const newUser = {
      email: normalizedEmail,
      password,
      fullName: fullName.trim(),
      age,
      phone,
      role: "user",
    }

    saveUsers([...users, newUser])
  },

  login: async ({ email, password, remember }) => {
    await new Promise((res) => setTimeout(res, 500))

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()

    const users = loadUsers()
    const userByEmail = users.find((item) => item.email.toLowerCase() === normalizedEmail)

    if (!userByEmail) {
      throw new Error("Account not found. Please Sign In first.")
    }

    if (userByEmail.password !== normalizedPassword) {
      throw new Error("Wrong password. Please try again.")
    }

    const authData = {
      user: {
        fullName: userByEmail.fullName,
        email: userByEmail.email,
        age: userByEmail.age,
        phone: userByEmail.phone,
      },
      token: "jwt_token_123456",
      role: userByEmail.role,
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
