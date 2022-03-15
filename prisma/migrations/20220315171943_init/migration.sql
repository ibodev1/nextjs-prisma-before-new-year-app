-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "note" TEXT,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);
