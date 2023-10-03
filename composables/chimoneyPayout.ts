import { SubAccount, RegisterReturnType } from "~/types/SubAccount";
import { chimoney_api_url } from "~/utils/constants";
const config = useRuntimeConfig();

type TicketsToPay = {
    receiver: any;
    valueInUSD: number;
    id: string;
    hours: number;
    affiliateId: string;
    status: string;
    subUserId: string;
};

export const useChimoneyPayout = async function (
    subAccountId: string,
    payload: any
) {
    const finalArr = payload.map((ticket: TicketsToPay) => {
        return { receiver: ticket.receiver, valueInUSD: ticket.valueInUSD };
    });
    try {
        const res = await $fetch(`${chimoney_api_url}payouts/wallet`, {
            method: "POST",
            headers: {
                "X-API-KEY": config.public.CHIMONEY_API_KEY as string,
                // "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subAccount: subAccountId,
                wallets: finalArr,
            }),
        });
        return res as any;
    } catch (e) {
        throw e;
    }
};
