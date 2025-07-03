"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import { Briefcase, MapPin, DollarSign, Calendar, Users, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const jobValidationSchema = Yup.object().shape({
  title: Yup.string().required("Job title is required").min(3).max(100),
  description: Yup.string().required("Description is required").min(50),
  location: Yup.string().required("Location is required"),
  jobType: Yup.string()
    .required("Job type is required")
    .oneOf(["Full-time", "Part-time", "Internship", "Contract", "Remote"]),
  salary: Yup.object().shape({
    min: Yup.number().nullable().positive(),
    max: Yup.number()
      .nullable()
      .positive()
      .when("min", (min, schema) => (min ? schema.min(min, "Maximum salary must be greater than minimum") : schema)),
    currency: Yup.string().default("Rs"),
  }),
  requirements: Yup.array().of(Yup.string().min(1)).min(1, "At least one requirement is needed"),
  responsibilities: Yup.array().of(Yup.string().min(1)).min(1, "At least one responsibility is needed"),
  skills: Yup.array().of(Yup.string().min(1)).min(1, "At least one skill is needed"),
  experienceLevel: Yup.string().required("Experience level is required").oneOf(["Entry", "Mid", "Senior"]),
  deadline: Yup.date().min(new Date(), "Deadline must be in the future").nullable(),
})

const EditJob = () => {
  const { id } = useParams()
  const router = useRouter()
  const [initialValues, setInitialValues] = useState(null)
  const [loading, setLoading] = useState(true)
  const { _id: userId } = useSelector((state) => state.user)
  const { _id: companyId } = useSelector((state) => state.company)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`)
        setInitialValues({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          jobType: data.jobType || "Full-time",
          salary: {
            min: data.salary?.min || "",
            max: data.salary?.max || "",
            currency: data.salary?.currency || "Rs",
          },
          requirements: data.requirements?.length ? data.requirements : [""],
          responsibilities: data.responsibilities?.length ? data.responsibilities : [""],
          skills: data.skills?.length ? data.skills : [""],
          experienceLevel: data.experienceLevel || "Entry",
          deadline: data.deadline ? data.deadline.split("T")[0] : "",
        })
      } catch (error) {
        toast.error("Failed to fetch job details")
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchJob()
  }, [id, router])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        ...values,
        postedBy: userId,
        company: companyId,
      }

      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, payload)
      toast.success("Job updated successfully")
      router.push("/employers/jobs-manage")
    } catch (error) {
      toast.error("Failed to update job. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || !initialValues) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading job details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Job</h1>
          <p className="text-lg text-gray-600">Update your existing job listing</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Briefcase className="h-6 w-6" />
              Job Details
            </CardTitle>
            <CardDescription>Edit job listing details below</CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={jobValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Job Title
                    </Label>
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Job Description
                    </Label>
                    <Field
                      as={Textarea}
                      id="description"
                      name="description"
                      placeholder="Describe the role, company culture, and what makes this opportunity unique..."
                      rows={6}
                      className="w-full"
                    />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </Label>
                      <Field
                        as={Input}
                        id="location"
                        name="location"
                        placeholder="e.g. New York, NY or Remote"
                        className="w-full"
                      />
                      <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobType" className="text-sm font-medium">
                        Job Type
                      </Label>
                      <Select value={values.jobType} onValueChange={(value) => setFieldValue("jobType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage name="jobType" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="experienceLevel" className="text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Experience Level
                      </Label>
                      <Select
                        value={values.experienceLevel}
                        onValueChange={(value) => setFieldValue("experienceLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry">Entry Level</SelectItem>
                          <SelectItem value="Mid">Mid Level</SelectItem>
                          <SelectItem value="Senior">Senior Level</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage name="experienceLevel" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline" className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Application Deadline
                      </Label>
                      <Field as={Input} id="deadline" name="deadline" type="date" className="w-full" />
                      <ErrorMessage name="deadline" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Salary Range (Optional)
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salary.min" className="text-xs text-gray-600">
                          Minimum
                        </Label>
                        <Field
                          as={Input}
                          id="salary.min"
                          name="salary.min"
                          type="number"
                          placeholder="50000"
                          className="w-full"
                        />
                        <ErrorMessage name="salary.min" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary.max" className="text-xs text-gray-600">
                          Maximum
                        </Label>
                        <Field
                          as={Input}
                          id="salary.max"
                          name="salary.max"
                          type="number"
                          placeholder="80000"
                          className="w-full"
                        />
                        <ErrorMessage name="salary.max" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary.currency" className="text-xs text-gray-600">
                          Currency
                        </Label>
                        <Select
                          value={values.salary.currency}
                          onValueChange={(value) => setFieldValue("salary.currency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Rs">Rs (Rupees)</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Requirements</Label>
                    <FieldArray name="requirements">
                      {({ push, remove }) => (
                        <div className="space-y-3">
                          {values.requirements.map((requirement, index) => (
                            <div key={index} className="flex gap-2">
                              <Field
                                as={Input}
                                name={`requirements.${index}`}
                                placeholder="e.g. Bachelor's degree in Computer Science"
                                className="flex-1"
                              />
                              {values.requirements.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => remove(index)}
                                  className="shrink-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button type="button" variant="outline" onClick={() => push("")} className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Requirement
                          </Button>
                          <ErrorMessage name="requirements" component="div" className="text-red-500 text-sm" />
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Responsibilities</Label>
                    <FieldArray name="responsibilities">
                      {({ push, remove }) => (
                        <div className="space-y-3">
                          {values.responsibilities.map((responsibility, index) => (
                            <div key={index} className="flex gap-2">
                              <Field
                                as={Input}
                                name={`responsibilities.${index}`}
                                placeholder="e.g. Develop and maintain web applications"
                                className="flex-1"
                              />
                              {values.responsibilities.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => remove(index)}
                                  className="shrink-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button type="button" variant="outline" onClick={() => push("")} className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Responsibility
                          </Button>
                          <ErrorMessage name="responsibilities" component="div" className="text-red-500 text-sm" />
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Required Skills</Label>
                    <FieldArray name="skills">
                      {({ push, remove }) => (
                        <div className="space-y-3">
                          {values.skills.map((skill, index) => (
                            <div key={index} className="flex gap-2">
                              <Field
                                as={Input}
                                name={`skills.${index}`}
                                placeholder="e.g. React, Node.js, TypeScript"
                                className="flex-1"
                              />
                              {values.skills.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => remove(index)}
                                  className="shrink-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button type="button" variant="outline" onClick={() => push("")} className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Skill
                          </Button>
                          <ErrorMessage name="skills" component="div" className="text-red-500 text-sm" />
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isSubmitting ? "Updating Job..." : "Update Job"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EditJob
