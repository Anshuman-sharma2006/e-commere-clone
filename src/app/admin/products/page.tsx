import { Button } from "@/components/ui/button";
import { db } from "@/db/db";
import { PageHeader } from "../_component/PageHeader";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber, formatCurrency } from "@/lib/formatter";
import { CheckCircle2, XCircle, MoreVertical } from "lucide-react"; // Icons
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // Dropdown components
import { ActiveToggleDropdownItem,DeleteDropdownItem } from "./_component/ProductAction";
// import { DeleteDropdownItem, ActiveToggleDropdownItem } from "@/components/admin/products"; // Custom actions

export default function ProductPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/newform">Add Product</Link>
        </Button>
      </div>
      <ProductTables />
    </>
  );
}

async function ProductTables() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceIntRupees: true, // your database field
      isAvialableForPurchase: true, // make sure it matches your DB field
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });

  if (products.length === 0) return <p>No products found</p>;

  return (
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
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvialableForPurchase ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 className="text-green-500" />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="text-red-500" />
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceIntRupees)}</TableCell>
            <TableCell>{formatNumber(product._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <MoreVertical />
                    <span className="sr-only">Open actions menu</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" bg-popover p-4 rounded-lg shadow-lg w-59">
                  <DropdownMenuItem asChild>
                    <a download href={`/admin/products/${product.id}/download`}>
                      Download
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                 <ActiveToggleDropdownItem  id={product.id} isAvailableForPurchase={product.isAvialableForPurchase} />
                  <DropdownMenuSeparator/>
                   <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
                </DropdownMenuContent>
              </DropdownMenu>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
