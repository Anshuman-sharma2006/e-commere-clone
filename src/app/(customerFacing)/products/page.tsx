import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { db } from "@/db/db"
// import { Product } from "@prisma/client"
import { Product } from "@prisma/client"
import { cache } from "@/lib/cache"
import { Suspense } from "react"

const getProducts = cache(
  async () => {
    return db.product.findMany({
      where: { isAvialableForPurchase: true },
      orderBy: { name: "asc" },
    })
  },
  ["/products", "getProducts"]
)

export default function products() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  )
}

async function ProductsSuspense() {
  const products = await getProducts()

  return products.map(product => <ProductCard key={product.id} {...product} />)
}