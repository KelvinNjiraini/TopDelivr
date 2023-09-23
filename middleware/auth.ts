export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();

    if (user.value && to.path.indexOf("admin") > 0) {
        if (user.value.user_metadata.role === "admin") {
            return;
        }
        return navigateTo(`/login`);
    }

    if (user.value && to.path.indexOf("admin") === -1) {
        if (user.value.user_metadata.role === "affiliate") {
            return;
        }
        return navigateTo(`/login`);
    }

    // if(route.fullPath.includes('admin'))

    return navigateTo(`/login?redirectTo=${to.path}`);
});
