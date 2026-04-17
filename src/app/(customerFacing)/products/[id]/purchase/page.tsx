import { User } from '@prisma/client'
import { db } from "@/db/db"
import { notFound } from "next/navigation"
// import { loadStripe } from '@stripe/stripe-js';
import Stripe from "stripe";
import { CheckoutForm } from "./_component/CheckoutForm";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: '2025-04-30.basil'
// });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// console.log('Stripe initialized with publishable key:', process.env.STRIPE_SECRET_KEY);
export default async function PurchasePage(props: { params: { id: string } | Promise<{ id: string }> }) {
  // Unwrap the Promise if needed
  const { id } = await props.params;

  const product = await db.product.findUnique({
    where: { id },
  });
  const user = await db.user.findUnique({
    where: { id },
  });
   if (!product) {
    return notFound();
  }
  console.log("product", product)
  console.log("user", user)

  const amount = Math.max(product.priceIntRupees*100 , 100); // Ensure at least 1 paise
 const paymentIntent = await stripe.paymentIntents.create({
  amount, // convert to paise here
  currency: "inr",
  // receipt_email: user?.email ?? undefined,
  metadata: { productId: product.id },
});
  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent")
  }

  return (
    
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  )

}