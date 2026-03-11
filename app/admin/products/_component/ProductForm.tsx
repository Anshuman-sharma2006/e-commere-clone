"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency, formatNumber } from "@/lib/formatter"
import { useFormStatus,useFormState  } from "react-dom"
import { useActionState } from "react"
import { useState } from "react"
import { addProduct } from "../../_action/product"
export function ProductForm(){
    const [error, action] = useActionState(addProduct, { errors: {}})//*connects the form to the addProduct server action and keeps the returned state (like validation errors)
     const [priceIntRupees, setpriceIntRupees] = useState<number>()
    return (
    <>
 <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          // defaultValue={product?.name || ""}
        />
        {/* {error.name && <div className="text-destructive">{error.name}</div>} */}
      {error.errors.name && (
  <div className="text-destructive">{error.errors.name[0]}</div>
)}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceIntRupees">Price In Ruppes</Label>
        <Input
          type="number"
          id="priceIntRupees"
          name="priceIntRupees"
          required
          value={priceIntRupees ?? ""}
          onChange={e => setpriceIntRupees(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceIntRupees || 0) )}
        </div>
        {error.errors.priceIntRupees && ( <div className="text-destructive">{error.errors.priceIntRupees[0]}</div>)}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          // defaultValue={product?.description}
        />
        {error.errors.description && (<div className="text-destructive">{error.errors.description[0]}</div> )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
        {/* {product != null && (<div className="text-muted-foreground">{product.filePath}</div>)} */}
        {error.errors.file && <div className="text-destructive">{error.errors.file[0]}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required />
        {/* {product != null && (<Imagesrc={product.imagePath}height="400"width="400"alt="Product Image"/>)} */}
        {error.errors.image && <div className="text-destructive">{error.errors.image[0]}</div>}
      </div>
      <SubmitButton />
    </form>
    </>
    )       
function SubmitButton() {
  const { pending } = useFormStatus()//? Track The Submission State of a form and manage UI like loading or disabling buttons during form submission

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}
}