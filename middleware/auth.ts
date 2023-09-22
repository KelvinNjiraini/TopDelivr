const route = useRoute();

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();

    // if (user.value && to.path.indexOf('admin') > 0) {

    //     return
    // }

    // if(route.fullPath.includes('admin'))

    return navigateTo(`/login?redirectTo=${to.path}`);
});
