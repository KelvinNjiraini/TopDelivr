import { TicketToPay } from "~/types/TicketsToPay";

export const useUpdateTickets = async function (payload: TicketToPay[]) {
    const { data, error } = await useFetch("/api/tickets/update-tickets", {
        method: "post",
        body: {
            ticketsArr: payload,
        },
    });

    if (error.value) {
        throw createError({
            ...error.value,
            message: "Something went wrong when updating the tickets",
        });
    }

    return data.value;
};
