import { create } from 'zustand'

interface ITheme {
    theme: "DARK" | "LIGHT"
    setTheme: (mode: "DARK" | "LIGHT") => void
}

export const useTheme = create<ITheme>(set => (
    {
        theme: "LIGHT",
        setTheme: (mode) => set({ theme: mode })
    }
))