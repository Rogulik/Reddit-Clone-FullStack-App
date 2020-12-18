import { createConnection } from 'typeorm';

import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import trim from './middleware/trim';

dotenv.config()
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())

app.get('/',(_,res) => {
   return res.send('hello world')
})
app.use('/api/auth',authRoutes)

app.listen(5000, async () => {
    console.log('server is running')

    try {
        await createConnection()
        console.log('database connected')
    } catch (error) {
        console.log(error)
    }
})