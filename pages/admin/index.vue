<template>
    <div
        class="flex items-center justify-center min-h-vh"
        v-loading="isLoading"
    >
        <div class="">
            <div class="flex justify-between w-full mb-5">
                <h2 class="text-2xl">All Products</h2>

                <button
                    class="outline-none bg-purple-800 text-white hover:bg-purple-500 px-5 py-2 rounded-lg"
                    @click="dialogVisible = true"
                >
                    Make collective payment
                </button>
            </div>
            <client-only>
                <el-dialog
                    v-model="dialogVisible"
                    title="Make collective payment in chimoney"
                    width="30%"
                >
                    <div class="mb-2">
                        <span
                            ><strong>Confirmation! </strong> Make payment for
                            all pending tickets</span
                        >
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button
                                @click="dialogVisible = false"
                                class="hover:bg-purple-500 px-5 py-2 rounded-lg ml-3"
                                >Cancel</el-button
                            >
                            <el-button
                                class="bg-green-700 text-white hover:bg-green-500 px-5 py-2 rounded-lg ml-3"
                                type="primary"
                                :isLoading="isPendingTicketLoading"
                                @click="handlePendingTickets"
                            >
                                Confirm
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </client-only>

            <el-table :data="tableData" style="width: 100%" stripe>
                <!-- <el-table-column type="selection" width="55" /> -->
                <el-table-column prop="id" label="Ticket Id" width="300" />
                <el-table-column
                    prop="hours"
                    label="Hours worked"
                    width="300"
                />
                <el-table-column
                    prop="status"
                    label="Ticket status"
                    width="300"
                />
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElTable, ElButton, ElNotification, ElMessageBox } from "element-plus";
import { Product, Ticket } from "@prisma/client";
import { useFetchAllTickets } from "~/composables/fetchAllTickets";
import { useUserStore } from "~/stores/userStore";
import { storeToRefs } from "pinia";
import { useChimoneyPayout } from "~/composables/chimoneyPayout";
import { useUpdateTickets } from "~/composables/updateTickets";

const userStore = useUserStore();
const { subUserId } = storeToRefs(userStore);
const sbUser = useSupabaseUser();
const isLoading = ref(false);
const isPendingTicketLoading = ref(false);
const tableData = ref<Ticket[]>([]);
const dialogVisible = ref(false);
const hours = ref(1);
const chiRate = 10; //amount payable in chimoney
// const selectedRows = ref<Ticket[]>([]);
await initializeData();

async function initializeData() {
    isLoading.value = true;
    const data = await useFetchAllTickets();
    if (data) {
        tableData.value = data.data.filter(
            (ticket) => ticket.status === "pending"
        );
    }
    // console.log(data);
    isLoading.value = false;
}

async function handlePendingTickets() {
    isPendingTicketLoading.value = true;
    try {
        // 1) collect all pending tickets

        const data = await useFetchAllTickets();
        const pendingTickets = data?.data.filter(
            (ticket) => ticket.status === "pending"
        );
        // 2) get all the chimoney to pay per hour plus the subaccount ids
        const ticketsToPay = pendingTickets?.map((ticket) => {
            return {
                ...ticket,
                receiver: ticket.subUserId,
                valueInUSD: ticket.hours * chiRate,
            };
        });
        // 3) make collective payment with chimoney
        if (subUserId.value) {
            await useChimoneyPayout(subUserId?.value, ticketsToPay);
        }
        // 4) update all the tickets above as paid
        if (ticketsToPay) {
            const updatedTickets = await useUpdateTickets(ticketsToPay);
            console.log(updatedTickets);
        }
    } catch (e: any) {
        console.error(e);
        errorNotification(
            e.error || e.message || "Error completing the transaction"
        );
    } finally {
        isPendingTicketLoading.value = false;
    }
}

function errorNotification(message: string | null) {
    ElNotification({
        title: "Error",
        message: message || "Something went wrong",
        type: "error",
    });
}

watchEffect(async () => {
    if (!sbUser.value) {
        return await navigateTo("/login", {
            replace: true,
        });
    }
});

onMounted(async () => {
    await initializeData();
});

definePageMeta({
    layout: "admin",
    middleware: "auth",
});
</script>

<style lang="scss" scoped>
/*  */
</style>
