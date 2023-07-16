import { create } from 'zustand'

interface ITheme {
    darkMode: boolean
    toggle: () => void
}

export const useTheme = create<ITheme>(set => (
    {
        darkMode: false,
        toggle: () => set((state) => ({ darkMode: !state }))
    }
))