'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { use, useEffect, useState } from "react"
import axios from "axios"

type Response = {
  text: string
  correct: number
}

type Field = {
  question: string
  responses: Response[]
}

type Quiz = {
  id: string
  name: string
  description: string
  fields: Field[]
  created_at: string
  updated_at: string | null
}

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default function Page({ params }: PageProps) {
  const { id } = use(params)
  const [correctCount, setCorrectCount] = useState<number>(0)
  const [totalChecked, setTotalChecked] = useState<number>(0)
  const [quizz, setQuizz] = useState<Quiz | null>(null)
  const [results, setResults] = useState<Record<string, 1 | 0>>({})
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, boolean>>({})

  useEffect(() => {
    axios.get<Quiz>(`/api/quizz/${id}`)
      .then(res => setQuizz(res.data))
      .catch(console.error)
  }, [id])

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [key]: checked
    }))
  }

  function handleSubmit() {
    if (!quizz) return

    quizz.fields.forEach((field, fieldIdx) => {
      field.responses.forEach((response, responseIdx) => {
        const key = `${fieldIdx}-${responseIdx}`
        const isChecked = selectedAnswers[key]
        const isCorrect = response.correct === 1
        const newResults: Record<string, 1 | 0> = {}

        newResults[key] = 0
        if (isChecked) {
          setTotalChecked(totalChecked + 1)
          if (isCorrect) {
            setCorrectCount(correctCount + 1)
            newResults[key] = 1
          }
          setResults(newResults)
        }
      })
    })
  }

  if (!quizz) return null

  return (
    <div className="m-32">

      {totalChecked > 0 ? (
        <div className="mb-6 grid w-full max-w-md items-start gap-4 mx-auto">
          <Alert>
            <CheckCircle2Icon />
            <AlertTitle>Quizz result</AlertTitle>
            <AlertDescription>Correct {correctCount} / {totalChecked}</AlertDescription>
          </Alert>
        </div>
      ): (<></>)}

      <Card className="mb-6 text-center">
        <CardHeader>
          <CardTitle className="text-2xl">{quizz.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-xl">{quizz.description}</h1>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent>
          {quizz.fields.map((field, idx) => (
            <Card key={idx} className="bg-background">
              <CardContent>
                <h1 className="mb-8 text-2xl">{field.question}</h1>

                {field.responses.map((response, idx2) => {
                  const key = `${idx}-${idx2}`
                  return (
                    <FieldGroup 
                      id={`field-${key}`}
                      key={idx2}
                      data-c={response.correct}
                      className={`mt-2 mb-2 ${
                        results[key] === 1
                          ? 'bg-green-500'
                          : results[key] === 0
                          ? 'bg-red-500'
                          : 'bg-secondary'
                      }`}
                     >
                      <FieldLabel>
                        <Field orientation="horizontal" className="cursor-pointer">
                          <Checkbox
                            id={key}
                            name={key}
                            checked={selectedAnswers[key] || false}
                            onCheckedChange={(checked) => handleCheckboxChange(key, checked as boolean)}
                          />
                          <FieldContent>
                            <FieldTitle>{response.text}</FieldTitle>
                          </FieldContent>
                        </Field>
                      </FieldLabel>
                    </FieldGroup>
                  )
                })}
              </CardContent>
            </Card>
          ))}
        </CardContent>

        <CardFooter>
          <Button variant="outline" className="mx-auto cursor-pointer" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
