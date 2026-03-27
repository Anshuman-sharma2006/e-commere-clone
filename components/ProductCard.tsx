import { Card,CardHeader,CardTitle,CardContent, CardDescription,CardFooter } from "./ui/card";
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { formatCurrency } from "@/lib/formatter"
type ProductCardProps = {
  id: string
  name: string
  priceIntRupees: number
  description: string
  imagePath: string
}
export  function ProductCard({  id,
  name,
priceIntRupees ,
  description,
  imagePath,}:ProductCardProps){
    return(
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full max-w-[601px] mx-auto aspect-[601/338] sm:max-h-[338px] h-auto">
  <Image
    src={imagePath}
    alt={name}
    fill
    className="object-cover object-center rounded-md"
  />
</div>
      {/* <div className="w-full sm:max-w-[601px] mx-auto relative aspect-[16/9]">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} fill alt={name} height={338}  width={601} />
      </div>

  <Image
    src={imagePath}
    alt={name}
    fill
    className="object-cover rounded-md"
  />
</div> */}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceIntRupees)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>

    );
}
export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
}