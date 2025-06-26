"use client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, MapPin, Calendar, DollarSign, Briefcase } from "lucide-react"

const ManageJobs = () => {
  const { _id: userId } = useSelector((state) => state.user)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs?postedBy=${userId}`)
      setJobs(data)
    } catch (error) {
      toast.error("Failed to fetch jobs")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`)
      toast.success("Job deleted successfully")
      fetchJobs()
    } catch (error) {
      toast.error("Failed to delete job")
    }
  }

  const formatSalary = (salary) => {
    const { min, max, currency } = salary || {}
    if (min && max) return `${currency || "Rs"} ${min.toLocaleString()} - ${max.toLocaleString()}`
    if (min) return `${currency || "Rs"} ${min.toLocaleString()}+`
    if (max) return `Up to ${currency || "Rs"} ${max.toLocaleString()}`
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

  const getStatusColor = (deadline) => {
    if (!deadline) return "bg-green-100 text-green-800 border-green-200"

    const now = new Date()
    const deadlineDate = new Date(deadline)
    const daysLeft = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24))

    if (daysLeft < 0) return "bg-red-100 text-red-800 border-red-200"
    if (daysLeft <= 7) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-green-100 text-green-800 border-green-200"
  }

  const getStatusText = (deadline) => {
    if (!deadline) return "Active"

    const now = new Date()
    const deadlineDate = new Date(deadline)
    const daysLeft = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24))

    if (daysLeft < 0) return "Expired"
    if (daysLeft === 0) return "Expires Today"
    if (daysLeft <= 7) return `${daysLeft} days left`
    return "Active"
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Job Posts</h1>
          <p className="text-gray-600">View and manage all your job postings</p>
        </div>

        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job._id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{job.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="line-clamp-1">{job.location || "Location not specified"}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge className={`px-3 py-1 text-xs font-medium border ${getJobTypeColor(job.jobType)}`}>
                        {job.jobType}
                      </Badge>
                      <Badge className={`px-3 py-1 text-xs font-medium border ${getStatusColor(job.deadline)}`}>
                        {getStatusText(job.deadline)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">{job.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Briefcase className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Experience</p>
                        <p className="font-medium text-gray-900">{job.experienceLevel || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Salary</p>
                        <p className="font-medium text-gray-900">{formatSalary(job.salary)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Deadline</p>
                        <p className="font-medium text-gray-900">
                          {job.deadline ? new Date(job.deadline).toLocaleDateString("en-GB") : "Open"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/job/edit-jobs/${job._id}`)}
                      className="flex items-center gap-2 flex-1 hover:bg-blue-50 hover:border-blue-200"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Job
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(job._id)}
                      className="flex items-center gap-2 flex-1 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No job posts yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't created any job postings yet. Start by posting your first job!
            </p>
            <Button onClick={() => router.push("/employers/jobs-post")} className="bg-blue-600 hover:bg-blue-700">
              Post Your First Job
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageJobs
