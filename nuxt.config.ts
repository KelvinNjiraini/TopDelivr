// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        "@nuxtjs/tailwindcss",
        "nuxt-icon",
        "@nuxtjs/supabase",
        "@vueuse/nuxt",
        "@element-plus/nuxt",
    ],
    supabase: {
        redirect: false,
    },
    runtimeConfig: {
        public: {
            CHIMONEY_API_KEY:
                "fc0e983cb0bcd8ec336102f56146ba2586350d015aafaf2980e90b7bd5d92787",
        },
    },
});
