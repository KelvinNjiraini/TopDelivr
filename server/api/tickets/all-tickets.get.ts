import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/client";

export default defineEventHandler(async (event) => {
    try {
        const tickets = await prisma.ticket.findMany();

        return { message: "success", data: tickets };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === "P2002") {
                throw createError({
                    ...error,

                    message: "Could not fetch tickets",
                });
            }
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});
