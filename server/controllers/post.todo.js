import TodoJson from '../models/Json/todo.model.js'
import TodoPostgres from '../models/Postgres/todo.model.js'
import featureFlags from '../featureFlags.js'

export default function postTodos(req, res) {
    if (featureFlags.STORAGE === 'JSON') {
        TodoJson.add(req.body.description, req.body.finished)
            .then((todo) => {
                if (todo === undefined) res.status(400).send({ message: 'Missing parameters' })
                if (todo === null) res.status(405).send({ message: 'Empty parameters' })
                else res.status(200).json(todo)

            })
    } else if (featureFlags.STORAGE === 'POSTGRE') {
        TodoPostgres.add(req.body.description, req.body.finished)
            .then((todo) => {
                if (todo === undefined) res.status(400).send({ message: 'Missing parameters' })
                if (todo === null) res.status(405).send({ message: 'Empty parameters' })
                else res.status(200).json(todo)

            })
    } else {
        console.log('Missing feature flags storage')
    }
}