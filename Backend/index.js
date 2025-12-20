import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// FIX: Explicitly import process for ES Module compatibility
import process from 'process'; 

import recruitmentRoute from './routes/recruitment.js'

// Load environment variables immediately
dotenv.config();

const app = express();

//  MIDDLEWARE 
app.use(helmet()); 
app.use(morgan('dev')); 
app.use(express.json()); 

app.use(cors({
  // Use the env variable, fallback to localhost if missing
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  methods: ['POST', 'GET', 'PUT', 'DELETE'], // Added common methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Added Authorization just in case
}));

//  DATABASE CONNECTION 
// Added a check to ensure URI exists to prevent vague errors
if (!process.env.MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined in .env file");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB Connected Successfully'))
  .catch(err => console.error(' MongoDB Connection Error:', err));

//  ROUTES 
app.use('/api', recruitmentRoute);

//  START SERVER 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});