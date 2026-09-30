import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { api } from "@/api/client";

type User = { id: string; email: string; phone: string; name?: string };

type AuthState = {
  user: User | null;
  pendingEmail: string | null;
  loading: boolean;
  signup: (d: { email: string; phone: string; password: string }) => Promise<void>;
  verify: (code: string) => Promise<void>;
  resend: () => Promise<void>;
  login: (d: { email: string; password: string }) => Promise<"ok" | "verify">;
  restore: () => Promise<boolean>;
  logout: () => Promise<void>;
};

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  pendingEmail: null,
  loading: false,

  signup: async (d) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/auth/signup", d);
      set({ pendingEmail: data.email });
    } finally {
      set({ loading: false });
    }
  },

  verify: async (code) => {
    const email = get().pendingEmail;
    if (!email) throw new Error("Session missing. Dobara signup karo.");
    const { data } = await api.post("/auth/verify-otp", { email, code });
    await SecureStore.setItemAsync("klear_token", data.token);
    set({ user: data.user, pendingEmail: null });
  },

  resend: async () => {
    const email = get().pendingEmail;
    if (!email) throw new Error("Session missing. Dobara signup karo.");
    await api.post("/auth/send-otp", { email });
  },

  login: async (d) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/auth/login", d);
      await SecureStore.setItemAsync("klear_token", data.token);
      set({ user: data.user });
      return "ok";
    } catch (e: any) {
      if (e?.response?.status === 403 && e?.response?.data?.needsVerification) {
        set({ pendingEmail: e.response.data.email });
        return "verify";
      }
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  restore: async () => {
    const token = await SecureStore.getItemAsync("klear_token");
    if (!token) return false;
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data.user });
      return true;
    } catch {
      await SecureStore.deleteItemAsync("klear_token");
      return false;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("klear_token");
    set({ user: null, pendingEmail: null });
  },
}));