'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {useEffect, useState} from "react"
import api from "@/lib/axios";
import { toast } from "react-toastify"
import {useRouter} from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState(false)
  const router = useRouter()

  // handleLogin
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLogin(true)
        const formData = new FormData(e.currentTarget)
        const username = formData.get("username")
        const password = formData.get("password")
        api.post("/users/login", {
            username,
            password,
        }).then((response) => {
            const token = response.data.token
            const user = response.data.user
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            toast.success("Bienvenido: " + user.username)
            router.push("/dashboard")
        }).catch((error) => {
            toast.error(error.response.data.message)
        }).finally(() => {
            setLogin(false)
        })
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            router.push("/dashboard")
        }
    })
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            Iniciar sesión
          </CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name={"username"}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Olvidaste tu contraseña?
                  </a>
                </div>
                <div className={"relative"}>
                  <Input id="password"
                         type={showPassword ? "text" : "password"}
                         required
                         name={"password"}
                         className={"pr-10"}
                  />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={login}>
                    Iniciar sesión
                </Button>
                {/*<Button variant="outline" className="w-full">*/}
                {/*  Login with Google*/}
                {/*</Button>*/}
              </div>
            </div>
            {/*<div className="mt-4 text-center text-sm">*/}
            {/*  Don&apos;t have an account?{" "}*/}
            {/*  <a href="#" className="underline underline-offset-4">*/}
            {/*    Sign up*/}
            {/*  </a>*/}
            {/*</div>*/}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
