<template>
    <div
        class="flex justify-center items-center min-h-screen bg-[url('/layered-peaks-haikei.svg')] bg-no-repeat bg-cover bg-bottom"
    >
        <div class="flex flex-col items-start space-y-6">
            <h1 class="text-5xl font-bold mb-5 text-white">TopDelivr</h1>
            <h3 class="text-xl text-white">
                Delivr work and get paid per hour!
            </h3>
            <div class="flex justify-between items-center">
                <div class="group">
                    <nuxt-link
                        to="/login"
                        class="outline-none cursor-pointer text-lg group-hover:text-purple-700 transition-all duration-300"
                        type="button"
                    >
                        Log into your account
                    </nuxt-link>
                    <div
                        class="bg-black mt-1 h-[1px] scale-x-0 group-hover:scale-x-100 origin-left group-hover:bg-purple-700 transition-all duration-300"
                    ></div>
                </div>
                <div class="group ml-4">
                    <nuxt-link
                        to="/register"
                        class="outline-none cursor-pointer text-lg group-hover:text-purple-700 transition-all duration-300"
                        type="button"
                    >
                        No account? Register with us
                    </nuxt-link>
                    <div
                        class="bg-black mt-1 h-[1px] scale-x-0 group-hover:scale-x-100 origin-left group-hover:bg-purple-700 transition-all duration-300"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { query } = useRoute();
const user = useSupabaseUser();

watchEffect(async () => {
    if (user.value && user.value.user_metadata.role === "affiliate") {
        if (query && query.redirectTo) {
            return await navigateTo(query.redirectTo as string, {
                replace: true,
            });
        }
        return await navigateTo("/app");
    } else if (user.value && user.value.user_metadata.role === "admin") {
        if (query && query.redirectTo) {
            return await navigateTo(query.redirectTo as string, {
                replace: true,
            });
        }
        return await navigateTo("/admin");
    }
});
</script>
<style scoped></style>
