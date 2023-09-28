<template>
    <div v-loading="isLoading" class="flex flex-col min-h-full">
        <!-- Details section -->
        <div class="flex flex-col">
            <h2 class="text-xl text-slate-900 font-semibold">
                Chimoney account details
            </h2>
            <div class="flex items-center space-x-3 mt-3">
                <label class="text-base text-slate-900 font-semibold"
                    >Email:
                </label>
                <input
                    :value="subAccount?.email"
                    disabled
                    class="px-4 py-2 italic"
                />
            </div>
            <div class="flex items-center space-x-3 mt-3">
                <label class="text-base text-slate-900 font-semibold"
                    >Name:
                </label>
                <input
                    :value="subAccount?.name"
                    disabled
                    class="px-4 py-2 italic"
                />
            </div>
        </div>
        <!-- Accounts section -->
        <div class="flex flex-col mt-10">
            <h2 class="text-xl text-slate-900 font-semibold">
                Chimoney Wallets
            </h2>
            <div class="grid lg:grid-cols-3 gap-4">
                <div
                    v-for="wallet in subAccount?.wallets"
                    :key="wallet.id"
                    class="p-8 shadow-lg rounded-md"
                >
                    <h4 class="text-lg font-semibold text-slate-900">
                        {{
                            wallet.type === "momo"
                                ? "Mobile Money"
                                : wallet.type === "airtime"
                                ? "Airtime"
                                : "Chimoney"
                        }}
                    </h4>
                    <div class="flex items-center space-x-3 mt-3">
                        <label class="text-base text-slate-900 font-semibold"
                            >Balance:
                        </label>
                        <input
                            :value="wallet.balance"
                            disabled
                            class="px-4 py-2 italic"
                        />
                    </div>
                    <div class="flex items-center space-x-3 mt-3">
                        <label class="text-base text-slate-900 font-semibold"
                            >No. of transactions:
                        </label>
                        <input
                            :value="wallet.transactions.length - 1"
                            disabled
                            class="px-4 py-2 italic"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGetSubAccountDetails } from "~/composables/getSubAccountDetails";
import { SubAccountDetailsResponse } from "~/types/SubAccountDetailsResponse";

const isLoading = ref(false);
const subAccount = ref<SubAccountDetailsResponse | null>(null);

const user = useSupabaseUser();

async function fetchAffiliate() {
    if (user.value) {
        isLoading.value = true;
        try {
            const { data, error } = await useFetch(
                `/api/affiliates/${user.value.id}`,
                {
                    method: "get",
                }
            );
            if (error.value) {
                throw error.value;
            }
            return data.value;
        } catch (error: any) {
            throw error;
        }
    }
}

async function fetchSubUserAccount() {
    isLoading.value = true;
    try {
        const user = await fetchAffiliate();
        console.log(user);
        if (user && user.data?.subUserId) {
            const subUserDetails = await useGetSubAccountDetails(
                user.data.subUserId
            );
            console.log(subUserDetails);
            subAccount.value = subUserDetails.data;
        }
    } catch (error) {
        throw error;
    } finally {
        isLoading.value = false;
    }
}

definePageMeta({
    layout: "affiliate",
    middleware: "auth",
});

onMounted(async () => {
    await fetchSubUserAccount();
});
</script>

<style lang="scss" scoped>
/*  */
</style>
