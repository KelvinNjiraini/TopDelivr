import { defineStore } from "pinia";
import { InitialState } from "~/types/InitialState";

const placeholderState: InitialState = {
    id: "",
    phone: "",
    role: "affiliate",
    email: "",
    name: "",
};

export const useUserStore = defineStore("user", () => {
    // state

    const userData = ref<InitialState>(placeholderState);
    const subUserId = ref<string | null>(null);
    // getters

    const getUserId = computed<string>(() => {
        return userData.value.id;
    });

    // actions
    function logout(): void {
        userData.value = placeholderState;
        subUserId.value = null;
    }
    function setUserData(payload: InitialState) {
        userData.value = payload;
    }
    function setSubUserId(payload: string | null) {
        subUserId.value = payload;
    }

    return {
        userData,
        subUserId,
        getUserId,
        logout,
        setSubUserId,
        setUserData,
    };
});
