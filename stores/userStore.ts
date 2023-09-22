import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    // state
    state: () => ({
        userData: {},
    }),
    actions: {
        logout() {
            this.userData = {};
        },
        setUserData(payload: object) {
            this.userData = payload;
        },
    },
    // persist: true,
});
