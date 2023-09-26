export interface SubAccount {
    name: string;
    email: string;
}

export interface RegisterReturnType {
    status: string;
    data: {
        id: string;
        parent: string;
        uid: string;
        approved: boolean;
        createdDate: string;
        phoneNumber: string;
        name: string;
        verified: boolean;
        email: string;
        subAccount: boolean;
    };
}
