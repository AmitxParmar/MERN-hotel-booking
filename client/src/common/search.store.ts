import { create } from "zustand";

interface ISearchParams {
    city: string | undefined
    dates: [Date] | []
    options: {
        adult: number | undefined
        children: number | undefined
        room: number | undefined
    }
}

export const useSearch = create<ISearchParams>(set => (
    {
        city: undefined,
        dates: [],
        options: {
            adult: undefined,
            children: undefined,
            room: undefined,
        },
    }
))