"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {usePathname} from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/*<SidebarMenu>*/}
        {/*  <SidebarMenuItem className="flex items-center gap-2">*/}
        {/*    <SidebarMenuButton*/}
        {/*      tooltip="Quick Create"*/}
        {/*      className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"*/}
        {/*    >*/}
        {/*      <IconCirclePlusFilled />*/}
        {/*      <span>Quick Create</span>*/}
        {/*    </SidebarMenuButton>*/}
        {/*    <Button*/}
        {/*      size="icon"*/}
        {/*      className="size-8 group-data-[collapsible=icon]:opacity-0"*/}
        {/*      variant="outline"*/}
        {/*    >*/}
        {/*      <IconMail />*/}
        {/*      <span className="sr-only">Inbox</span>*/}
        {/*    </Button>*/}
        {/*  </SidebarMenuItem>*/}
        {/*</SidebarMenu>*/}
        <SidebarMenu>
          {items.map((item) => {
            let isActive = 'inactive'
            // pathname === item.url
            if (item.url === pathname) {
              isActive = 'active'
            }
            return (
                <Link href={item.url} key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip={item.title}
                        style={{ cursor: "pointer" }}
                        className={isActive === 'active' ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground' : ''}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
