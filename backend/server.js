import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import dns from 'dns'
import authRoutes from './routes/authRoutes.js'
import wordRoutes from './routes/wordRoutes.js'
import userRoutes from './routes/userRoutes.js'
import auditLogRoutes from './routes/auditLogRoutes.js'
import reportRoutes from './routes/reportRoutes.js'

dns.setServers(['8.8.8.8'])

const app = express()
const port = process.env.PORT


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Dictionary Management System')
})

app.use('/api/auth', authRoutes)
app.use('/api/words', wordRoutes)
app.use('/api/users', userRoutes)
app.use('/api/audit-logs', auditLogRoutes)
app.use('/api/reports', reportRoutes)

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