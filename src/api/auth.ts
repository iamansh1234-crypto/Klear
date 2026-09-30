import { api } from "./client";

export const sendOtp = (email: string) =>
  api.post("/auth/send-otp", { email });

export const verifyOtp = (email: string, code: string) =>
  api.post("/auth/verify-otp", { email, code });      