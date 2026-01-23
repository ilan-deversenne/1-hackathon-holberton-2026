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

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await context.params

  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) {
    return NextResponse.json(
      { error: "Quiz not found" } satisfies ErrorResponse,
      { status: 404 }
    )
  }

  return NextResponse.json(data satisfies Quiz)
}
