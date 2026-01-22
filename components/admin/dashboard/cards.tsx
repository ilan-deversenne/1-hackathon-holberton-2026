import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const stats = [
  { id: 0, name: "Users", value: 0, icon: "" },
  { id: 1, name: "Lessons", value: 0, icon: "" },
  { id: 3, name: "Quiz", value: 0, icon: "" }
]

export default function Cards() {
  return (
    <div className="flex gap-4">
      { stats.map(stat => 
        <Card key={stat.id} className="min-w-[180px]">
          <CardHeader>
            <CardTitle>{stat.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{stat.value}</p>
          </CardContent>
        </Card>
      ) }
    </div>
  )
}
