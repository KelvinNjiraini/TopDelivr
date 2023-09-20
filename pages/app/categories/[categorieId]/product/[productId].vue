<template>
    <div>product: {{ productId }}</div>
</template>

<script setup>
const { productId } = useRoute().params;
</script>
