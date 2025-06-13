import { Router } from 'express'
import { register, login, profile } from '../controllers/auth.controller'
import validate from '../middleware/validation.middleware'
import { registerSchema, loginSchema } from '../schemas/auth.schema'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login',    validate(loginSchema),    login)
router.get("/profile", profile)

export default router
