'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Lock, Phone, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required').min(2),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
  role: Yup.string().oneOf(['Job Seeker', 'Recruiter'], 'Invalid role').required('Select a role'),
  gender: Yup.string().oneOf(['Male', 'Female'], 'Invalid gender').required('Select gender'),
  phoneNumber: Yup.string().matches(/^\d{10}$/, 'Must be 10 digits'),
  location: Yup.string()
});

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  gender: '',
  phoneNumber: '',
  location: ''
};

const SignupForm = () => {
  const router = useRouter()
 const handleSubmit = async (values) => {
  try {
    const { data } = await axios.post("http://localhost:8000/register", values);
    toast(data?.message || "Signup successful");
    router.push("/login");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Signup failed. Please try again.");
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
     <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2 pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join RojgarHub
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Create your account and start your career journey
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Field
                    as={Input}
                    id="fullName"
                    name="fullName"
                    placeholder="Enter full name"
                    className={`h-12 ${errors.fullName && touched.fullName ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Field
                      as={Input}
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="10-digit phone number"
                      className="h-12"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      Location
                    </Label>
                    <Field
                      as={Input}
                      id="location"
                      name="location"
                      placeholder="Enter your city"
                      className="h-12"
                    />
                    <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Gender *</Label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <Field type="radio" name="gender" value="Male" />
                      Male
                    </label>
                    <label className="flex items-center gap-2">
                      <Field type="radio" name="gender" value="Female" />
                      Female
                    </label>
                  </div>
                  <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">Role *</Label>
                  <Field
                    as="select"
                    name="role"
                    id="role"
                    className={`h-12 w-full border rounded px-3 py-2 ${errors.role && touched.role ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a role</option>
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="Recruiter">Employers</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    className={`h-12 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="w-4 h-4" />
                      Password *
                    </Label>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      className="h-12"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="w-4 h-4" />
                      Confirm Password *
                    </Label>
                    <Field
                      as={Input}
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      className="h-12"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : 'Create Account'}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in here
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
