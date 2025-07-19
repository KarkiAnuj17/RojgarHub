'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import axios from 'axios';

const categoryValidationSchema = Yup.object().shape({
  categoryName: Yup.string()
    .required('Category name is required')
    .min(3, 'Minimum 3 characters')
    .max(100, 'Maximum 100 characters'),
  categoryDescription: Yup.string().max(500, 'Max 500 characters'),
  isActive: Yup.boolean(),
  image: Yup.mixed().nullable(),
});

const AddCategories = () => {
  const initialValues = {
    categoryName: '',
    categoryDescription: '',
    image: null,
    isActive: false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('categoryName', values.categoryName);
      formData.append('categoryDescription', values.categoryDescription);
      formData.append('isActive', values.isActive);
      if (values.image) {
        formData.append('categoryImage', values.image);
      }

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(data.message || 'Category created successfully!');
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create category.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Add New Category</CardTitle>
            <CardDescription>Fill out the form to add a job category.</CardDescription>
          </CardHeader>

          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={categoryValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="categoryName">Category Name *</Label>
                    <Field
                      as={Input}
                      id="categoryName"
                      name="categoryName"
                      placeholder="e.g. Engineering, Marketing"
                    />
                    <ErrorMessage name="categoryName" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoryDescription">Description</Label>
                    <Field
                      as={Textarea}
                      id="categoryDescription"
                      name="categoryDescription"
                      placeholder="Write a short description..."
                      rows={4}
                      className="resize-none"
                    />
                    <ErrorMessage name="categoryDescription" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Category Image</Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="flex items-center gap-4">
                    <Switch
                      id="isActive"
                      checked={values.isActive}
                      onCheckedChange={(checked) => setFieldValue('isActive', checked)}
                    />
                    <Label htmlFor="isActive">Is Active?</Label>
                  </div>

                  <div>
                    <Button type="submit" disabled={isSubmitting} className="w-full py-3 text-lg">
                      {isSubmitting ? 'Submitting...' : 'Create Category'}
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

export default AddCategories;
