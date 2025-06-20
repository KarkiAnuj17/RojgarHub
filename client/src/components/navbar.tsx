"use client"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Menu,
  Briefcase,
  Building2,
  Users,
  BookOpen,
  DollarSign,
  User,
  Plus,
  LogOut,
  Settings,
  PlusCircle,
  FileText,
  UserCheck,
  MessageSquare,
  BarChart3,
  Eye,
  UserCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { logoutUser } from "@/redux/reducerSlices/userSlice"

const Navbar = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, email, fullName , role } = useSelector((state: any) => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RojgarHub
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          { role == "Job Seeker" ? (<div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <Briefcase className="w-4 h-4" />
                    <span>Jobs</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 bg-white rounded-lg shadow-lg border">
                    <div className="grid gap-3 w-64">
                      <div className="grid gap-2">
                        <h4 className="font-medium text-gray-900 mb-2">Find Jobs</h4>
                        <NavigationMenuLink asChild>
                          <Link href="/job/list-jobs" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <Search className="w-4 h-4 text-gray-500" />
                            <span>Browse All Jobs</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/jobs/remote" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>Remote Jobs</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/jobs/categories" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <span>Job Categories</span>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <Building2 className="w-4 h-4" />
                    <span>Companies</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 bg-white rounded-lg shadow-lg border">
                    <div className="grid gap-3 w-64">
                      <div className="grid gap-2">
                        <h4 className="font-medium text-gray-900 mb-2">Explore Companies</h4>
                        <NavigationMenuLink asChild>
                          <Link href="/companies" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <Building2 className="w-4 h-4 text-gray-500" />
                            <span>All Companies</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/companies/top" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>Top Recruiter</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/companies/startups" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <Plus className="w-4 h-4 text-gray-500" />
                            <span>Startups</span>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    <span>Resources</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 bg-white rounded-lg shadow-lg border">
                    <div className="grid gap-3 w-64">
                      <div className="grid gap-2">
                        <h4 className="font-medium text-gray-900 mb-2">Career Resources</h4>
                        <NavigationMenuLink asChild>
                          <Link href="/salary-guide" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            <span>Salary Guide</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/career-advice" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <BookOpen className="w-4 h-4 text-gray-500" />
                            <span>Career Advice</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/resume-builder" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <User className="w-4 h-4 text-gray-500" />
                            <span>Resume Builder</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/employers" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <Building2 className="w-4 h-4 text-gray-500" />
                            <span>For Employers</span>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>):( 
            <div className="hidden lg:flex items-center space-x-1">
  <NavigationMenu>
    <NavigationMenuList className="flex gap-1">
      <NavigationMenuItem>
        <NavigationMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
          <Briefcase className="w-4 h-4" />
          <span>Jobs</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="p-4 bg-white rounded-lg shadow-lg border">
          <div className="grid gap-3 w-64">
            <div className="grid gap-2">
              <h4 className="font-medium text-gray-900 mb-2">Job Management</h4>
              <NavigationMenuLink asChild>
                <Link href="/employers/jobs-post" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <PlusCircle className="w-4 h-4 text-gray-500" />
                  <span>Post New Job</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employers/jobs-manage" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span>Manage Jobs</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employers/job-templates" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span>Job Templates</span>
                </Link>
              </NavigationMenuLink>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
          <Users className="w-4 h-4" />
          <span>Candidates</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="p-4 bg-white rounded-lg shadow-lg border">
          <div className="grid gap-3 w-64">
            <div className="grid gap-2">
              <h4 className="font-medium text-gray-900 mb-2">Candidate Management</h4>
              <NavigationMenuLink asChild>
                <Link href="/employer/candidates/search" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <Search className="w-4 h-4 text-gray-500" />
                  <span>Search Candidates</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employer/applications" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span>Applications</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employer/candidates/shortlisted" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <UserCheck className="w-4 h-4 text-gray-500" />
                  <span>Shortlisted</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employer/interviews" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span>Interviews</span>
                </Link>
              </NavigationMenuLink>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="p-4 bg-white rounded-lg shadow-lg border">
          <div className="grid gap-3 w-64">
            <div className="grid gap-2">
              <h4 className="font-medium text-gray-900 mb-2">Reports & Analytics</h4>
              <NavigationMenuLink asChild>
                <Link href="/employer/analytics/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <BarChart3 className="w-4 h-4 text-gray-500" />
                  <span>Hiring Analytics</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employer/analytics/job-performance" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span>Job Performance</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employer/analytics/market-insights" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>Market Insights</span>
                </Link>
              </NavigationMenuLink>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
          <BookOpen className="w-4 h-4" />
          <span>Resources</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="p-4 bg-white rounded-lg shadow-lg border">
          <div className="grid gap-3 w-64">
            <div className="grid gap-2">
              <h4 className="font-medium text-gray-900 mb-2">Employer Resources</h4>
              <NavigationMenuLink asChild>
                <Link href="/employer/resources/hiring-guide" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span>Hiring Guide</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employer/resources/salary-benchmarks" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>Salary Benchmarks</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employer/resources/interview-templates" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span>Interview Templates</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employer/support" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>Support Center</span>
                </Link>
              </NavigationMenuLink>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
          <Building2 className="w-4 h-4" />
          <span>Company</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="p-4 bg-white rounded-lg shadow-lg border">
          <div className="grid gap-3 w-64">
            <div className="grid gap-2">
              <h4 className="font-medium text-gray-900 mb-2">Company Settings</h4>
              <NavigationMenuLink asChild>
                <Link href="/employers/company-registration" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span>Register Company</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/employer/company-profile" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <UserCircle className="w-4 h-4 text-gray-500" />
                  <span>Company Profile</span>
                </Link>
              </NavigationMenuLink>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</div>
)}

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-white/10">
                  <Avatar className="h-10 w-10 border-2 border-white/20 hover:border-white/40 transition-colors">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${email}`} alt={fullName} />
                    <AvatarFallback className="bg-purple-600 text-white font-semibold" />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${email}`} alt={fullName} />
                        <AvatarFallback className="bg-purple-600 text-white font-semibold" />
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium leading-none">{fullName}</p>
                        <p className="text-xs leading-none text-muted-foreground mt-1">{email}</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <User className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
