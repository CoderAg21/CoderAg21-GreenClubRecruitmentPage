import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  registrationNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
  },
  collegeEmail: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  mobileNumber: { 
    type: String, 
    required: true,
    trim: true
  },
  department: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true 
  },
  question1: { type: String, required: true },
  question2: { type: String, required: true },
  question3: { type: String, required: true },
  
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;