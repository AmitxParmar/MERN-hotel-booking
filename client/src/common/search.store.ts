import { create } from 'zustand'
import { ISearchParams } from "@/types";


interface SearchStore extends ISearchParams {
    newSearch: (data: SearchStore) => void;
    resetSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    city: undefined,
    dates: [],
    options: undefined,
    newSearch: (data) => set(data),
    resetSearch: () => set({ city: undefined, dates: [], options: undefined }),
}));
