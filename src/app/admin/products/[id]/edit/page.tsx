import { db } from "@/db/db";
import { PageHeader } from "../../../_component/PageHeader";
import { ProductForm } from "../../_component/ProductForm";


export default async function Editpage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
// export default async function Editpage({params}:{params:{id:string}}) {
//       console.log(params); 
//     const product =await db.product.findUnique({ where:{ id: params.id }});
//     return (<>
//   <PageHeader>Edit Product</PageHeader>
//   <ProductForm product={product ?? undefined}/>
//   </>
//   )
// }