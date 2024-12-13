-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verifiedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "account_verifications" (
    "uid" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "account_verifications_pkey" PRIMARY KEY ("uid","userUid")
);

-- AddForeignKey
ALTER TABLE "account_verifications" ADD CONSTRAINT "account_verifications_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
