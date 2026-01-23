import { ComponentExample } from "@/components/component-example";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        window.location.href = '/quizz'
    }, [])

return (
    <></>
);
}