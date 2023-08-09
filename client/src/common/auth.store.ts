/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { create } from "zustand";
import { IUser } from "@/types";

interface IAuth {
  user: IUser | null | undefined;
  loading: boolean; // I'll change that later
  error: Error | null | undefined;
  loginStart: () => void;
  loginSuccess: (user: IUser) => void;
  loginFailure: (error: Error | null | undefined) => void;
  logout: () => void;
}

export const useAuth = create<IAuth>((set) => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || "{}") : null,
  loading: false,
  error: null,
  loginStart: () => set({ loading: true }),
  loginSuccess: (user) => set(
    { user, loading: false }),
  loginFailure: (error) => set({ error, loading: false }),
  logout: () => {
    localStorage.clear();
    set({ user: null });
  },
}));
