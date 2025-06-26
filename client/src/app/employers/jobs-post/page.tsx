'use client'
import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, MapPin, DollarSign, Calendar, Users, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';

const jobValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters')
    .max(100, 'Job title must be less than 100 characters'),

  description: Yup.string()
    .required('Job description is required')
    .min(50, 'Job description must be at least 50 characters'),

  location: Yup.string().required('Location is required'),

  jobType: Yup.string()
    .required('Job type is required')
    .oneOf(['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote']),

  salary: Yup.object().shape({
    min: Yup.number()
      .positive('Minimum salary must be positive')
      .nullable(),
    max: Yup.number()
      .positive('Maximum salary must be positive')
      .when('min', (min, schema) =>
        min ? schema.min(min, 'Maximum salary must be greater than minimum salary') : schema
      )
      .nullable(),
    currency: Yup.string().default('Rs')
  }),

  requirements: Yup.array()
    .of(Yup.string().min(1, 'Requirement cannot be empty'))
    .min(1, 'At least one requirement is needed'),

  responsibilities: Yup.array()
    .of(Yup.string().min(1, 'Responsibility cannot be empty'))
    .min(1, 'At least one responsibility is needed'),

  skills: Yup.array()
    .of(Yup.string().min(1, 'Skill cannot be empty'))
    .min(1, 'At least one skill is needed'),

  experienceLevel: Yup.string()
    .required('Experience level is required')
    .oneOf(['Entry', 'Mid', 'Senior']),

  deadline: Yup.date()
    .min(new Date(), 'Deadline must be in the future')
    .nullable()
});

const PostJob = () => {
  const { _id: companyId ,isApproved } = useSelector(state => state.company);
  const { _id: userId  } = useSelector(state => state.user);

  const initialValues = {
    title: '',
    description: '',
    location: '',
    jobType: 'Full-time',
    salary: {
      min: '',
      max: '',
      currency: 'Rs'
    },
    requirements: [''],
    responsibilities: [''],
    skills: [''],
    experienceLevel: 'Entry',
    deadline: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        ...values,
        postedBy: userId,
        company: companyId,
      };

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, payload);
      toast(data.message);
      resetForm();
    } catch (error) {
      toast.error("Failed to post job. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
if (!isApproved) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="max-w-xl w-full shadow-xl border-0 p-8 text-center">
        <CardTitle className="text-2xl text-gray-800 mb-4">Account Not Approved</CardTitle>
        <CardDescription className="text-gray-600">
          Your company account is not approved yet. Please wait until an administrator approves your account to post job listings.
        </CardDescription>
      </Card>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-lg text-gray-600">Find the perfect candidate for your team</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Briefcase className="h-6 w-6" />
              Job Details
            </CardTitle>
            <CardDescription>
              Fill in the details below to post your job opening
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={jobValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      Job Title 
                    </Label>
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      placeholder="e.g. Senior Frontend Developer"
                      className="text-lg py-3"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-lg font-semibold">
                      Job Description 
                    </Label>
                    <Field
                      as={Textarea}
                      id="description"
                      name="description"
                      placeholder="Describe the role..."
                      rows={6}
                      className="resize-none"
                    />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        Location 
                      </Label>
                      <Field
                        as={Input}
                        id="location"
                        name="location"
                        placeholder="e.g. Kathmandu, Remote"
                      />
                      <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type *</Label>
                      <Field name="jobType">
                        {({ field }) => (
                          <Select value={field.value} onValueChange={(value) => setFieldValue('jobType', value)}>
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
                        )}
                      </Field>
                      <ErrorMessage name="jobType" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experienceLevel">Experience Level *</Label>
                      <Field name="experienceLevel">
                        {({ field }) => (
                          <Select value={field.value} onValueChange={(value) => setFieldValue('experienceLevel', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Entry">Entry Level</SelectItem>
                              <SelectItem value="Mid">Mid Level</SelectItem>
                              <SelectItem value="Senior">Senior Level</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage name="experienceLevel" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Salary Information
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salary.min">Minimum Salary</Label>
                        <Field
                          as={Input}
                          id="salary.min"
                          name="salary.min"
                          type="number"
                          placeholder="50000"
                        />
                        <ErrorMessage name="salary.min" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary.max">Maximum Salary</Label>
                        <Field
                          as={Input}
                          id="salary.max"
                          name="salary.max"
                          type="number"
                          placeholder="80000"
                        />
                        <ErrorMessage name="salary.max" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary.currency">Currency</Label>
                        <Field
                          as={Input}
                          id="salary.currency"
                          name="salary.currency"
                          placeholder="Rs"
                        />
                      </div>
                    </div>
                  </div>

                  {[
                    { name: 'requirements', title: 'Requirements', icon: Users, color: 'purple' },
                    { name: 'responsibilities', title: 'Responsibilities', icon: Briefcase, color: 'blue' },
                    { name: 'skills', title: 'Required Skills', icon: Users, color: 'orange' }
                  ].map(({ name, title, icon: Icon, color }) => (
                    <div key={name} className={`bg-${color}-50 rounded-lg p-6 space-y-4`}>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Icon className={`h-5 w-5 text-${color}-600`} />
                        {title} *
                      </h3>

                      <FieldArray name={name}>
                        {({ push, remove }) => (
                          <div className="space-y-3">
                            {values[name].map((item, index) => (
                              <div key={index} className="flex gap-2">
                                <Field
                                  as={Input}
                                  name={`${name}.${index}`}
                                  placeholder={`Enter ${title.toLowerCase().slice(0, -1)}`}
                                  className="flex-1"
                                />
                                {values[name].length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => push('')}
                              className="flex items-center gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Add {title.slice(0, -1)}
                            </Button>
                            <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  ))}

                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Application Deadline
                    </Label>
                    <Field
                      as={Input}
                      id="deadline"
                      name="deadline"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <ErrorMessage name="deadline" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Submit */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      {isSubmitting ? 'Posting Job...' : 'Post Job'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;
