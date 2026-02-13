import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  login: (email) =>
    set({
      user: { email },
    }),

  logout: () =>
    set({
      user: null,
    }),
}));
