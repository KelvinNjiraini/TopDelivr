import { chimoney_api_url } from "@/utils/constants";

export const useMobileMoneyCode = async () => {
    const { data, error } = await useFetch(
        `${chimoney_api_url}/info/mobile-money-codes`,
        {
            "API-KEY": process.env.CHIMONEY_API_KEY,
            "Content-Type": "application/json",
        } as {}
    );
    if (error.value) {
        throw createError({
            ...error.value,
            statusMessage: `Error getting data`,
        });
    }

    return data.value;
};
