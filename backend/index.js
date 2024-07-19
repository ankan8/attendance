import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js'; // Ensure the extension is included

dotenv.config();

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
app.get('/getUsers',(req,res)=>{
  UserModel.find()
  .then((users)=>res.json(users)).catch(err=>res.json(err))
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});