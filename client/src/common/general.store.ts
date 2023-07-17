import { create } from 'zustand'

interface ITheme {
    darkMode: boolean
    toggle: () => void
    setTheme: (mode: boolean) => void
}

export const useTheme = create<ITheme>(set => (
    {
        darkMode: false,
        toggle: () => set((state) => ({ darkMode: !state })),
        setTheme: (mode) => {
            set({ darkMode: mode })
            console.log(mode,'darkMode context')
        }
    }
))