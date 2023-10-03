import { Product } from "@prisma/client";
import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/userStore";

// const user = useSupabaseUser();
export const useCreateBookings = async (products: Product[]) => {
    const userStore = useUserStore();
    const { getUserId } = storeToRefs(userStore);
    if (getUserId.value === "") {
        throw createError({
            statusCode: 401,
            message: "Please login to access this service.",
        });
    }
    const affiliateId = getUserId.value;
    const productsToBook = products.map((el) => {
        return { productId: el.id, affiliateId: affiliateId };
    });

    const { data, error } = await useFetch("/api/bookings", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: {
            affiliateObj: productsToBook,
        },
    });
    if (error.value) {
        throw createError({
            ...error.value,
            message: "Something went wrong",
        });
    }
    return { message: "Success", data: data.value };
};
