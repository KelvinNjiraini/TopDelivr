import { Product } from "@prisma/client";
import { useUserStore } from "~/stores/userStore";

// const user = useSupabaseUser();
export const useCreateBookings = async (products: Product[]) => {
    const userStore = useUserStore();
    if (userStore.userData.id === "") {
        throw createError({
            statusCode: 401,
            message: "Please login to access this service.",
        });
    }
    const affiliateId = userStore.userData.id;
    const productsToBook = products.map((el) => {
        return { productId: el.id, affiliateId: affiliateId };
    });

    const { data, error } = await useFetch("/api/bookings", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: {
            productsArr: productsToBook,
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
