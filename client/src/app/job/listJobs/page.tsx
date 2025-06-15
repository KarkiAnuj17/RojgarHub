"use client"
import { useEffect, useState } from "react"
import JobCard from "@/components/jobCard"
import axios from "axios"

const JobListingDemo = () => {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/jobs")
        setJobs(response.data)
      } catch (err) {
        console.error("Failed to fetch jobs:", err)
        setError("Failed to load jobs.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const handleViewDetails = (jobId) => {
    setSelectedJob(jobId)
  }

  const handleBack = () => {
    setSelectedJob(null)
  }

  const currentJob = jobs.find((job) => job._id === selectedJob)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Available Positions</h1>
          <p className="text-lg text-gray-600">Find your next career opportunity</p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
  {jobs.map((job) => (
    <div key={job._id} className="px-2">
      <JobCard job={job} onViewDetails={handleViewDetails} />
    </div>
  ))}
</div>

      </div>
    </div>
  )
}

export default JobListingDemo
