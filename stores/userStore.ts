import { defineStore } from "pinia";
// import { Roles } from "~/types/Roles";

interface InitialState {
    id: string;
    phone: string;
    role: string;
    name: string;
}

const initialState: InitialState = {
    id: "",
    phone: "",
    role: "affiliate",
    name: "Test user",
};

export const useUserStore = defineStore("user", {
    // state
    state: () => ({
        userData: initialState,
        subAccount: "",
    }),
    actions: {
        logout() {
            this.userData = initialState;
            this.subAccount = "";
        },
        setUserData(payload: InitialState) {
            this.userData = payload;
        },
        setSubAccount(payload: string) {
            this.subAccount = payload;
        },
    },
    persist: true,
});
