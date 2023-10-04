import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/client";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { title, category, price, description } = body;

    try {
        const newProduct = await prisma.product.create({
            data: {
                title,
                category,
                price,
                description,
            },
        });
        return { status: "success", data: newProduct };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === "P2002") {
                throw createError({
                    ...error,

                    message: "Could not create new product",
                });
            }
        }
    } finally {
        await prisma.$disconnect();
    }
});
