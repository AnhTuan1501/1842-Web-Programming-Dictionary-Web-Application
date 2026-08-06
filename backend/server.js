import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Book Management System')
})

app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        console.log('Connect to MongoDB...')

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}...`)
        })
    } catch (error) {
        console.error('Cannot connect to MongoDB:', error.message)
        process.exit()
    }
}

startServer()