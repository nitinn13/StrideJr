import express from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use('/auth', authRoutes)

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.status(200).json({ status: 'ok' })
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Database connection failed' })
}
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
