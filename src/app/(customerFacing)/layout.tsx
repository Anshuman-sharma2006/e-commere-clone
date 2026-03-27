// app/page.tsx

import {  Nav,Navlink } from "@/components/nav";
export const dynamic = "force-dynamic"
export default function HomePage({
  children,
}: Readonly<{
  children: React.ReactNode
}>)  {
  return (
    <>
      {/* Navigation */}
      <Nav>
        <Navlink href="/">Home</Navlink>
        <Navlink href="/products">Products</Navlink>
        <Navlink href="/orders">My Orders</Navlink>
      </Nav>
      <div className="container my-6">{children}</div>
      
    </>
  )
}