"use server"

import { db } from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound } from 'next/navigation';
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const fileSchema = z.instanceof(File, { message: "Required" })

const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/"),
  { message: "File must be an image" }
)

const addSchema = z.object({
  // id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  priceIntRupees: z.coerce.number().int().min(1, "Price must be greater than 0"),
  file: fileSchema.refine(file => file.size > 0, "File is required"),
  image: imageSchema.refine(file => file.size > 0, "Image is required"),
})

type FormState = {
  errors: {
    name?: string[]
    description?: string[]
    priceIntRupees?: string[]
    file?: string[]
    image?: string[]
  }
}
export async function addProduct(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const result = addSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    priceIntRupees: formData.get("priceIntRupees"),
    file: formData.get("file"),
    image: formData.get("image"),
  })
  //  console.log(result)  
  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    return { errors: fieldErrors ?? {} }
  }

  const data = result.data

  await fs.mkdir("products", { recursive: true })

  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`

  await fs.writeFile(
    filePath,
    Buffer.from(await data.file.arrayBuffer())
  )

  await fs.mkdir("public/products", { recursive: true })

  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`

  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  )

  await db.product.create({
    data: {
      isAvialableForPurchase: false,
      name: data.name,
      description: data.description,
      priceIntRupees: data.priceIntRupees,
      filePath,
      imagePath,
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}
const editSchema = addSchema.extend({
  // id:string,
  file: fileSchema.optional(),
  image: imageSchema.optional(),
 })
export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    return { errors: fieldErrors ?? {} };
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  let filePath = product.filePath
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath)
    filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
  }

  let imagePath = product.imagePath
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`)
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    )
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
     priceIntRupees: data.priceIntRupees,
      filePath,
      imagePath,
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}
export async function toggleProductAvailability(id:string,isAvialableForPurchase:boolean){
  await db.product.update({
    where: {id},
    data:{isAvialableForPurchase}
    
  })
await Promise.all([
  revalidatePath("/"),
  revalidatePath("/products")
])

} 
export async function deleteProduct(id: string){
  const product=await db.product.findUnique({where:{id}})
  if(!product) return;

  await Promise.all([
    db.product.delete({where:{id}}),
    fs.unlink(product.filePath).catch(() => {}),
    fs.unlink(`public${product.imagePath}`).catch(() => {})
  ])
  await Promise.all([
    revalidatePath("/"),
    revalidatePath("/products")
  ])
}

