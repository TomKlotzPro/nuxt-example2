import TodoJson from '../models/Json/todo.model.js'
import TodoPostgres from '../models/Postgres/todo.model.js'
import featureFlags from '../featureFlags.js'

export default function deleteTodo(req, res) {
    if (featureFlags.STORAGE === 'JSON') {
        try {
            TodoJson.delete(req.params.todoId)
                .then((todo) => {
                    if (todo === null) res.status(404).send({ message: 'Element not found' })
                    else res.status(200).json(todo)
                })
        } catch {
            res.status(422).send({ message: 'Wrong URL parameter please use todoId' })
        }
    } else if (featureFlags.STORAGE === 'POSTGRE') {
        try {
            TodoPostgres.delete(req.params.todoId)
                .then((todo) => {
                    if (todo === null) res.status(404).send({ message: 'Element not found' })
                    else res.status(200).json(todo)
                })
        } catch {
            res.status(422).send({ message: 'Wrong URL parameter please use todoId' })
        }
    } else {
        console.log('Missing feature flags storage')
    }
}