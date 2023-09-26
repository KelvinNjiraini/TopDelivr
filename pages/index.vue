<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="flex flex-col space-y-6">
            <h1 class="text-3xl font-bold mb-5 text-green-500">TopDelivr</h1>
            <h3 class="text-xl">Delivr work and get paid per hour!</h3>
            <div class="flex justify-between items-center">
                <nuxt-link
                    to="/login"
                    class="outline-none underline hover:text-purple-500 ml-3 cursor-pointer"
                    type="button"
                >
                    Log into your account
                </nuxt-link>
                <nuxt-link
                    to="/register"
                    class="outline-none underline hover:text-purple-500 ml-3 cursor-pointer"
                    type="button"
                >
                    No account? Register with us
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
const { query } = useRoute();
const user = useSupabaseUser();

onMounted(() => {});

watchEffect(async () => {
    if (user.value && user.value.user_metadata.role === "affiliate") {
        if (query && query.redirectTo) {
            return await navigateTo(query.redirectTo as string, {
                replace: true,
            });
        }
        return await navigateTo("/app");
    }
});
</script>
<style scoped></style>
