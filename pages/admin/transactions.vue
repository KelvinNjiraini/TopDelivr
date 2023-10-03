<template>
    <div>All transaction history</div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

watchEffect(async () => {
    if (!user.value) {
        return await navigateTo("/login", {
            replace: true,
        });
    }
});

definePageMeta({
    layout: "admin",
    middleware: "auth",
});
</script>

<style scoped>
/*  */
</style>
