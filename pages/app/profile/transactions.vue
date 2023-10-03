<template>
    <div>All my transactions on profile side</div>
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
    layout: "affiliate",
    middleware: "auth",
});
</script>

<style lang="scss" scoped>
/*  */
</style>
