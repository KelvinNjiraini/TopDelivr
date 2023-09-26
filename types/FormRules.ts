export interface RegisterRule {
    name: string;
    phone_number: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginRule {
    email: string;
    password: string;
}
