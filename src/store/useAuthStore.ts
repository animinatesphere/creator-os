import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  isSubscribed: boolean;
  plan?: "Starter" | "Pro" | "Elite";
  hasSeenTour: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  subscribe: (plan: "Starter" | "Pro" | "Elite") => void;
  completeTour: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, name) => 
        set({ 
          user: { id: "1", email, name, isSubscribed: false, hasSeenTour: false }, 
          isAuthenticated: true 
        }),
      logout: () => 
        set({ 
          user: null, 
          isAuthenticated: false 
        }),
      subscribe: (plan) =>
        set((state) => ({
          user: state.user ? { ...state.user, isSubscribed: true, plan } : null
        })),
      completeTour: () =>
        set((state) => ({
          user: state.user ? { ...state.user, hasSeenTour: true } : null
        })),
    }),
    {
      name: "creator-os-auth",
    }
  )
);
