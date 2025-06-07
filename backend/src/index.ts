import express from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import superadminRoutes from './routes/superadmin.routes'
import { authenticateToken } from './middleware/auth.middleware'
import adminRoutes from './routes/admin.routes'
import teacherRoutes from './routes/teacher.routes';



dotenv.config()

const app = express()
const prisma = new PrismaClient()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Public Routes
app.use('/auth', authRoutes)

// Protected Routes
app.use('/superadmin', authenticateToken, superadminRoutes)
app.use('/admin', authenticateToken, adminRoutes)
app.use('/teacher', authenticateToken, teacherRoutes)

// Health Check
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
