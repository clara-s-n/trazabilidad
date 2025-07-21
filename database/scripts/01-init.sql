CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE "tag_status" AS ENUM (
  'active',
  'inactive',
  'retired'
);

CREATE TYPE "animal_status" AS ENUM (
  'alive',
  'deceased',
  'robbed',
  'lost'
);

CREATE TABLE IF NOT EXISTS "rols" (
  "id" UUID PRIMARY KEY,
  "name" VARCHAR UNIQUE NOT NULL,
  "description" VARCHAR
);

CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID PRIMARY KEY,
  "email" VARCHAR UNIQUE NOT NULL,
  "password_hash" VARCHAR NOT NULL,
  "rols_id" UUID NOT NULL,
  "created_at" TIMESTAMP DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS "lands" (
  "id" UUID PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "latitude" DECIMAL(9,6) NOT NULL,
  "longitude" DECIMAL(9,6) NOT NULL
);

CREATE TABLE IF NOT EXISTS "tags" (
  "id" UUID PRIMARY KEY,
  "status" tag_status NOT NULL,
  "country_code" VARCHAR(5) NOT NULL DEFAULT '00014',
  "country_iso" CHAR(3) NOT NULL DEFAULT '858',
  "ministry" VARCHAR(20) NOT NULL DEFAULT 'MGAP UY',
  "tag_number" VARCHAR(20) NOT NULL, -- compuesto por el numero único del animal y el número de trabajo del animal
  UNIQUE (country_code, tag_number)  -- evita duplicados en la misma emisión
);

CREATE TABLE IF NOT EXISTS "animals" (
  "id" UUID PRIMARY KEY,
  "breed" VARCHAR NOT NULL,
  "birth_date" DATE NOT NULL,
  "owner_id" UUID,
  "land_id" UUID NOT NULL,
  "created_at" TIMESTAMP DEFAULT (now()),
  "updated_at" TIMESTAMP DEFAULT (now()),
  "status" animal_status NOT NULL
);

CREATE TABLE IF NOT EXISTS "animal_tag" (
  "id" UUID PRIMARY KEY,
  "animal_id" UUID NOT NULL,
  "tag_id" UUID NOT NULL,
  "assignment_date" TIMESTAMP NOT NULL,
  "unassignment_date" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "transports" (
  "id" UUID PRIMARY KEY,
  "animal_id" UUID NOT NULL,
  "origin_land_id" UUID NOT NULL,
  "destiny_land_id" UUID NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "details" TEXT
);

CREATE TABLE IF NOT EXISTS "event_type" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR UNIQUE NOT NULL,
  "description" TEXT
);

CREATE TABLE IF NOT EXISTS "events" (
  "id" UUID PRIMARY KEY,
  "event_type" INT NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "comments" TEXT,
  "created_by" UUID
);

CREATE TABLE IF NOT EXISTS "animal_event" (
  "id" UUID PRIMARY KEY,
  "event_id" UUID NOT NULL,
  "animal_id" UUID NOT NULL
);

CREATE TABLE IF NOT EXISTS "weightings" (
  "id" UUID PRIMARY KEY,
  "event_id" UUID NOT NULL,
  "weight" NUMERIC(8,2) NOT NULL,
  "unit" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "sales" (
  "id" UUID PRIMARY KEY,
  "event_id" UUID NOT NULL,
  "buyer" TEXT NOT NULL,
  "price" NUMERIC(10,2),
  "currency" VARCHAR
);

CREATE TABLE IF NOT EXISTS "vaccinations" (
  "id" UUID PRIMARY KEY,
  "event_id" UUID NOT NULL,
  "vaccine" TEXT NOT NULL,
  "dosage" TEXT,
  "provider" TEXT
);

CREATE TABLE IF NOT EXISTS "animal_history" (
  "id" UUID PRIMARY KEY,
  "animal_id" UUID NOT NULL,
  "modified" VARCHAR NOT NULL, -- Campo moficado
  "old_value" TEXT,
  "new_value" TEXT,
  "modified_by" UUID,
  "modification_date" TIMESTAMP DEFAULT (now())
);

ALTER TABLE "users" ADD FOREIGN KEY ("rols_id") REFERENCES "rols" ("id");

ALTER TABLE "animals" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE SET NULL;

ALTER TABLE "animals" ADD FOREIGN KEY ("land_id") REFERENCES "lands" ("id");

ALTER TABLE "animal_tag" ADD FOREIGN KEY ("animal_id") REFERENCES "animals" ("id");

ALTER TABLE "animal_tag" ADD FOREIGN KEY ("tag_id") REFERENCES "tags" ("id");

ALTER TABLE "transports" ADD FOREIGN KEY ("animal_id") REFERENCES "animals" ("id");

ALTER TABLE "transports" ADD FOREIGN KEY ("origin_land_id") REFERENCES "lands" ("id");

ALTER TABLE "transports" ADD FOREIGN KEY ("destiny_land_id") REFERENCES "lands" ("id");

ALTER TABLE "events" ADD FOREIGN KEY ("event_type") REFERENCES "event_type" ("id");

ALTER TABLE "events" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE SET NULL;

ALTER TABLE "animal_history" ADD FOREIGN KEY ("modified_by") REFERENCES "users" ("id") ON DELETE SET NULL;

ALTER TABLE "animal_event" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "animal_event" ADD FOREIGN KEY ("animal_id") REFERENCES "animals" ("id");

ALTER TABLE "weightings" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "sales" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "vaccinations" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "animal_history" ADD FOREIGN KEY ("animal_id") REFERENCES "animals" ("id");