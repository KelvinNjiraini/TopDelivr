import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/client";
export default defineEventHandler(async (event) => {
    // sign up and register code
    const body = await readBody(event);
    const { name, email, id, subUserId } = body;
    try {
        const newUser = await prisma.affiliate.create({
            data: {
                id,
                name,
                email,
                subUserId,
            },
        });
        return { message: "success", data: newUser };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === "P2002") {
                throw createError({
                    ...error,
                    statusCode: 400,
                    statusMessage: "User already exists",
                });
            }
            throw createError({
                ...error,
            });
        }
    } finally {
        await prisma.$disconnect();
    }
});
