import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company", 
    required: true
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'],
    default: 'Full-time'
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'Rs'
    }
  },
  requirements: [String],
  responsibilities: [String],
  skills: [String],
  experienceLevel: {
    type: String,
    enum: ['Entry', 'Mid', 'Senior'],
    default: 'Entry'
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deadline: {
    type: Date
  }
}, {
  timestamps: true
});

export const Jobs = mongoose.model('Jobs', jobSchema);
