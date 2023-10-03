import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/server/db/client";
import { TicketToPay } from "~/types/TicketsToPay";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { ticketsArr } = body;

    const finalTicketIds = ticketsArr.map((ticket: TicketToPay) => {
        return ticket.id;
    });

    try {
        const updatedTickets = await prisma.ticket.updateMany({
            where: {
                id: {
                    in: finalTicketIds,
                },
            },
            data: {
                status: "paid",
            },
        });
        return { message: "Success", data: updatedTickets };
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                throw createError({
                    ...e,

                    // message: "Could not create new Product bookings",
                });
            }
        }
        throw e;
    } finally {
        await prisma.$disconnect();
    }
});
