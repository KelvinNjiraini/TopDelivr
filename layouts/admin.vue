<script lang="ts" setup></script>

<template>
    <div>
        <header class="shadow-sm bg-white">
            <nav class="container mx-auto p-4 flex justify-between">
                <NuxtLink to="/app" class="font-bold">TopDelivr</NuxtLink>
                <ul class="flex gap-4">
                    <li><NuxtLink to="/admin">Home</NuxtLink></li>
                    <li>
                        <NuxtLink to="/admin/admin-profile"
                            >My Payments</NuxtLink
                        >
                    </li>
                    <li>
                        <NuxtLink to="/admin/transactions"
                            >My Transactions</NuxtLink
                        >
                    </li>
                    <!-- <li>
                        <NuxtLink to="/app/profile/transactions" class="btn"
                            >My Transactions</NuxtLink
                        >
                    </li> -->
                    <!-- <li>
                        <NuxtLink to="/app/profile/products" class="btn"
                            >My Products</NuxtLink
                        >
                    </li> -->
                    <li>
                        <button
                            class="outline-none bg-red-600 text-white hover:bg-red-400 px-4 py-1 rounded-lg"
                            @click.prevent="logout"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
        <div class="container mx-auto p-4">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElNotification } from "element-plus";
import { useUserStore } from "~/stores/userstore";
import storeToRefs from "pinia";

const client = useSupabaseClient();
async function logout() {
    const { error } = await client.auth.signOut();
    if (error) {
        errorNotification(error.message || "Something went wrong");
        throw error;
    }
}

function errorNotification(message: string | null) {
    ElNotification({
        title: "Error",
        message: message || "Something went wrong",
        type: "error",
    });
}
</script>

<style scoped>
.router-link-exact-active {
    color: #12b488;
}
</style>
