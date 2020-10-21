import express from 'express'
import session from 'express-session'
import logger from 'morgan'
import apiRouter from './routes/routes.js'
import config from './server.config.js'
import postgresStore from './postgres-store.js'
import featureFlags from './featureFlags.js'

if (featureFlags.STORAGE === 'POSTGRE') {
    postgresStore.init(config.postgres).then(()=>{
        console.log('Postgres Init')
    })
}

const app = express()

app.use(logger('dev'))
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/', apiRouter)

export default app