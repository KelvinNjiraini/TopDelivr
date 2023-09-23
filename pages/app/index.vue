<template v-loading="isLoading">
    <div class="flex items-center justify-center min-h-vh">
        <div class="">
            <div class="flex justify-between w-full mb-5">
                <h2 class="text-2xl">All Products</h2>

                <button
                    class="outline-none bg-purple-800 text-white hover:bg-purple-500 px-5 py-2 rounded-lg"
                    @click="createBookings"
                >
                    Book items to sell
                </button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                stripe
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column prop="title" label="Title" width="450" />
                <el-table-column prop="category" label="Category" width="200" />
                <el-table-column prop="price" label="Price" />
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElTable, ElButton, ElNotification } from "element-plus";
import { Product } from "@prisma/client";
import { useFetchProducts } from "~/composables/fetchProducts";
import { useCreateBookings } from "~/composables/createBookings";

const isLoading = ref(false);
const tableData = ref<Product[]>([]);
const selectedRows = ref<Product[]>([]);
await initializeData();

async function initializeData() {
    isLoading.value = true;
    const data = await useFetchProducts();
    if (data && data.data) {
        tableData.value = data.data;
    }
    isLoading.value = false;
}

function handleSelectionChange(val: Product[]) {
    selectedRows.value = val;
    console.log(val);
}

async function createBookings() {
    if (selectedRows.value.length === 0) return;
    isLoading.value = true;
    try {
        const bookings = await useCreateBookings(selectedRows.value);
        console.log(bookings);
    } catch (error: any) {
        errorNotification(error.message || "Something went wrong");
    }
    isLoading.value = false;
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
