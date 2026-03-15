import { Button } from "@/components/ui/button";
import { db } from "@/db/db";
import { PageHeader } from "../_component/PageHeader";
import Link from"next/link"
import {Table,TableBody,TableCell,TableHead,TableHeader,  TableRow,} from "@/components/ui/table"
export default function ProductPage(){
    return <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/newform">Add Product</Link>
        </Button>
      </div>
      <ProductTables/>
    </>

}
async function ProductTables(){
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceIntRupees: true,
      isAvialableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  })

  if (products.length === 0) return <p>No products found</p>
    return(
         <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
    </Table>
    )
}