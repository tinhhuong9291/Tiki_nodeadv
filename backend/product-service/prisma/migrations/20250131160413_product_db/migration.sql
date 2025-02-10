-- CreateTable
CREATE TABLE "Food" (
    "food_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT,
    "is_available" BOOLEAN DEFAULT true,
    "store_id" INTEGER,
    "promotion_id" INTEGER,
    "tags" TEXT,
    "stock_quantity" INTEGER DEFAULT 0,
    "is_removed" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("food_id")
);

-- CreateTable
CREATE TABLE "FoodImage" (
    "image_id" SERIAL NOT NULL,
    "food_id" INTEGER,
    "image_url" TEXT NOT NULL,
    "is_primary" BOOLEAN DEFAULT false,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodImage_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "FoodOption" (
    "option_id" SERIAL NOT NULL,
    "food_id" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "price" DECIMAL(10,2),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodOption_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "FoodOptionChoice" (
    "choice_id" SERIAL NOT NULL,
    "option_id" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodOptionChoice_pkey" PRIMARY KEY ("choice_id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "promotion_id" SERIAL NOT NULL,
    "description" VARCHAR(255),
    "discount" INTEGER NOT NULL,
    "start_at" TIMESTAMP(6),
    "end_at" TIMESTAMP(6),
    "is_removed" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("promotion_id")
);

-- CreateTable
CREATE TABLE "Store" (
    "store_id" SERIAL NOT NULL,
    "store_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "images" TEXT,
    "phone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(255),
    "website" VARCHAR(255),
    "opening_hours" VARCHAR(50),
    "closing_hours" VARCHAR(50),
    "rating" DECIMAL(3,2),
    "is_removed" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_email_key" ON "Store"("email");

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FoodImage" ADD CONSTRAINT "FoodImage_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("food_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FoodOption" ADD CONSTRAINT "FoodOption_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("food_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FoodOptionChoice" ADD CONSTRAINT "FoodOptionChoice_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "FoodOption"("option_id") ON DELETE CASCADE ON UPDATE NO ACTION;
