import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/server/db/client";
// import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { productsArr } = body;
    // const user = await serverSupabaseUser(event);

    // if (!user) {
    //     throw createError({ status: 401, message: "You are not logged in" });
    // }

    try {
        const bookings = await prisma.productBooking.createMany({
            data: [...productsArr],
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
    }
});
