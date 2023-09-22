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
import { ref, reactive } from "vue";
import { FormRules, FormInstance, ElNotification } from "element-plus";
import { RegisterRule } from "@/types/FormRules";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const { query } = useRoute();

const client = useSupabaseClient();
const user = useSupabaseUser();

const initialState = reactive<RegisterRule>({
    email: "",
    password: "",
    name: "",
});
const isLoading = ref(false);
const err = ref<string | null>(null);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RegisterRule>>({
    name: [
        {
            required: true,
            message: "First name field is required",
            trigger: "change",
        },
    ],
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
        const { data: authResponse, error } = await client.auth.signUp({
            email: initialState.email,
            password: initialState.password,
            options: {
                data: {
                    name: initialState.name,
                    role: "admin",
                },
            },
        });
        if (error) {
            console.log("Supabase auth", authResponse);
            throw error;
        }
        userStore.setUserData(data);
    } catch (err: any) {
        errorNotification(err.message || "Something went wrong");
    } finally {
        isLoading.value = false;
    }
};
</script>
