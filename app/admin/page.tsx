// import { Button } from "@/components/ui/button"
import { db } from "@/db/db"
import { formatCurrency,formatNumber } from "@/lib/formatter"
import {
  Card,
  // CardAction,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const GetSalesData=async()=>{
  const data=await db.order.aggregate({
    _sum:{pricePaidIntRupees:true},
    _count: {id: true }
  })
  return {
  amount:(data._sum.pricePaidIntRupees||0)/100,
  numberOfSales: data._count.id
  }
}

export default async function AdminDashboardPage() {
  const SalesData= await GetSalesData()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard title="Total Sales" subtitle={formatNumber(SalesData.numberOfSales)} body={formatCurrency(SalesData.amount)} />
      <DashboardCard title="Total Orders" subtitle="Last 30 days" body="Rs.123" />
      <DashboardCard title="Total Customers" subtitle="Last 30 days" body="Rs.45" />

       </div>
  )
}
type DashBoardCardProps = {
  title: string,
  subtitle: string,
  body: string

}
function DashboardCard({title, subtitle, body}: DashBoardCardProps){
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
         <CardContent><p>{body}</p></CardContent>
    </Card>
  )
}