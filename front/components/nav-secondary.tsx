"use client"

import * as React from "react"
import { type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation";

export function NavSecondary({
                               items,
                               ...props
                             }: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const handleClick = (item) => () => {
    if (item.title === "Salir") {
      setOpen(true)
    }
  }

  const handleConfirmLogout = () => {
    // Aquí borras token y rediriges
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
      <>
        <SidebarGroup {...props}>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                  <span onClick={handleClick(item)} className="flex items-center gap-2 cursor-pointer">
                    <item.icon />
                    <span>{item.title}</span>
                  </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Estás seguro que quieres salir?</DialogTitle>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={handleConfirmLogout}>Salir</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
  )
}
