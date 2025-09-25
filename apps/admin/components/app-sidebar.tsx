import * as React from "react"
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const router = useRouter();
  const currentPath = router.pathname;

  const {data: session} = useSession();
  const userRole = session?.role || "member"; // Default to 'member' if role is undefined

type NavItem = {
  title: string;
  url: string;
  isActive?: boolean;
  
};

type NavSection = {
  title: string;
  url: string;
  items: NavItem[];
  roles: string[];
};

const data: { navMain: NavSection[] } = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      roles: ["member", "admin", "superadmin"],
      items: [
        {
          title: "Overview",
          url: "/",
          isActive: currentPath === "/",
        },
        {
          title: "System Health",
          url: "/health",
          isActive: currentPath === "/health",
        },
        {
          title: "Stats & Logs",
          url: "/stats",
          isActive: currentPath === "/stats",
        },
      ],
    },
    {
      title: "Users",
      url: "/users",
      roles: ["admin", "superadmin"],
      items: [
        {
          title: "All Users",
          url: "/users",
          isActive: currentPath === "/users",
        },
        {
          title: "Add User",
          url: "/users/new",
          isActive: currentPath === "/users/new",
        },
        {
          title: "Roles & Permissions",
          url: "/users/roles",
          isActive: currentPath === "/users/roles",
        },
      ],
    },
    {
      title: "Tenants",
      url: "/tenants",
      roles: ["superadmin"],
      items: [
        {
          title: "Tenant List",
          url: "/tenants",
          isActive: currentPath === "/tenants",
        },
        {
          title: "Invite User",
          url: "/tenants/invite",
          isActive: currentPath === "/tenants/invite",
        },
        {
          title: "Tenant Settings",
          url: "/tenants/settings",
          isActive: currentPath === "/tenants/settings",
        },
      ],
    },
    {
      title: "Authentication",
      url: "/auth",
      roles: ["member", "admin", "superadmin"],
      items: [
        {
          title: "Profile",
          url: "/auth/profile",
          isActive: currentPath === "/auth/profile",
        },
        {
          title: "Change Password",
          url: "/auth/change-password",
          isActive: currentPath === "/auth/change-password",
        },
        {
          title: "Logout",
          url: "/auth/logout",
          isActive: currentPath === "/auth/logout",
        },
      ],
    },
    {
      title: "System",
      url: "/system",
      roles: ["superadmin"],
      items: [
        {
          title: "API Keys",
          url: "/system/api-keys",
          isActive: currentPath === "/system/api-keys",
        },
        {
          title: "Config",
          url: "/system/config",
          isActive: currentPath === "/system/config",
        },
      ],
    },
    {
      title: "Community",
      url: "/community",
      roles: ["member", "admin", "superadmin"],
      items: [
        {
          title: "Contribution Guide",
          url: "https://github.com/bilalyaver/saaseed/blob/main/CONTRIBUTING.md",
        },
        {
          title: "Discussions",
          url: "https://github.com/bilalyaver/saaseed/discussions",
        },
      ],
    },
  ],
}

const visibleSections = data.navMain.filter(
  section => !section.roles || section.roles.includes(userRole)
)

  return (
    <Sidebar 
      {...props}
   >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {visibleSections.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={item.items.some(i => i.isActive)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="cursor-pointer">
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item?.isActive}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "John Doe", email: "john@example.com", avatar: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
