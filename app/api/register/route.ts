import { supabase } from "@/lib/db"
import { NextResponse } from 'next/server'
import { hash } from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, email, password, password2 } = body

    if (!username) {
      return NextResponse.json(
        { error: 'Username are required' },
        { status: 400 }
      )
    }
    if (!email) {
      return NextResponse.json(
        { error: 'Email are required' },
        { status: 400 }
      )
    }
    if (!password || !password2) {
      return NextResponse.json(
        { error: 'Password and confirm password are required' },
        { status: 400 }
      )
    }

    if (password != password2) {
        return NextResponse.json(
            { error: "Passwords do not match" },
            { status: 400 }
        )
    }

    const hashed = hash("sha256", password)

    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          email: email,
          username: username,
          password: hashed,
          role: 0
        }
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
