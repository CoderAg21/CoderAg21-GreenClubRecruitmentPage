import express from 'express';
import { body, validationResult } from 'express-validator';
import Candidate from '../models/Candidate.js'; 

const router = express.Router();

// Validation Rules
const validateApplication = [
  body('fullName').notEmpty().trim().escape(),
  body('collegeEmail').isEmail().normalizeEmail(),
  body('registrationNumber').notEmpty().trim().escape(),
  body('mobileNumber').isMobilePhone().withMessage('Invalid mobile number'),
  body('department').notEmpty(),
  body('role').notEmpty(),
  body('question1').notEmpty().trim().escape(),
  body('question2').notEmpty().trim().escape(),
  body('question3').notEmpty().trim().escape(),
];

// POST /api/register
router.post('/register', validateApplication, async (req, res) => {
  const errors = validationResult(req);
  console.log('Received Application:', req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { 
      fullName, registrationNumber, collegeEmail, mobileNumber, 
      department, role, question1, question2, question3 
    } = req.body;
    // Check duplicate
    const existingCandidate = await Candidate.findOne({ 
      $or: [{ registrationNumber }, { collegeEmail }] 
    });

    if (existingCandidate) {
      return res.status(409).json({ 
        success: false, 
        message: 'Application with this Email or ID already exists.' 
      });
    }

    const newCandidate = new Candidate({
      fullName, registrationNumber, collegeEmail, mobileNumber,
      department, role, question1, question2, question3
    });

    await newCandidate.save();

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully!' 
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error' 
    });
  }
});

export default router;