import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { api } from "@/api/client";

type User = { id: string; email: string; phone: string };

type AuthState = {
  user: User | null;
  loading: boolean;
  signup: (d: { email: string; phone: string; password: string }) => Promise<void>;
  login: (d: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,

  signup: async (d) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/auth/signup", d);
      await SecureStore.setItemAsync("klear_token", data.token);
      set({ user: data.user });
    } finally {
      set({ loading: false });
    }
  },

  login: async (d) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/auth/login", d);
      await SecureStore.setItemAsync("klear_token", data.token);
      set({ user: data.user });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("klear_token");
    set({ user: null });
  },
}));