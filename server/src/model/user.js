import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['Job Seeker', 'Employers'],
    default: 'Job Seeker'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: false
  },
  phoneNumber: {
    type: String,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
    required: false
  },
  location: {
    type: String,
    trim: true,
    required: false
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);
