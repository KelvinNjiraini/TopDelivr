import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    // sign up and register code
    const body = await readBody(event);
    const { name, email, id } = body;
    try {
        const newUser = await prisma.affiliate.create({
            data: {
                id,
                name,
                email,
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
        }
    }
});
