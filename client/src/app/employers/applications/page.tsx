'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useParams } from 'next/navigation'

const Application = () => {
  const [applications, setApplications] = useState([])
   const params = useParams();
  const jobId = params?.jobId;
  const fetchApplication = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/applications/${jobId}`);
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications', error);
    }
  };

  useEffect(() => {
    if(jobId){
    fetchApplication()
    }
  }, [jobId])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'shortlisted':
        return 'bg-blue-100 text-blue-800'
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return ''
    }
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Job Applications</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.jobId?.title || 'N/A'}</TableCell>
                  <TableCell>{item.jobSeekerId?.fullName || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Application
