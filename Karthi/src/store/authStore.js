import { create } from "zustand"

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,

  login: (email) =>
    set({
      isAuthenticated: true,
      user: { email },
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}))
