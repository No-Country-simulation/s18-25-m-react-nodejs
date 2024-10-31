import { create } from "zustand";
import { getProfileService } from "../../services/Profile/get-profile";

const userProfileStore = create((set) => ({
    userInstance: {
        user: {},
        proyects: [],
        likedProyects: [],
        redes: [],
        page: 0
    },
    loading: false,
    error: "",
    fetchUserDetail: async () => {
        set({ loading: true });
        const data = await getProfileService.getUserProfile() || "";
        if (data) {
            set((state) => {

                return {
                    userInstance: {
                        user: { ...data.userData },
                        proyects: [...data.projects],
                        redes: [...data.redes],
                        page: data.page,
                    },
                    loading: false,
                    error: ""
                };
            });
        } else {
            set({ loading: false, error: "Error en la obtencion del usuairo" });
        }
    },
    reset: () => {
        set((state) => {
            return {
                userInstance: {
                    user: {},
                    proyects: [],
                    likedProyects: [],
                    redes: [],
                    page: 0
                },
                loading: false,
                error: "",
            }
        })
    }
}));

export default userProfileStore;