import {Nav, Navlink } from "@/components/nav";
// import {nav }from "@/components/nav";ic="force-dynamic"
export const dynamic="force-dynamic" 
export default function AdminLayout({children,}: Readonly<{children: React.ReactNode;}>){
    return (<>
    <Nav  >
        <Navlink href="/admin">Dashboard</Navlink>
        <Navlink href="/admin/products">Product</Navlink>
        <Navlink href="/admin/users">Customer</Navlink>
        <Navlink href="/admin/orders">Sales</Navlink>
    </Nav>
    <div className="container my-6">{children}</div>
    </>  )  
}