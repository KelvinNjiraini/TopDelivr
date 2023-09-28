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
                    + Add ticket
                </button>
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
                                @click="handleCreateTicket"
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

const userStore = useUserStore();
const { getUserId, subUserId, userData } = storeToRefs(userStore);
const isLoading = ref(false);
const tableData = ref<Ticket[]>([]);
const dialogVisible = ref(false);
const hours = ref(1);
// const selectedRows = ref<Ticket[]>([]);

async function initializeData() {
    isLoading.value = true;
    const data = await useFetchAllTickets();
    if (data) {
        tableData.value = data.data;
    }
    // console.log(data);
    isLoading.value = false;
}

function handleCreateTicket() {
    isLoading.value = true;

    try {
        const { data, error } = useFetch(`/api/tickets/create-ticket`, {
            method: "post",
            body: {
                hours: hours.value,
            },
        });
        if (error.value) {
            throw error.value;
        }

        return data.value;
    } catch (err: any) {
        console.log(err);
        errorNotification(err.message || "Error in creating ticket");
    } finally {
        isLoading.value = false;
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

function trialOne() {
    const userStore = useUserStore();
    console.log("Trial one", userStore.userData.id);
}
function trialTwo() {
    const userStore = useUserStore();
    console.log("Trial two", userStore.getUserId);
}

function errorNotification(message: string | null) {
    ElNotification({
        title: "Error",
        message: message || "Something went wrong",
        type: "error",
    });
}

onMounted(async () => {
    await initializeData();
});

definePageMeta({
    layout: "affiliate",
    middleware: "auth",
});
</script>

<style scoped>
.table-padding {
    padding: 1rem 0;
}
</style>
