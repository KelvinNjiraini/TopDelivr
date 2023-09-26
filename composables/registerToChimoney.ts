import { SubAccount, RegisterReturnType } from "~/types/SubAccount";
import { chimoney_api_url } from "~/utils/constants";
const config = useRuntimeConfig();

export const useRegisterToChimoney = async function (userData: SubAccount) {
    try {
        const res = await $fetch(`${chimoney_api_url}sub-account/create`, {
            method: "POST",
            headers: {
                "X-API-KEY": config.public.CHIMONEY_API_KEY as string,
                // "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
            }),
        });
        return res as RegisterReturnType;
    } catch (err) {
        throw err;
    }
};
