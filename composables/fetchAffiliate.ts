export const useFetchAffiliate = async function (userId: string) {
    try {
        const { data, error } = await useFetch(`/api/affiliates/${userId}`, {
            method: "get",
        });
        if (error.value) {
            throw error.value;
        }
        return data.value;
    } catch (error: any) {
        throw error;
    }
};
