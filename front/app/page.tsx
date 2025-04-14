'use client'
import { Button } from "@/components/ui/button"
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            router.push("/dashboard")
        }else {
            router.push("/login")
        }
    }, [])
  return (
      <div>
        {/*<Button>Click me</Button>*/}
      </div>
  )
}
