import { db } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import React from "react"
import { render } from "@react-email/components";
import PurchaseReceiptEmail from "@/email/PurchaseReceipt";
console.log("Webhook received");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const resend = new Resend(process.env.RESEND_API_KEY as string)
export async function POST(req: NextRequest) {
    const event=stripe.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature")!, process.env.STRIPE_WEBHOOK_SECRET!)
    console.log("Stripe webhook event received:", event.type);
    if(event.type==="payment_intent.succeeded"){

  const paymentIntent = event.data.object as Stripe.PaymentIntent
  const fullPaymentIntent = await stripe.paymentIntents.retrieve(
  paymentIntent.id
);
const paymentMethod = await stripe.paymentMethods.retrieve(
  fullPaymentIntent.payment_method as string
);
  const ProductId = paymentIntent.metadata?.productId
  const email = paymentMethod.billing_details.email ;

  console.log("paymentIntent", paymentIntent)
  console.log("ProductId", ProductId)
  console.log("email", email)

  const pricePaidIntRupees = paymentIntent.amount
    const product = await db.product.findUnique({ where: { id: ProductId } })
    if (product == null || email == null) {
      return new NextResponse("Bad Request", { status: 400 })
    }
    
    const userFields = {
      email,
 order: { create: { ProductId, pricePaidIntRupees } }, // ✅ fixed    
 }
    const {
    order: [order],
    } = await db.user.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      select: { order: { orderBy: { createdAt: "desc" }, take: 1 } },
    })
      const downloadVerification = await db.downlodVerification.create({
      data: {
        productId: ProductId,
        expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
    
      try {
  const result = await resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: "Order Confirmation",
    html: "<h1 >Successfully Purchased</h1>",
  })

  console.log("Resend result:", result)
} catch (err) {
  console.error("Resend error:", err)
}
}
return new NextResponse()
}
// (
//         <PurchaseReceiptEmail
//           order={order}
//           product={product}
//           downloadVerificationId={downloadVerification.id}
//         />
//       ),