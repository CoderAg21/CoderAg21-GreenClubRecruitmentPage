import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import process from 'process'; 

import recruitmentRoute from './routes/recruitment.js'
import adminRoute from './routes/admin.js';
dotenv.config();

const app = express(); 
app.use(helmet()); 
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

if (!process.env.MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined in .env file");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB Connected Successfully'))
  .catch(err => console.error(' MongoDB Connection Error:', err));

//  ROUTES 
app.use('/api', recruitmentRoute);
app.use('/api/admin', adminRoute);

//  START SERVER 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});