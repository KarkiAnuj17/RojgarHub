"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  BarChart3,
  FileText,
  Settings,
  MessageSquare,
  UserCheck,
  DollarSign,
  Calendar,
  LogOut
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "@/redux/reducerSlices/userSlice"

const mainItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Jobs", url: "/admin/jobs", icon: Briefcase },
  { title: "Companies", url: "/admin/companies", icon: Building2 },
  { title: "Job Seekers", url: "/admin/job-seekers", icon: Users },
]

const managementItems = [
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Messages", url: "/admin/messages", icon: MessageSquare },
  { title: "Approvals", url: "/admin/company-approval", icon: UserCheck },
]

const systemItems = [
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

export function AppSidebar() {
  const { collapsed } = useSidebar()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const router = useRouter()
  const {fullName , email} = useSelector(state=>state.user)
  const isActive = (path) => {
    if (path === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(path)
  }

  const getNavCls = (active) =>
    active
      ? "bg-primary text-primary-foreground font-medium"
      : "hover:bg-accent hover:text-accent-foreground"
 const handleLogout =()=>{
    dispatch(logoutUser());
    router.push('/')
 }
  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold">RojgarHub</h2>
              <p className="text-sm text-muted-foreground">Admin Panel</p>
            </div>
          )}
        </div>
        {!collapsed && <SidebarTrigger className="ml-auto" />}
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={getNavCls(isActive(item.url))}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={getNavCls(isActive(item.url))}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={getNavCls(isActive(item.url))}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fullName}</p>
              <p className="text-xs text-muted-foreground truncate">
               {email}
              </p>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button variant="ghost" size="sm" className="w-full justify-start mt-2" onClick={handleLogout}
>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
