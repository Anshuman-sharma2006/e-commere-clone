import { PrismaClient } from "@prisma/client" //* Here Its A Singeltone Structure So each request not Created new data base that make reduce from hot-reloading

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined//* Save Database Globally 
}

export const db =
  globalForPrisma.prisma ?? new PrismaClient()//Use That globally Database Without Creating other That Make It SingeltonStr

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = db



 