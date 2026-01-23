"use client"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Register() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcom Back to register</CardTitle>
        <CardDescription>
          Enter your email below to register to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => {
            window.location.href = "/login"
          }}>Sign In</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder={"•".repeat(8)} required />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="password2">Confirm password</Label>
              <Input id="password2" type="password" placeholder={"•".repeat(8)} required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}
