"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Building2, Mail, Phone, MapPin, Globe, FileText } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"

const companyValidationSchema = Yup.object({
  name: Yup.string().required("Company name is required").trim().min(2, "Company name must be at least 2 characters"),
  industry: Yup.string().required("Industry is required"),
  email: Yup.string().email("Invalid email format").required("Email is required").lowercase(),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[+]?[1-9][\d]{0,15}$/, "Invalid phone number format"),
  address: Yup.string().required("Address is required").min(10, "Address must be at least 10 characters"),
  website: Yup.string().url("Invalid website URL").nullable(),
  description: Yup.string().max(1000, "Description cannot exceed 1000 characters").nullable(),
})

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Construction",
  "Transportation",
  "Energy",
  "Agriculture",
  "Entertainment",
  "Real Estate",
  "Consulting",
  "Other",
]

export default function CompanyRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialValues = {
    name: "",
    industry: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    description: "",
  }

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    setIsSubmitting(true)
    setStatus(null)
     try {
     const { data } = await axios.post('http://localhost:8000/company',values)
    toast(data?.message);
    resetForm()
    } catch (error) {
        toast.error( "Failed to register company. Please try again.");
    } finally {
      setIsSubmitting(false)
      setSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          Company Registration
        </CardTitle>
        <CardDescription className="text-gray-600">
          Register your company to get started with our platform
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Formik initialValues={initialValues} validationSchema={companyValidationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue, status }) => (
            <Form className="space-y-6">
              {status && (
                <div
                  className={`p-4 rounded-md ${
                    status.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company Name 
                </Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  placeholder="Enter company name"
                  className={errors.name && touched.name ? "border-red-500" : ""}
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry </Label>
                <Select value={values.industry} onValueChange={(value) => setFieldValue("industry", value)}>
                  <SelectTrigger className={errors.industry && touched.industry ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage name="industry" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address 
                </Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="company@example.com"
                  className={errors.email && touched.email ? "border-red-500" : ""}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number 
                </Label>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone && touched.phone ? "border-red-500" : ""}
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Field
                  as={Textarea}
                  id="address"
                  name="address"
                  placeholder="Enter complete address"
                  className={`min-h-[80px] ${errors.address && touched.address ? "border-red-500" : ""}`}
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Field
                  as={Input}
                  id="website"
                  name="website"
                  placeholder="https://www.company.com"
                  className={errors.website && touched.website ? "border-red-500" : ""}
                />
                <ErrorMessage name="website" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Company Description (Optional)
                </Label>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder="Brief description of your company (max 1000 characters)"
                  className={`min-h-[100px] ${errors.description && touched.description ? "border-red-500" : ""}`}
                />
                <div className="flex justify-between items-center">
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                  <span className="text-sm text-gray-500">{values.description.length}/1000</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
              >
                {isSubmitting ? "Registering..." : "Register Company"}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}
