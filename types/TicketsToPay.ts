export type TicketToPay = {
    receiver: string;
    valueInUSD: number;
    id: string;
    hours: number;
    subUserId: string;
    status: string;
    affiliateId: string | null;
};
