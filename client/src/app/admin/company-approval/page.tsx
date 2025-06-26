'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Mail, Phone, MapPin, UserCircle, Building2, Globe } from "lucide-react";

const CompanyApprovalCard = () => {
  const [companies, setCompanies] = useState({ approved: [], unapproved: [] });
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company`);
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleApproval = async (id) => {
    try {
      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/company/${id}`);
      if (data) fetchCompanies();
    } catch (error) {
      console.error('Error approving company:', error);
    }
  };
    const handleReject= async (id) => {
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Company Approval Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review and manage company registrations with streamlined approval workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Approval</p>
                <p className="text-3xl font-bold text-orange-600">{companies.unapproved.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Approved Companies</p>
                <p className="text-3xl font-bold text-green-600">{companies.approved.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <XCircle className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Pending Approval</h2>
            {companies.unapproved.length > 0 && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                {companies.unapproved.length} companies
              </Badge>
            )}
          </div>

          {companies.unapproved.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {companies.unapproved.map((item) => (
                <Card
                  key={item._id}
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400"></div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {item.companyName}
                        </h3>
                        <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
                          <XCircle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="truncate">{item.companyEmail}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <span>{item.companyPhone}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="truncate">{item.companyAddress}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                          <Globe className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="truncate">{item.companyWebsite}</span>
                      </div>
                    </div>

                    {item.createdBy && (
                      <div className="bg-gray-50 rounded-xl p-3 mb-6">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <UserCircle className="w-4 h-4" />
                          <span>Created by:</span>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mt-1">
                          {item.createdBy.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{item.createdBy.email}</p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleApproval(item._id)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleReject(item._id)}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-500">No companies are pending approval at the moment.</p>
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Approved Companies</h2>
            {companies.approved.length > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                {companies.approved.length} companies
              </Badge>
            )}
          </div>

          {companies.approved.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {companies.approved.map((item) => (
                <Card
                  key={item._id}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-green-50 border border-green-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400"></div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {item.companyName}
                        </h3>
                        <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approved
                        </Badge>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-green-600" />
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="truncate">{item.companyEmail}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <span>{item.companyPhone}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="truncate">{item.companyAddress}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                          <Globe className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="truncate">{item.companyWebsite}</span>
                      </div>
                    </div>

                    {item.createdBy && (
                      <div className="bg-white/70 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <UserCircle className="w-4 h-4" />
                          <span>Created by:</span>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mt-1">
                          {item.createdBy.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{item.createdBy.email}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No approved companies yet</h3>
              <p className="text-gray-500">Companies will appear here once they're approved.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CompanyApprovalCard;