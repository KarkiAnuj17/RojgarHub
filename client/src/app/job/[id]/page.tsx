"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Building,
  Users,
  Globe,
  ArrowLeft,
  Briefcase,
  Star,
  Share2,
  Bookmark,
} from "lucide-react"
import Link from "next/link"

const JobDetail = () => {
  const params = useParams()
  const jobId = params?.id
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchDetails = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:8000/jobs/${jobId}`)
      setJob(data)
    } catch (err) {
      console.error("Failed to fetch job details:", err)
      setJob(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (jobId) {
      fetchDetails()
    }
  }, [jobId])

  const formatSalary = () => {
    if (!job?.salary) return "Negotiable"
    const { min, max, currency } = job.salary
    if (min && max) {
      return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
    } else if (min) {
      return `${currency} ${min.toLocaleString()}+`
    } else if (max) {
      return `Up to ${currency} ${max.toLocaleString()}`
    }
    return "Negotiable"
  }

  const getJobTypeColor = (type) => {
    const colors = {
      "Full-time": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "Part-time": "bg-blue-100 text-blue-800 border-blue-200",
      Contract: "bg-purple-100 text-purple-800 border-purple-200",
      Internship: "bg-orange-100 text-orange-800 border-orange-200",
      Remote: "bg-indigo-100 text-indigo-800 border-indigo-200",
    }
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg mb-6 w-32"></div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Job not found</h1>
            <p className="text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          href="/job/listJobs"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Link>
        <Card className="bg-white shadow-xl rounded-2xl overflow-hidden ">
          <CardContent className="">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-8 text-white">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/30">
                      <span className="text-white font-bold text-lg">
                        {job.company.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 3)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-4xl font-bold mb-3 leading-tight">{job.title}</h1>
                      <div className="flex items-center gap-3 mb-2">
                        <Building className="h-5 w-5 text-white/80" />
                        <span className="text-xl font-medium text-white/90">{job.company.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-white/80" />
                        <span className="text-white/90">{job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:items-end">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <Badge
                    className={`px-4 py-2 text-sm font-semibold rounded-full border ${getJobTypeColor(job.jobType)}`}
                  >
                    {job.jobType}
                  </Badge>
                  <Button
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-gray-50 font-semibold px-8 py-3 rounded-xl shadow-lg"
                  >
                    <Briefcase className="h-5 w-5 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50/50">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">Salary</p>
                  <p className="text-sm text-gray-600 font-medium">{formatSalary()}</p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">Experience</p>
                  <p className="text-sm text-gray-600 font-medium">{job.experienceLevel}</p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-3">
                    <Calendar className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">Deadline</p>
                  <p className="text-sm text-gray-600 font-medium">
                    {job.deadline ? new Date(job.deadline).toLocaleDateString("en-GB") : "Open"}
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">Job Type</p>
                  <p className="text-sm text-gray-600 font-medium">{job.jobType}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="px-8 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                </div>
                Job Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <>
                <Separator />
                <div className="px-8 py-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Star className="h-4 w-4 text-orange-600" />
                    </div>
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <Separator />
            <div className="px-8 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building className="h-4 w-4 text-green-600" />
                </div>
                About the Company
              </h2>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-xl">
                    {job.company.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 3)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{job.company.name}</h3>
                  {job.company.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed text-lg">{job.company.description}</p>
                  )}
                  {job.company.website && (
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                      Visit Company Website
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-gray-900 font-semibold">Ready to apply?</p>
                  <p className="text-gray-600 text-sm">Join our team and make an impact</p>
                </div>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Apply for this Position
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default JobDetail
