/* eslint-disable no-unused-expressions */
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { expect } from 'chai'
import request from 'supertest'
import express from 'express'
import session from 'express-session'
import apiRouter from '../../../../routes/routes.js'
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

describe('DELETE /api/todos/1', () => {
    before(() => resetJSON())

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

    it('should return one record', () => {
        const agent = createExpress()
        return agent
            .delete('/api/todo/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body)
                    .to.be.an('object')
                expect(response.body.description).to.equal(content[0].description)
                expect(response.body.finished).to.equal(content[0].finished)
            })
    })

    it('should return only one existing todo', () => {
        const agent = createExpress()
        return agent
            .get('/api/todos')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body)
                    .to.be.an('array')
                    .of.length(1)
                expect(response.body[0].id).to.equal(2)
            })
    })

    it('should return a not found', () => {
        const agent = createExpress()
        return agent
            .delete('/api/todo/1')
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
                expect(response.body)
                    .to.be.an('object')
                expect(response.body.message).to.equal('Element not found')
            })
    })
})