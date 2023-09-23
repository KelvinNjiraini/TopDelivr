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
                Welcome back! Log into your account
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
                <div class="text-slate-600 mt-4">
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
                            Login
                        </button>
                        <nuxt-link
                            to="/register"
                            class="outline-none underline hover:text-purple-500 ml-3 cursor-pointer"
                            type="button"
                        >
                            or Register instead
                        </nuxt-link>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { FormRules, FormInstance, ElNotification } from "element-plus";
import { LoginRule } from "@/types/FormRules";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const { query } = useRoute();

const client = useSupabaseClient();
const user = useSupabaseUser();

const initialState = reactive<LoginRule>({
    email: "",
    password: "",
});
const isLoading = ref(false);
const err = ref<string | null>(null);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<LoginRule>>({
    email: [
        { required: true, message: "Email field is required", trigger: "blur" },
        {
            type: "email",
            message: "Email format is not correct",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "Password field is required",
            trigger: "change",
        },
        {
            min: 6,
            message: "Password length has to be more than 6 characters",
            trigger: "change",
        },
    ],
});

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
            login();
        } else {
            console.log("error submit!", valid, fields);
        }
    });
}

const login = async () => {
    isLoading.value = true;
    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: initialState.email,
            password: initialState.password,
        });

        console.log(data);
        if (error) {
            console.log(error);
            throw error;
        }
        const userData = {
            id: data.user.id,
            name: data.user.user_metadata.name,
            role: data.user.user_metadata.role,
            phone: data.user.user_metadata.phone,
        };

        userStore.setUserData(userData);
    } catch (error: any) {
        console.log(error);
        errorNotification(error.message);
    } finally {
        isLoading.value = false;
    }
};

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

// onMounted(() => {
//     console.log(user.value);
// });

// definePageMeta({
//     layout: 'plain',
// });
</script>
