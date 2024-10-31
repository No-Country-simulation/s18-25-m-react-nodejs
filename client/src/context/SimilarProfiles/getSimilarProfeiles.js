import { create } from "zustand";

export const useSimilarProfile = create((set) => ({
  profiles: [],
  page: 1,
  loading: true,

  getSimilarProfile: async () => {
    const data = await import("../../data/similarProfile/similarProfile.json");
    const response = data.response;
    set((state) => {
      return {
        profiles: response,
        loading: false,
      };
    });
  },
}));


