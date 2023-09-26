const { PrismaClient } = require("@prisma/client");

const store_data = require("./../utils/store_data.ts");
const prisma = new PrismaClient();

async function seed() {
    await prisma.affiliate.update({
        where: {
            id: "8551f4bd-0c9f-4d4e-80f0-3669720b20d3",
        },
        data: {
            products: [
                {
                    id: "1e6b613f-8c7d-4d13-b623-ced433c1689b",
                    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    category: "men's clothing",
                    price: 109.95,
                    description:
                        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                },
                {
                    id: "05b1b311-1c5e-404f-83ef-56e4649c8b90",
                    title: "Mens Casual Premium Slim Fit T-Shirts ",
                    category: "men's clothing",
                    price: 22.3,
                    description:
                        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                },
            ],
        },
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
