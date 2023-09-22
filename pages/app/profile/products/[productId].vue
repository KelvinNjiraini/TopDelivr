<template>
    <div>This is the current product {{ productId }}</div>
</template>

<script setup lang="ts">
import { useRoute } from "nuxt/app";

const { productId } = useRoute().params;
</script>

<style lang="scss" scoped>
/*  */
</style>
