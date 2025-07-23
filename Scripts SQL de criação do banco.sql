CREATE DATABASE "clickbeard";

-- Enum para os dias da semana
CREATE TYPE "DayOfWeek" AS ENUM (
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY'
);

-- Tabela User
CREATE TABLE "User" (
    "id" VARCHAR(25) PRIMARY KEY DEFAULT gen_random_uuid (),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Tabela Barber
CREATE TABLE "Barber" (
    "id" VARCHAR(25) PRIMARY KEY DEFAULT gen_random_uuid (),
    "admin" BOOLEAN DEFAULT FALSE,
    "name" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255),
    "age" INT NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "contact_date" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Tabela Service
CREATE TABLE "Service" (
    "id" VARCHAR(25) PRIMARY KEY DEFAULT gen_random_uuid (),
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "price" FLOAT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Tabela BarberServices
CREATE TABLE "BarberServices" (
    "id" VARCHAR(25) PRIMARY KEY DEFAULT gen_random_uuid (),
    "barberId" VARCHAR(25) NOT NULL,
    "serviceId" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("barberId") REFERENCES "Barber" ("id"),
    FOREIGN KEY ("serviceId") REFERENCES "Service" ("id")
);

-- Tabela Schedules
CREATE TABLE "Schedules" (
    "id" VARCHAR(25) PRIMARY KEY DEFAULT gen_random_uuid (),
    "barberId" VARCHAR(25) NOT NULL,
    "startTime" TIMESTAMP NOT NULL,
    "endTime" TIMESTAMP NOT NULL,
    "isActive" BOOLEAN DEFAULT TRUE,
    "isCanceled" BOOLEAN DEFAULT FALSE,
    "isCompleted" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "serviceId" VARCHAR(25) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    FOREIGN KEY ("serviceId") REFERENCES "Service" ("id"),
    FOREIGN KEY ("barberId") REFERENCES "Barber" ("id"),
    FOREIGN KEY ("userId") REFERENCES "User" ("id")
);

-- Tabela WorkingSchedule
CREATE TABLE "WorkingSchedule" (
    "id" VARCHAR(25) PRIMARY KEY DEFAULT gen_random_uuid (),
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "dayOfWeek_number" INT NOT NULL,
    "startTime" VARCHAR(5) NOT NULL,
    "endTime" VARCHAR(5) NOT NULL,
    "lunchStart" VARCHAR(5),
    "lunchEnd" VARCHAR(5),
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);