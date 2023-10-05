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
            CHIMONEY_API_KEY: process.env.CHIMONEY_API_KEY,
        },
    },
});
