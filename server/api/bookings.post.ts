import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/server/db/client";
// import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { affiliateObj } = body;
    try {
        const bookings = await prisma.productBooking.createMany({
            data: affiliateObj,
        });
        return { message: "Success", data: bookings };
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                throw createError({
                    ...e,

                    // message: "Could not create new Product bookings",
                });
            }
            if (e.code === "P2003") {
                throw createError({
                    ...e,
                    message: "Foreign key constraint failed",
                });
            }
        }
    } finally {
        await prisma.$disconnect();
    }
});
