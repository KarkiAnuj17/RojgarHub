'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

const CompanyApprovalCard = () => {
  const [companies, setCompanies] = useState({ approved: [], unapproved: [] });

  const fetchCompanies = async () => {
    const { data } = await axios.get('http://localhost:8000/company');
    setCompanies(data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleApproval = async (id) => {
    const { data } = await axios.patch('http://localhost:8000/company/' + id);
    if (data) fetchCompanies();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Company Approval Panel</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-red-600 mb-2">Pending Approval</h3>
        {companies.unapproved.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.unapproved.map((item) => (
              <Card key={item._id} className="p-4 shadow-md hover:shadow-lg transition rounded-2xl border border-gray-200">
                <div className="space-y-1">
                  <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.email}</p>
                  <p className="text-sm text-gray-600">{item.phoneNumber}</p>
                  <p className="text-sm text-gray-600">{item.location}</p>
                  <Badge variant="destructive" className="mt-2">Not Approved</Badge>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleApproval(item._id)} size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-100">
                    <XCircle className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No pending companies to approve.</p>
        )}
      </section>

      {/* Approved Companies */}
      <section>
        <h3 className="text-xl font-semibold text-green-700 mb-2">Approved Companies</h3>
        {companies.approved.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.approved.map((item) => (
              <Card key={item._id} className="p-4 shadow-md rounded-2xl border border-gray-200 bg-green-50">
                <div className="space-y-1">
                  <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.email}</p>
                  <p className="text-sm text-gray-600">{item.phoneNumber}</p>
                  <p className="text-sm text-gray-600">{item.location}</p>
                  <Badge variant="success" className="mt-2">Approved</Badge>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No companies have been approved yet.</p>
        )}
      </section>
    </div>
  );
};

export default CompanyApprovalCard;
