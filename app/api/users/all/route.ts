import { supabase } from "@/lib/db"
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
