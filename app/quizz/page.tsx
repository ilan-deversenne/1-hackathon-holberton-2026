import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const quizzes = [
    { id: 0, name: "Base HTML", description: "Grace a ce quizz apprendez les base en HTML" },
    { id: 1, name: "Base réseaux", description: "Grace a ce quizz apprendez les base en réseaux" }
]

export default function Quizz() {
    return (
        <>
            <h1 className="mt-8 mb-8 text-2xl text-center">Choice a quizz</h1>

            <div className="w-[80%] grid grid-cols-3 gap-6 mx-auto">

                {quizzes.map(quizz =>

                    <Card>
                      <CardHeader>
                        <CardTitle>{quizz.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <h2 className="mt-2">{quizz.description}</h2>
                      </CardContent>
                    </Card>
                    
 

                )}

            </div>

        </>
    )
}
