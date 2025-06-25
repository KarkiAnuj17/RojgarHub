'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  ExternalLink,
} from 'lucide-react'

const CompanyDetails = () => {
  const {
    companyName,
    industry,
    companyEmail,
    companyPhone,
    companyAddress,
    companyWebsite,
    companyDescription,
    isApproved,
  } = useSelector((state) => state.company)

  if (!companyName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="p-8 text-center shadow-lg">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Company Data Found</h2>
          <p className="text-gray-500">Please check back later or contact support.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{companyName}</h1>
                <p className="text-blue-100 text-lg">{industry}</p>
              </div>
            </div>
            <Badge
              variant={isApproved ? 'default' : 'destructive'}
              className={`px-4 py-2 text-sm font-medium ${
                isApproved
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {isApproved ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" /> Approved
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 mr-1" /> Pending Review
                </>
              )}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                  About Company
                </h2>
                <p className="text-gray-700 leading-relaxed text-base">
                  {companyDescription ||
                    'A forward-thinking company dedicated to innovation and excellence in the industry.'}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Company Overview
                </h2>

                <div className="flex items-center text-gray-700 text-base">
                  <Mail className="h-4 w-4 mr-2 text-blue-500" />
                  {companyEmail}
                </div>

                <div className="flex items-center text-gray-700 text-base">
                  <Phone className="h-4 w-4 mr-2 text-blue-500" />
                  {companyPhone}
                </div>

                <div className="flex items-center text-gray-700 text-base">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  {companyAddress}
                </div>

                <div className="flex items-center text-gray-700 text-base">
                  <Globe className="h-4 w-4 mr-2 text-blue-500" />
                  <a
                    href={companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-700 flex items-center"
                  >
                    {companyWebsite}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Additional Info
                </h2>
                <p className="text-gray-600 text-sm">
                  You can use this space to show other details like employee size, founded year, CEO, etc.
                </p>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Edit Company Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetails
