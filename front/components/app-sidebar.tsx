"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails, IconLogout, IconMap, IconMoneybag,
  IconReport,
  IconSearch,
  IconSettings, IconUser,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useEffect} from "react";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  // const data = {
  //   user: {
  //     name: "shadcn",
  //     email: "m@example.com",
  //     avatar: "/avatars/shadcn.jpg",
  //   },
  //   navMain: [
  //     {
  //       title: "Principal",
  //       url: "/dashboard",
  //       icon: IconDashboard,
  //     },
  //     {
  //       title: "Usuarios",
  //       url: "/dashboard/users",
  //       icon: IconUsers,
  //     },
  //     {
  //       title: "Contributentes",
  //       url: "/dashboard/contributors",
  //       icon: IconUser
  //     },
  //     {
  //       title: "Mapa",
  //       url: "/dashboard/map",
  //       // icon map
  //       icon: IconMap,
  //     },
  //     {
  //       title: "Pagos",
  //       url: "/dashboard/payments",
  //       // icon de  money
  //       icon: IconMoneybag,
  //     },
  //   ],
  //   navClouds: [
  //     {
  //       title: "Capture",
  //       icon: IconCamera,
  //       isActive: true,
  //       url: "#",
  //       items: [
  //         {
  //           title: "Active Proposals",
  //           url: "#",
  //         },
  //         {
  //           title: "Archived",
  //           url: "#",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Proposal",
  //       icon: IconFileDescription,
  //       url: "#",
  //       items: [
  //         {
  //           title: "Active Proposals",
  //           url: "#",
  //         },
  //         {
  //           title: "Archived",
  //           url: "#",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Prompts",
  //       icon: IconFileAi,
  //       url: "#",
  //       items: [
  //         {
  //           title: "Active Proposals",
  //           url: "#",
  //         },
  //         {
  //           title: "Archived",
  //           url: "#",
  //         },
  //       ],
  //     },
  //   ],
  //   navSecondary: [
  //     // {
  //     //   title: "Settings",
  //     //   url: "#",
  //     //   icon: IconSettings,
  //     // },
  //     // {
  //     //   title: "Get Help",
  //     //   url: "#",
  //     //   icon: IconHelp,
  //     // },
  //     // {
  //     //   title: "Search",
  //     //   url: "#",
  //     //   icon: IconSearch,
  //     // },
  //     {
  //       title: "Salir",
  //       url: "#",
  //       icon: IconLogout,
  //     }
  //   ],
  //   documents: [
  //     {
  //       name: "Data Library",
  //       url: "#",
  //       icon: IconDatabase,
  //     },
  //     {
  //       name: "Reports",
  //       url: "#",
  //       icon: IconReport,
  //     },
  //     {
  //       name: "Word Assistant",
  //       url: "#",
  //       icon: IconFileWord,
  //     },
  //   ],
  // }
  const [data, setData] = React.useState({
      user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
      navMain: [
        {
          title: "Principal",
          url: "/dashboard",
          icon: IconDashboard,
        },
        {
          title: "Usuarios",
          url: "/dashboard/users",
          icon: IconUsers,
        },
        {
          title: "Contributentes",
          url: "/dashboard/contributors",
          icon: IconUser
        },
        {
          title: "Mapa",
          url: "/dashboard/map",
          icon: IconMap,
        },
        {
          title: "Pagos",
          url: "/dashboard/payments",
          icon: IconMoneybag,
        },
      ],
      navSecondary: [
        {
          title: "Salir",
          url: "#",
          icon: IconLogout,
        }
      ],
      documents: [
        {
          name: "Data Library",
          url: "#",
          icon: IconDatabase,
        },
        {
          name: "Reports",
          url: "#",
          icon: IconReport,
        },
        {
          name: "Word Assistant",
          url: "#",
          icon: IconFileWord,
        },
      ],
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user && user.name) {
      setData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          name: user.username,
          email: user.name,
        }
      }))
    }
  }, [])


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Publicidad</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavDocuments items={data.documents} />*/}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
