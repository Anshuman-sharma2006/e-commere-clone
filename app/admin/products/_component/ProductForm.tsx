"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency, formatNumber } from "@/lib/formatter"
import { useFormStatus } from "react-dom"
import { useState } from "react"
export function ProductForm(){
     const [pricePaidIntRupees, setpricePaidIntRupees] = useState<number | undefined>()
    return (
    <>
 <form className="space-y-8">
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="pricePaidIntRupees">Price In Cents</Label>
        <Input
          type="number"
          id="pricePaidIntRupees"
          name="pricePaidIntRupees"
          required
          value={pricePaidIntRupees}
          onChange={e => setpricePaidIntRupees(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((pricePaidIntRupees || 0) )}
        </div>
        {/* {error.pricePaidIntRupees && ( <div className="text-destructive">{error.pricePaidIntRupees}</div>)} */}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          // defaultValue={product?.description}
        />
        {/* {error.description && (<div className="text-destructive">{error.description}</div> )} */}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
        {/* {product != null && (<div className="text-muted-foreground">{product.filePath}</div>)} */}
        {/* {error.file && <div className="text-destructive">{error.file}</div>} */}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required />
        {/* {product != null && (<Imagesrc={product.imagePath}height="400"width="400"alt="Product Image"/>)} */}
        {/* {error.image && <div className="text-destructive">{error.image}</div>} */}
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