import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function AdminDashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard title="Total Sales" subtitle="Last 30 days" body="'Rs.12,345" />
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