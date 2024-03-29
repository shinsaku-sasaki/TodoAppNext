-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(20) NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
