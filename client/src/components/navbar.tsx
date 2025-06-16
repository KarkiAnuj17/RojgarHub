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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Menu, Briefcase, Building2, Users, BookOpen, DollarSign, User, Plus } from "lucide-react"

const Navbar = () => {
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

          <div className="hidden lg:flex items-center space-x-1">
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
                          <Link
                            href="/job/listJobs"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <Search className="w-4 h-4 text-gray-500" />
                            <span>Browse All Jobs</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/jobs/remote"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>Remote Jobs</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/jobs/categories"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
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
                          <Link
                            href="/companies"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <Building2 className="w-4 h-4 text-gray-500" />
                            <span>All Companies</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/companies/top"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>Top Recruiter</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/companies/startups"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
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
                          <Link
                            href="/salary-guide"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            <span>Salary Guide</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/career-advice"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <BookOpen className="w-4 h-4 text-gray-500" />
                            <span>Career Advice</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/resume-builder"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <User className="w-4 h-4 text-gray-500" />
                            <span>Resume Builder</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/employers"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
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
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search jobs..." className="pl-10 pr-4 py-2 w-full" />
                  </div>

                  <div className="space-y-2">
                    <Link
                      href="/jobs"
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Briefcase className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Browse Jobs</span>
                    </Link>
                    <Link
                      href="/companies"
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Building2 className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Companies</span>
                    </Link>
                    <Link
                      href="/salary-guide"
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <DollarSign className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Salary Guide</span>
                    </Link>
                    <Link
                      href="/career-advice"
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <BookOpen className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Career Advice</span>
                    </Link>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search jobs, companies..." className="pl-10 pr-4 py-2 w-full" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
