export const useFetchProducts = async () => {
    try {
        const { data, error } = await useFetch("/api/product", {
            method: "get",
        });
        if (error.value) {
            throw error.value;
        }
        return data.value;
    } catch (err: any) {
        throw createError({
            ...err.value,
            message: "Something went wrong in fetching products",
        });
    }
};
