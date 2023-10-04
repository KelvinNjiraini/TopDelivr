import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/client";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.affiliateId;
    try {
        const user = await prisma.affiliate.findFirstOrThrow({
            where: {
                id,
            },
        });

        return { message: "success", data: user };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === "P2002") {
                throw createError({
                    ...error,

                    message: "Could not fetch user",
                });
            }
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});
