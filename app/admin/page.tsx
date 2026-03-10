// import { Button } from "@/components/ui/button"
import { db } from "@/db/db"
async function wait(duration:number){
  return new Promise(resolve=>{setTimeout(resolve,duration)})
}

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
  // console.log("Start")
  await wait(2000)
  // console.log("lodend")
  return {
  amount:(data._sum.pricePaidIntRupees||0)/100,
  numberOfSales: data._count.id
  }
} 
const GetUserData=async()=>{
  const [UserCount,orderData]=await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum:{pricePaidIntRupees:true}
    }),
  ])
  return{
    UserCount,
    AverageValuePerUser:UserCount===0?0:(orderData._sum.pricePaidIntRupees||0)
  }
}
const GetProductData=async()=>{
  const [activeCount,inactivecount]=await Promise.all([
    db.product.count({where:{isAvialableForPurchase:true}}),
    db.product.count({where:{isAvialableForPurchase:false}})
  ])
  return{
    activeCount,
    inactivecount
  }
}
export default async function AdminDashboardPage() {
  //*const SalesData= await GetSalesData()//->It has await untill done we can't move
  //*const UserData=await GetUserData()//->after previous one done its time and this task complete time will take time ,//!To Reduce Time We Use Promise Its Execute Task Parllely
  const [SalesData,UserData,ProductData]= await Promise.all([
   GetSalesData(),
   GetUserData(),
   GetProductData() 
  ])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      <DashboardCard title=" Sales" subtitle={`${formatNumber(SalesData.numberOfSales)} Orders`} body={`${formatCurrency(SalesData.amount)}`} />
      <DashboardCard title=" Customers" subtitle={`${formatNumber(UserData.UserCount)} Customers`} body={`${formatCurrency(UserData.AverageValuePerUser)}`} />
      <DashboardCard title=" Products" subtitle={`${formatNumber(ProductData.activeCount)} Active`} body={`${formatNumber(ProductData.inactivecount)} Inactive`} />

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