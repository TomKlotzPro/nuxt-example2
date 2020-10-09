import { Router } from 'express'
import todoRouter from './todo.route.js' // after the import from express

const router = Router()

router.use('/', todoRouter)

export default router
