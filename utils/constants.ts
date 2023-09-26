import { FormRules } from "element-plus";
import { RegisterRule } from "~/types/FormRules";

export const chimoney_api_url = "https://api-v2-sandbox.chimoney.io/v0.2/";


export const rules = reactive<FormRules<RegisterRule>>({
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
    phone_number: [
        {
            required: true,
            message: "Phone number is required",
            trigger: "change",
        },
    ],
});
