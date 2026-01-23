import { supabase } from "@/lib/db"
import { NextResponse } from "next/server"

type Quiz = {
  id: string
  name: string
  description: string
  questions: unknown
  created_at: string
  updated_at: string | null
}

type ErrorResponse = {
  error: string
}

export async function GET(): Promise<NextResponse<Quiz[] | ErrorResponse>> {
  try {
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")

    if (error || !data) {
      return NextResponse.json(
        { error: error?.message ?? "Database error" },
        { status: 500 }
      )
    }

    return NextResponse.json(data as Quiz[], { status: 200 })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
