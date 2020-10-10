/* eslint-disable no-unused-expressions */
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { expect } from 'chai'
import request from 'supertest'
import express from 'express'
import session from 'express-session'
import apiRouter from '../../../routes/routes.js'
const writeFile = promisify(fs.writeFile)
const todosFile = path.join(__dirname, '../../../data/todos.json')

/**
 * We recreate the express app with our apiRouter to isolate any unwanted middleware
 * Then, we can use a session secret that doesn't need the real server configuration
 */
function createExpress() {
    const app = express()
    app.use(session({
        secret: 'whatever',
        resave: false,
        saveUninitialized: false
    }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use('/api/', apiRouter)

    const agent = request.agent(app)
    return agent
}

async function resetJSON() {
    const content = [
        {
            id: 1,
            description: 'Do the exercise 1',
            finished: true
        },
        {
            id: 2,
            description: 'Do the exercise 2',
            finished: true
        }
    ]
    await writeFile(todosFile, JSON.stringify(content))
}

describe('POST /api/todo/', () => {
    beforeEach(() => resetJSON())
    const newVals = {
        description: 'new desc',
        finished: false
    }
    const emptyVals = {
        description: '',
        finished: false
    }

    it('should add a new todo', () => {
        const agent = createExpress()
        return agent
            .post('/api/todo/')
            .send(newVals)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body)
                    .to.be.an('object')
                expect(response.body.description).to.equal(newVals.description)
                expect(response.body.finished).to.equal(newVals.finished)
            })
    })

    it('should return missing parameter', () => {
        const agent = createExpress()
        return agent
            .post('/api/todo/')
            .send()
            .expect('Content-Type', /json/)
            .expect(400)
            .then((response) => {
                expect(response.body)
                    .to.be.an('object')
                expect(response.body.message).to.equal('Missing parameters')
            })
    })

    it('should return empty parameter', () => {
        const agent = createExpress()
        return agent
            .post('/api/todo/')
            .send(emptyVals)
            .expect('Content-Type', /json/)
            .expect(405)
            .then((response) => {
                expect(response.body)
                    .to.be.an('object')
                expect(response.body.message).to.equal('Empty parameters')
            })
    })
})