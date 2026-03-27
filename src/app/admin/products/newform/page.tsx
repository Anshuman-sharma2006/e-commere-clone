import { PageHeader } from "../../_component/PageHeader";
import { ProductForm } from "../_component/ProductForm";

// export  function newform(){
//     return <>
//         <PageHeader>Add Product</PageHeader>
//         <ProductForm/>
//     </>

// }
export default function pageForm() {
  return (<>
  <PageHeader>Add Product</PageHeader>
  <ProductForm/>
  </>
  )
}