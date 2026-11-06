-- CreateTable
CREATE TABLE "TirePressure" (
    "id" TEXT NOT NULL,
    "modelName" TEXT,
    "yearFrom" INTEGER,
    "yearTo" INTEGER,
    "tireSize" TEXT NOT NULL,
    "frontPsi" INTEGER NOT NULL,
    "rearPsi" INTEGER NOT NULL,
    "frontPsiLoad" INTEGER,
    "rearPsiLoad" INTEGER,
    "sparePsi" INTEGER,
    "notes" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TirePressure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TirePressure_modelName_idx" ON "TirePressure"("modelName");
