-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nick_key" ON "users"("nick");
