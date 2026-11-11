ALTER TABLE "Reservation"
ADD COLUMN "referenceCode" TEXT,
ADD COLUMN "lookupCodeHash" TEXT NOT NULL DEFAULT '';

UPDATE "Reservation"
SET "referenceCode" = 'RES-' || "id";

ALTER TABLE "Reservation"
ALTER COLUMN "referenceCode" SET NOT NULL;

CREATE UNIQUE INDEX "Reservation_referenceCode_key" ON "Reservation"("referenceCode");