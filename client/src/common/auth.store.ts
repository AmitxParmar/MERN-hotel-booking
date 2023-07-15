import { create } from "zustand";
import { IUser } from "@/types";

interface IAuth {
  user: IUser | null | undefined;
  loading: boolean; // I'll change that later
  error: null | undefined ;
  loginStart: () => void;
  loginSuccess: (user: IUser) => void;
  loginFailure: (error: null | undefined) => void;
  logout: () => void;
}

export const useAuth = create<IAuth>((set) => ({
  user: null,
  loading: false,
  error: null,
  loginStart: () => set({ loading: true }),
  loginSuccess: (user) => set({ user, loading: false }),
  loginFailure: (error) => set({ error, loading: false }),
  logout: () => {
    localStorage.clear();
    set({ user: null });
  },
}));
