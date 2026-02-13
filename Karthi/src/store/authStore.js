import { create } from "zustand"

const savedAuth = localStorage.getItem("auth")

export const useAuthStore = create((set) => ({
  isAuthenticated: !!savedAuth,
  user: savedAuth ? JSON.parse(savedAuth) : null,

  login: (email) =>
    set({
      isAuthenticated: true,
      user: { email },
    }),

  logout: () => {
    localStorage.removeItem("auth")
    set({
      isAuthenticated: false,
      user: null,
    })
  },
}))
