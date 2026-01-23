"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from "axios"
import { useEffect, useState } from "react"

type Quiz = {
  id: string
  name: string
  description: string
  questions: unknown
  created_at: string
  updated_at: string | null
}

export default function Quizz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    axios.get<Quiz[]>("/api/quizz")
      .then(response => {
        setQuizzes(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <h1 className="mt-8 mb-8 text-2xl text-center">Choice a quizz</h1>
      <div className="w-[80%] md:w-[65%] md:grid md:grid-cols-2 md:gap-6 mx-auto">
        {quizzes.map(quizz => (
          <Card
            key={quizz.id}
            className="my-4 md:my-[0] hover:scale-105 cursor-pointer"
            onClick={() => {
              window.location.href = "/quizz/" + quizz.id
            }}
          >
            <CardHeader>
              <CardTitle>{quizz.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="mt-2">{quizz.description}</h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
