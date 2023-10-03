/*
  Warnings:

  - Added the required column `subUserId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_affiliateId_fkey";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "subUserId" TEXT NOT NULL,
ALTER COLUMN "affiliateId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
