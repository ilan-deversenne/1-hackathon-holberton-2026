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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Register() {
  const [error, setError] = useState<string>("")

  const [email, setEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")

  function handleRegister() {
    if (email == "" || username == "" || password == "" || password2 == "") {
      setError("Empty field(s)")
      return
    }
    if (password !== password2) {
      setError("Passwords do not match")
      return
    }

    axios.post('/api/register', {
      email: email,
      username: username,
      password: password,
      password2: password2
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      setError(
        error.response.data.error ?
          error.response.data.error : "An error occured, please wait"
      )
    });
  }

  return (
    <>
      {error !== "" ? (
        <Alert variant="destructive" className="mx-auto w-full max-w-sm">
          <AlertCircleIcon />
          <AlertTitle>Register failed</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      ) : (<></>)}

      <div className="mt-6 flex justify-center">
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
                    onChange={(e) => {setEmail(e.target.value)}}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="example123"
                    onChange={(e) => {setUsername(e.target.value)}}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={"•".repeat(8)}
                    onChange={(e) => {setPassword(e.target.value)}}
                    required
                  />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="password2">Confirm password</Label>
                  <Input
                    id="password2"
                    type="password"
                    placeholder={"•".repeat(8)}
                    onChange={(e) => {setPassword2(e.target.value)}}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" onClick={handleRegister}>
              Register
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
