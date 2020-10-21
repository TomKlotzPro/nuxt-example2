import TodoJson from '../models/Json/todo.model.js'
import TodoPostgres from '../models/Postgres/todo.model.js'
import featureFlags from '../featureFlags.js'

export default function getTodos(req, res) {
    if (featureFlags.STORAGE === 'JSON') {
        TodoJson.getAll()
            .then((todos) => {
                res.status(200).json(todos)
            })
    } else if (featureFlags.STORAGE === 'POSTGRE') {
        TodoPostgres.getAll()
            .then((todos) => {
                res.status(200).json(todos)
            })
    } else {
        console.log('Missing feature flags storage')
    }
}