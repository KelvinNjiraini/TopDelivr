import { defineStore } from "pinia";
import { InitialState } from "~/types/InitialState";

const placeholderState: InitialState = {
    id: "",
    phone: "",
    role: "affiliate",
    email: "",
    name: "",
};

interface FinalState {
    userData: InitialState;
    subUserId: string | null;
}

export const useUserStore = defineStore("user", {
    // state
    state: (): FinalState => ({
        userData: placeholderState,
        subUserId: null,
    }),
    actions: {
        logout() {
            this.userData = placeholderState;
            this.subUserId = null;
        },
        setUserData(payload: InitialState) {
            this.userData = payload;
        },
        setSubUserId(payload: string | null) {
            this.subUserId = payload;
        },
    },
    getters: {
        getUserId(): any {
            return this.userData.id;
        },
    },
    persist: true,
});
