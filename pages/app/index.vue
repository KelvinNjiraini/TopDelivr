<template>
    <div
        class="flex items-center justify-center min-h-vh"
        v-loading.fullscreen.lock="isLoading"
    >
        <div class="">
            <div class="flex justify-between w-full mb-5">
                <div class="flex flex-col">
                    <h2 class="text-2xl mb-3">All Tickets</h2>
                    <span class="text-base text-slate-500"
                        >Receive <strong>5 chimoney</strong> for each hour of
                        work</span
                    >
                </div>

                <div>
                    <button
                        class="outline-none bg-purple-800 text-white hover:bg-purple-500 px-5 py-2 rounded-lg"
                        @click="dialogVisible = true"
                    >
                        + Add ticket
                    </button>
                </div>
            </div>
            <client-only>
                <el-dialog
                    v-model="dialogVisible"
                    title="Add number of hours worked"
                    width="30%"
                >
                    <div class="mb-2">
                        <label for="hours" class="block text-black"
                            >Hours</label
                        >
                        <input
                            type="number"
                            min="1"
                            id="hours"
                            class="w-full border border-black"
                            v-model="hours"
                        />
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
                                :loading="isCreateTicketLoading"
                                @click="handleCreateTicket"
                            >
                                Confirm
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </client-only>

            <el-table :data="tableData" style="width: 100%" border>
                <!-- <el-table-column type="selection" width="55" /> -->
                <el-table-column prop="id" label="Ticket Id" width="350" />
                <el-table-column
                    prop="hours"
                    label="Hours worked"
                    width="200"
                    style="text-align: center; padding-left: 0.5rem"
                />
                <el-table-column
                    prop="status"
                    label="Ticket status"
                    width="200"
                    style="text-align: center"
                >
                    <template #default="scope">
                        <el-tag
                            :type="
                                scope.row.status === 'paid'
                                    ? 'success'
                                    : 'warning'
                            "
                        >
                            {{ scope.row.status }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseModal from "~/components/modal.vue";
import { ref, onMounted } from "vue";
import {
    ElTable,
    ElButton,
    ElNotification,
    ElMessageBox,
    ElTag,
} from "element-plus";
import { Product, Ticket } from "@prisma/client";
import { useFetchAllTickets } from "~/composables/fetchAllTickets";
import { useUserStore } from "~/stores/userStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const sbUser = useSupabaseUser();
const { getUserId, subUserId, userData } = storeToRefs(userStore);
const isLoading = ref(false);
const isCreateTicketLoading = ref(false);
const tableData = ref<Ticket[]>([]);
const dialogVisible = ref(false);
const hours = ref(1);
// const selectedRows = ref<Ticket[]>([]);

await initializeData();

async function initializeData() {
    isLoading.value = true;
    const data = await useFetchAllTickets();

    if (data) {
        const mytickets = data.data.filter(
            (ticket) => ticket.affiliateId === getUserId.value
        );
        tableData.value = mytickets;
    }
    isLoading.value = false;
}

async function handleCreateTicket() {
    isCreateTicketLoading.value = true;

    try {
        const { data, error } = await useFetch(`/api/tickets/create-ticket`, {
            method: "post",
            body: {
                hours: hours.value,
                affiliateId: getUserId.value,
                subUserId: subUserId.value,
            },
        });
        if (error.value) {
            throw error.value;
        }
        await initializeData();
        return data.value;
    } catch (err: any) {
        errorNotification("Error in creating ticket");
    } finally {
        isCreateTicketLoading.value = false;
        dialogVisible.value = false;
    }
}

// function handleSelectionChange(val: Ticket[]) {
//     selectedRows.value = val;
//     console.log(val);
// }

// async function createBookings() {
//     if (selectedRows.value.length === 0) return;
//     isLoading.value = true;
//     try {
//         const bookings = await useCreateBookings(selectedRows.value);
//         console.log(bookings);
//     } catch (error: any) {
//         errorNotification(error.message || "Something went wrong");
//     }
//     isLoading.value = false;
// }
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

definePageMeta({
    layout: "affiliate",
    middleware: "auth",
});

useHead({
    title: "Affiliate | Home",
});

onMounted(async () => {
    await initializeData();
});
</script>

<style scoped>
:deep(.el-table__row) {
    @apply text-center mb-3 border;
}
</style>
