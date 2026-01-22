import { Trash, Edit } from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const users = [
  { id: 0, username: "Test #1", email: "testemail@example.com", role: "Admin" },
  { id: 1, username: "Test #2", email: "testemail2@example.com", role: "User" },
  { id: 2, username: "Test #3", email: "testemail3@example.com", role: "User" }
]

export default function List() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>List of registered users</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">#{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className={user.role == "Admin" ? "text-red-500": ""}>
                  {user.role}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" aria-label="Submit">
                    <Edit />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Submit" className="ml-2">
                    <Trash className="text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
