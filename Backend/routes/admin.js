import express from 'express';
import jwt from 'jsonwebtoken';
import Candidate from '../models/Recruitment.js'; 
import dotenv from 'dotenv';
dotenv.config();
import process from 'process';

const router = express.Router();

//  MIDDLEWARE: PROTECT ROUTES 
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized.' });
    req.userId = decoded.id;
    next();
  });
};

//  ROUTE: ADMIN LOGIN 
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check against ENV variables
  if (
    username === process.env.ADMIN_USERNAME && 
    password === process.env.ADMIN_PASSWORD
  ) {
    // Generate Token
    const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.status(200).json({ auth: true, token });
  }

  return res.status(401).json({ auth: false, message: 'Invalid Credentials' });
});

//  ROUTE: DASHBOARD STATS 
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const totalCandidates = await Candidate.countDocuments();
    // You can add more stats here later (e.g., accepted, pending counts)
    res.status(200).json({ total: totalCandidates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

export default router;