import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import connectDB from './dbconfig/db.config.js';
import cors from 'cors';
import projectRouter from './routes/project.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(cors({
  origin: 'https://codepen-frontend-sigma.vercel.app',
  // origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', projectRouter)

app.get('/', (req, res) => {
  return res.send('<h1>welcome to my server</h1>')
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page Not Found'
  })
})

app.listen(PORT, () => {
  console.log('Server is live at port', PORT);
})

