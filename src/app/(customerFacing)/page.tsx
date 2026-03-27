import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { db } from "@/db/db"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { cache } from "@/lib/cache"

const getMostPopularProducts = cache(() => {
  return db.product.findMany({
    where: { isAvialableForPurchase: true },
    orderBy: { CreatedAt: "desc" },
    take: 6,
  })
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
)

const getNewestProducts = cache(() => {
    return db.product.findMany({
      where: { isAvialableForPurchase: true },
      orderBy: { CreatedAt: "desc" },
      take: 6,
    })
  },
  ["/", "getNewestProducts"],
  { revalidate: 60 * 60 * 24 }
)


export default function HomePage() {
  return <main className= "space-y-12" >
    <ProductGridSection title="Most Popular"  ProductFetcher={getMostPopularProducts}/>
    <ProductGridSection title="Newest"  ProductFetcher={getNewestProducts}/>

  </main>
}
type ProductGridSectionProps = {
  title : string
   ProductFetcher: () => Promise<Product[]>
}
async function ProductGridSection({title, ProductFetcher }: ProductGridSectionProps) {
  
  return (
<div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="flex items-center">
            <span>View all</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense ProductFetcher={ProductFetcher} />
        </Suspense>
      </div>
    </div>
  );

}
async function ProductSuspense({
  ProductFetcher,
}: {
  ProductFetcher: () => Promise<Product[]>
}) {
  const products = await ProductFetcher()
  return (products).map(product => (
    <ProductCard key={product.id} {...product} />
  ))}