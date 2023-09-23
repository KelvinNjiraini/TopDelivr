const { PrismaClient } = require("@prisma/client");

const store_data = require("./../utils/store_data.ts");
const prisma = new PrismaClient();

async function seed() {
    await prisma.productBooking.createMany({
        data: [
            {
                productId: "9f3fa580-95e7-4a1f-b44a-a6978ca953fc",
                affiliateId: "1c195b89-641f-4ec2-a5b7-4cbe71bba069",
            },
            {
                productId: "19ec143c-6411-49b6-a417-0f6582e6b92e",
                affiliateId: "1c195b89-641f-4ec2-a5b7-4cbe71bba069",
            },
        ],
    });
}

async function seedAction() {
    try {
        await seed();
        await prisma.$disconnect();
    } catch (e) {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
}
seedAction();
