import mongoose, { Schema } from "mongoose";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
   },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);