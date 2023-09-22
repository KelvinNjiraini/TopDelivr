<template>
    <div>Page: foo</div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useMobileMoneyCode } from "@/composables/mobile-money-code";

const getCodes = await useMobileMoneyCode();

onMounted(() => {
    console.log(getCodes);
});
</script>
<style scoped></style>
