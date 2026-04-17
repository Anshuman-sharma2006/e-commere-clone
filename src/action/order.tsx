// "use server"

// import {db} from "@/db/db"
// import OrderHistoryEmail from "@/src/email/OrderHistory"
// import { Resend } from "resend"
// import { z } from "zod"

// const emailSchema = z.string().email()
// const resend = new Resend(process.env.RESEND_API_KEY as string)

// export async function emailOrderHistory(
//   prevState: unknown,
//   formData: FormData
// ): Promise<{ message?: string; error?: string }> {
//   const result = emailSchema.safeParse(formData.get("email"))

//   if (result.success === false) {
//     return { error: "Invalid email address" }
//   }

//   const user = await db.user.findUnique({
//     where: { email: result.data },
//     select: {
//       email: true,
//       orders: {
//         select: {
//           pricePaidIntRupees: true,
//           id: true,
//           createdAt: true,
//           product: {
//             select: {
//               id: true,
//               name: true,
//               imagePath: true,
//               description: true,
//             },
//           },
//         },
//       },
//     },
//   })

//   if (user == null) {
//     return {
//       message:
//         "Check your email to view your order history and download your products.",
//     }
//   }
// const orders = await Promise.all(
//   user.orders.map(async (order) => {
//     const downloadVerification = await db.downlodVerification.create({
//       data: {
//         expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
//         productId: order.product.id,
//       },
//     });

//     return {
//       ...order,
//       downloadVerificationId: downloadVerification.id,
//     };
//   })
// );

//   const data = await resend.emails.send({
//     from: `Support <${process.env.SENDER_EMAIL}>`,
//     to: user.email,
//     subject: "Order History",
//     react: <OrderHistoryEmail orders={await Promise.all(orders)} />,
//   })

//   if (data.error) {
//     return { error: "There was an error sending your email. Please try again." }
//   }

//   return {
//     message:
//       "Check your email to view your order history and download your products.",
//   }
// }