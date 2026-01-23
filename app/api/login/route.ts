import { supabase } from "@/lib/db"
import { NextResponse } from 'next/server'
import { hash } from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email are required' },
        { status: 400 }
      )
    }
    if (!password) {
      return NextResponse.json(
        { error: 'Password are required' },
        { status: 400 }
      )
    }

    const hashed = hash("sha256", password)

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (data.password == hashed) {
        return NextResponse.json({ code: 0, message: "Success" }, { status: 201 })
    }

    return NextResponse.json({ code: 1, error: "Incorrect email or password"  }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
