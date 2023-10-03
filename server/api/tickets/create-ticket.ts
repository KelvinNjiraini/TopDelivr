import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/server/db/client";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { hours, affiliateId, subUserId } = body;

    try {
        const tickets = await prisma.ticket.create({
            data: {
                hours,
                affiliateId,
                status: "pending",
                subUserId,
            },
        });
        return { message: "Success", data: tickets };
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
    }
});
