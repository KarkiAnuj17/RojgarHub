import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock, Calendar } from "lucide-react";

const JobCard = ({ job, onViewDetails }) => {
  const formatSalary = () => {
    const { min, max, currency } = job.salary || {};
    if (min && max) {
      return `${currency || 'Rs'} ${min.toLocaleString()} - ${max.toLocaleString()}`;
    } else if (min) {
      return `${currency || 'Rs'} ${min.toLocaleString()}+`;
    } else if (max) {
      return `Up to ${currency || 'Rs'} ${max.toLocaleString()}`;
    }
    return "Negotiable";
  };

  const getJobTypeColor = (type) => {
    const colors = {
      "Full-time": "bg-blue-500 text-white",
      "Part-time": "bg-green-500 text-white",
      Contract: "bg-purple-500 text-white",
      Internship: "bg-teal-500 text-white",
      Remote: "bg-indigo-500 text-white",
    };
    return colors[type] || "bg-gray-500 text-white";
  };

  const getCompanyInitials = (name) => {
    if (!name) return "CO";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 flex-1 pr-2">{job.title}</h3>
          <Badge className={`px-3 py-1 text-xs font-medium rounded-full ${getJobTypeColor(job.jobType)}`}>
            {job.jobType?.toUpperCase()}
          </Badge>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {getCompanyInitials(job.company?.companyName || job.postedBy?.name)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-gray-600 font-medium mb-1 line-clamp-1">
              {job.company?.companyName || job.postedBy?.name || "Company"}
            </p>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{job.company?.companyAddress || job.location}</span>
            </div>
            {job.company?.companyWebsite && (
              <a
                href={job.company.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-xs hover:underline"
              >
                {job.company.companyWebsite}
              </a>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {job.company?.companyDescription && (
          <p className="text-gray-500 text-xs italic mb-2 line-clamp-2">
            {job.company.companyDescription}
          </p>
        )}

        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">{job.description}</p>

        <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-3 w-3 text-gray-500" />
            </div>
            <p className="font-semibold text-gray-900">EXPERIENCE:</p>
            <p className="text-gray-600">{job.experienceLevel?.toUpperCase()}</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="h-3 w-3 text-gray-500" />
            </div>
            <p className="font-semibold text-gray-900">SALARY:</p>
            <p className="text-gray-600">{formatSalary()}</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-3 w-3 text-gray-500" />
            </div>
            <p className="font-semibold text-gray-900">DEADLINE:</p>
            <p className="text-gray-600">
              {job.deadline ? new Date(job.deadline).toLocaleDateString("en-GB") : "Open"}
            </p>
          </div>
        </div>

        <Button
          onClick={() => onViewDetails(job._id)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 text-sm cursor-pointer"
        >
          VIEW MORE & APPLY
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
