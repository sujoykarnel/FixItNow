-- AlterTable
ALTER TABLE "technician_profiles" ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "experience" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "availableStart" DROP NOT NULL,
ALTER COLUMN "availableEnd" DROP NOT NULL;
