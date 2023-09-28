import { GenericResponse } from "~/types/GenericResponse";

export const useFetchAllTickets = async function () {
    try {
        const { data, error } = await useFetch("/api/tickets/all-tickets", {
            method: "get",
        });

        if (error.value) {
            throw error.value;
        }
        return data.value;
    } catch (err: any) {
        throw createError({
            ...err.value,
            message: "Something went wrong in fetching tickets",
        });
    }
};
