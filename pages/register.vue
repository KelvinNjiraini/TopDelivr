<template>
    <div
        class="flex justify-center items-center min-h-screen"
        v-loading="isLoading"
    >
        <!-- start of card -->
        <div
            class="shadow-xl bg-slate-200 rounded-lg p-8 flex flex-col space-x-5"
        >
            <!-- Login/Register -->
            <h2 class="text-2xl text-slate-800">
                Create an account with us today!
            </h2>
            <!-- Actual form -->
            <el-form
                ref="ruleFormRef"
                @submit.prevent="onSubmit(ruleFormRef)"
                label-position="top"
                label-width="100px"
                :rules="rules"
                :model="initialState"
            >
                <div class="flex flex-col text-slate-600 mt-4">
                    <el-form-item label="Name" prop="name">
                        <el-input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            v-model="initialState.name"
                            size="large"
                        />
                    </el-form-item>
                    <el-form-item label="Email address" prop="email">
                        <!-- <label for="email" class="text-base">Email</label> -->
                        <el-input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email address"
                            v-model="initialState.email"
                            size="large"
                        />
                    </el-form-item>

                    <el-form-item label="Phone Number" prop="phone_number">
                        <!-- <label for="password" class="text-base">Password</label> -->
                        <el-input
                            type="tel"
                            name="phone_number"
                            id="phone_number"
                            placeholder="Enter your phone number"
                            v-model="initialState.phone_number"
                            size="large"
                        />
                    </el-form-item>

                    <el-form-item label="Password" prop="password">
                        <!-- <label for="password" class="text-base">Password</label> -->
                        <el-input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            v-model="initialState.password"
                            size="large"
                        />
                    </el-form-item>

                    <!-- form actions -->
                    <div>
                        <button
                            class="outline-none bg-purple-800 text-white hover:bg-purple-500 px-5 py-2 rounded-lg"
                            type="submit"
                        >
                            Register
                        </button>
                        <nuxt-link
                            to="/login"
                            class="outline-none underline hover:text-purple-500 ml-3 cursor-pointer"
                            type="button"
                        >
                            or Login instead
                        </nuxt-link>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect, onMounted } from "vue";
import { FormRules, FormInstance, ElNotification } from "element-plus";
import { RegisterRule } from "@/types/FormRules";
import { useUserStore } from "@/stores/userStore";
import { rules } from "~/utils/constants";
import { useAffiliateRegister } from "~/composables/affiliateRegister";
import { useRegisterToChimoney } from "~/composables/registerToChimoney";

const config = useRuntimeConfig();

const userStore = useUserStore();
const { query } = useRoute();
const user = useSupabaseUser();

const client = useSupabaseClient();

const initialState = reactive<RegisterRule>({
    email: "",
    password: "",
    name: "",
    phone_number: "",
    role: "affiliate",
});
const isLoading = ref(false);
const err = ref<string | null>(null);

const ruleFormRef = ref<FormInstance>();

function errorNotification(message: string | null) {
    ElNotification({
        title: "Error",
        message: message || "Something went wrong",
        type: "error",
    });
}

async function onSubmit(formEl: FormInstance | undefined) {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            // signin function
            signup();
        } else {
            console.log("error submit!", valid, fields);
        }
    });
}
const signup = async () => {
    err.value = null;

    isLoading.value = true;
    try {
        const chimoney_data = {
            name: initialState.name,
            email: initialState.email,
        };
        const subAccount = await useRegisterToChimoney(chimoney_data);
        // console.log("SubAccount", subAccount);
        const { user } = await sbRegister();
        // register to chimoney

        const data = await useAffiliateRegister(
            {
                id: user?.id,
                name: initialState.name,
                role: initialState.role,
                subUserId: subAccount.data.id,
            },
            initialState
        );
        if (data && data.value) {
            const finalObj = {
                id: data.value.data.id,
                name: data.value.data.name,
                role: initialState.role,
                phone: initialState.phone_number,
                email: initialState.email,
                // subUserId: subAccount.data.id,
            };
            userStore.setUserData(finalObj);
            userStore.setSubUserId(subAccount.data.id);
            console.log(data);
        }
    } catch (err: any) {
        errorNotification(err.message || "Something went wrong");
        console.log(err);
    } finally {
        isLoading.value = false;
    }
};

async function sbRegister() {
    const { data: authResponse, error } = await client.auth.signUp({
        email: initialState.email,
        password: initialState.password,

        options: {
            data: {
                name: initialState.name,
                role: initialState.role,
                phone: initialState.phone_number,
            },
        },
    });
    if (error) {
        console.log("Supabase auth", authResponse);
        throw error;
    }
    // if (authResponse && authResponse.user) {
    //     const userData = {
    //         id: authResponse.user.id,
    //         name: initialState.name,
    //         role: authResponse.user.user_metadata.role,
    //         phone: initialState.phone_number,
    //     };

    //     return userData;
    // }
    return authResponse;
}

watchEffect(async () => {
    if (user.value && user.value.user_metadata.role === "affiliate") {
        if (query && query.redirectTo) {
            return await navigateTo(query.redirectTo as string, {
                replace: true,
            });
        }
        return await navigateTo("/app");
    }
});
</script>
