"use server"
import db from "@/db/db"
import { z } from "zod"//!Data validation library(DataComingFromTheFormIsCorrectOrNot.)
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const fileSchema = z.instanceof(File, { message: "Required" })  //?File Must Be Object and Required
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/") //?If file is empty or file type is image(png,jpg, jpeg, gif, svg, webp) then it is valid
)
const addSchema = z.object({//*This Reprsent Entire Schema of the form
  name: z.string().min(1),         //?Name Must Be String and AtLeast 1 Character 
  description: z.string().min(1),
  priceInRp: z.coerce.number().int().min(1),
  file: fileSchema.refine(file => file.size > 0, "Required"),
  image: imageSchema.refine(file => file.size > 0, "Required"),
})
//Previous Form State->prevState
//Form Submited State->formData
export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    const errors =result.error.format().fieldErrors
    return {errors}
  }

  const data = result.data

  await fs.mkdir("products", { recursive: true })
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

  await fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  )

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}


