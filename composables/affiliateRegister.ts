import { RegisterRule } from "@/types/FormRules";

export const useAffiliateRegister = async function (
    userData: any,
    initialState: RegisterRule
) {
    const { data, error } = useFetch("/api/auth/signup", {
        method: "POST",
        body: {
            id: userData.id,
            name: userData.name,
            email: initialState.email,
        },
    });

    if (error.value) {
        throw error.value;
    }

    return data;
};
