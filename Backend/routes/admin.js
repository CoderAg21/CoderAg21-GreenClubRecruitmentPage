import express from 'express';
import jwt from 'jsonwebtoken';
import Candidate from '../models/Candidate.js';
import dotenv from 'dotenv';
dotenv.config();
import process from 'process';
const router = express.Router();

//  MIDDLEWARE 
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized.' });
    req.userId = decoded.id;
    next();
  });
};

//  LOGIN 
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return res.status(200).json({ auth: true, token });
  }
  return res.status(401).json({ auth: false, message: 'Invalid Credentials' });
});

//  GET ALL CANDIDATES 
router.get('/candidates', verifyToken, async (req, res) => {
  try {
    // Sort by newest first (-1)
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});

//  UPDATE STATUS  
router.patch('/candidate/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body; 

   // Ensure status is one of the allowed values in your Schema
    const allowedStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Allowed: ${allowedStatuses.join(', ')}` });
    }

    // 2. Update in Database
    const updated = await Candidate.findByIdAndUpdate(
        req.params.id, 
        { status: status }, 
        { new: true } // Return the updated document
    );

    if (!updated) {
        return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

//  DELETE CANDIDATE 
router.delete('/candidate/:id', verifyToken, async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

//  DASHBOARD STATS 
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const total = await Candidate.countDocuments();
    const reviewed = await Candidate.countDocuments({ status: 'reviewed' });
    const pending = total - reviewed;
    res.status(200).json({ total, reviewed, pending });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

export default router;