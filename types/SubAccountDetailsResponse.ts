export interface SubAccountDetailsResponse {
    approved: boolean;
    createdDate: string;
    email: string;
    id: string;
    name: string;
    parent: boolean;
    subAccount: boolean;
    uid: string;
    verified: boolean;
    wallets: Wallet[];
}

interface Wallet {
    balance: number;
    type: "momo" | "chi" | "airtime";
    id: string;
    owner: string;
    transactions: Transaction[];
}

interface Transaction {
    amount: number;
    balanceBefore: number;
    description: string;
    newNumber: number;
}
