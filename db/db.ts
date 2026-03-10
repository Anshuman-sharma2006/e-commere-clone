//!Here It Create Globale Databse Connection That Make It Singelton Structure So Each Request Not Created New Database That Make Reduce From Hot-Reloading
// import { PrismaClient } from "@prisma/client" //* Here Its A Singeltone Structure So each request not Created new data base that make reduce from hot-reloading

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient | undefined//* Save Database Globally 
// }

// export const db =
//   globalForPrisma.prisma ?? new PrismaClient()//!Use That globally Database Without Creating other That Make It SingeltonStr

// if (process.env.NODE_ENV !== "production")
//   globalForPrisma.prisma = db //before Prisma 5.0.0 we use this code but now we use adapter for better-sqlite3 that make it more efficient and faster than before
//! This keeps one connection globally, preventing hot-reload issues in Next.js dev mode.
import "dotenv/config"
import {  PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!
})

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db
}