import { chimoney_api_url } from "~/utils/constants";
import { SubAccountDetailsResponse } from "~/types/SubAccountDetailsResponse";
const config = useRuntimeConfig();

export const useGetSubAccountDetails = async function (subUserId: string) {
    try {
        const res: {
            data: SubAccountDetailsResponse;
            status: string;
        } = await $fetch(`${chimoney_api_url}sub-account/get?id=${subUserId}`, {
            method: "get",
            headers: {
                "X-API-KEY": config.public.CHIMONEY_API_KEY as string,
                // "Content-Type": "application/json",
            },
        });

        return res;
    } catch (err: any) {
        throw err;
    }
};
