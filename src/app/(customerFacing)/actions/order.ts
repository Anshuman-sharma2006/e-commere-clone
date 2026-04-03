"use server";
import { db } from "@/db/db";

export async function userOrderExists(email: string, productId: string) {
  // Implementation for checking if a user has already purchased a product
  return (
    (await db.order.findFirst({
      where: { user: { email }, ProductId:productId },
      select: { id: true },
    })) != null
  )
}