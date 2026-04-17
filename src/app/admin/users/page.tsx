import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {db} from "@/db/db"
import { formatNumber, formatCurrency } from "@/lib/formatter";
import { PageHeader } from "../_component/PageHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"

import { Order } from "@prisma/client";
import { DeleteDropDownItem } from "./_component/UserAction";

function getUsers() {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      order: { select: { pricePaidIntRupees: true } },
    },
    orderBy: { CreatedAt: "desc" },
  })
}

export default function UsersPage() {
  return (
    <>
      <PageHeader>Customers</PageHeader>
      <UsersTable />
    </>
  )
}

async function UsersTable() {
  const users = await getUsers()

  if (users.length === 0) return <p>No customers found</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>order</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{formatNumber(user.order.length)}</TableCell>
            <TableCell>
              {formatCurrency(
                user.order.reduce((sum, o) => o.pricePaidIntRupees/100 + sum, 0)
              )}
            </TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={user.id}  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}