import { ISearchParams } from "@/types";
import { create } from "zustand";


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
));