"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Code,
  Palette,
  BarChart3,
  Stethoscope,
  Wrench,
  GraduationCap,
  Play,
  Quote,
} from "lucide-react"
import CustomNavbar from "@/components/navbar"

const Homepage = () => {
  return (
    <div>
      <CustomNavbar/>
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Dream Job
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Today
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Discover thousands of job opportunities from top companies. Your next career move is just a search away.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Job title or keyword"
                    className="pl-12 h-14 text-lg border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="Location" className="pl-12 h-14 text-lg border-gray-200 focus:border-blue-500" />
                </div>
                <Button className="h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Search className="w-5 h-5 mr-2" />
                  Search Jobs
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-sm text-gray-500">Popular:</span>
                {["Remote", "Full-time", "Software Engineer", "Marketing", "Data Analyst"].map((term) => (
                  <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-blue-100">
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">25K+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">100K+</div>
              <div className="text-gray-600">Job Seekers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Explore opportunities in your field</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Code, name: "Technology", jobs: "12,500+" },
              { icon: Palette, name: "Design", jobs: "3,200+" },
              { icon: BarChart3, name: "Marketing", jobs: "5,800+" },
              { icon: Stethoscope, name: "Healthcare", jobs: "8,900+" },
              { icon: Wrench, name: "Engineering", jobs: "6,700+" },
              { icon: GraduationCap, name: "Education", jobs: "4,100+" },
            ].map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <category.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.jobs} jobs</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Companies Hiring</h2>
            <p className="text-xl text-gray-600">Join industry leaders and innovative startups</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "TechCorp", logo: "TC", jobs: 45, rating: 4.8 },
              { name: "InnovateLab", logo: "IL", jobs: 32, rating: 4.9 },
              { name: "DataFlow", logo: "DF", jobs: 28, rating: 4.7 },
              { name: "CloudTech", logo: "CT", jobs: 51, rating: 4.6 },
            ].map((company) => (
              <Card key={company.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {company.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{company.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{company.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{company.jobs} open positions</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get hired in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Build a compelling profile that showcases your skills and experience",
                icon: Users,
              },
              {
                step: "02",
                title: "Search & Apply",
                description: "Browse thousands of jobs and apply to positions that match your goals",
                icon: Search,
              },
              {
                step: "03",
                title: "Get Hired",
                description: "Connect with employers and land your dream job",
                icon: CheckCircle,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from our community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer at TechCorp",
                content:
                  "RojgarHub helped me find my dream job in just 2 weeks. The platform is intuitive and the job matches were perfect!",
                avatar: "SJ",
              },
              {
                name: "Michael Chen",
                role: "Marketing Manager at InnovateLab",
                content:
                  "Amazing experience! The quality of job listings and the application process made my job search so much easier.",
                avatar: "MC",
              },
              {
                name: "Emily Davis",
                role: "UX Designer at DataFlow",
                content:
                  "I love how RojgarHub connects you with companies that truly value your skills. Highly recommended!",
                avatar: "ED",
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="relative">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who found their perfect job through RojgarHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Users className="w-5 h-5 mr-2" />
              Create Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white  hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">RojgarHub</span>
              </div>
              <p className="text-gray-400">Connecting talent with opportunity. Your career journey starts here.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/jobs" className="hover:text-white transition">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="hover:text-white transition">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link href="/salary-guide" className="hover:text-white transition">
                    Salary Guide
                  </Link>
                </li>
                <li>
                  <Link href="/resume-builder" className="hover:text-white transition">
                    Resume Builder
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/employers" className="hover:text-white transition">
                    Post Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/employers/pricing" className="hover:text-white transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/employers/solutions" className="hover:text-white transition">
                    Solutions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RojgarHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  )
}

export default Homepage
