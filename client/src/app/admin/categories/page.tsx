'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus } from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-1">View all job categories here.</p>
          </div>
          <Link href="/admin/categories/add-category">
            <Button className="flex gap-2">
              <Plus className="h-5 w-5" />
              Add Category
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-600">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category._id} className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{category.categoryName}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {category.categoryDescription || 'No description provided.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  {category.icon && (
                    <img src={category.icon} alt="icon" className="h-10 w-10 object-contain" />
                  )}
                  <Badge variant={category.isActive ? 'default' : 'secondary'}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
