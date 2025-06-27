import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    jobSeekerId: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
   
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected", "accepted"],
      default: "pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    isApplied:{
      type:Boolean,
      default:false,
    }
  },
  { timestamps: true }
);
export const Application = mongoose.model('Application', applicationSchema);

