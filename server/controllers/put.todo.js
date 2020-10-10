import Todo from '../models/todo.model.js'

export default function putTodo(req, res) {
    try {
        Todo.update(req.params.todoId, req.body.description, req.body.finished)
            .then((todo) => {
                if (todo === null) res.status(404).send({ message: 'Element not found or Nothing to update' })
                else res.status(200).json(todo)

            })
    } catch {
        res.status(422).send({ message: 'Wrong URL parameter please use todoId' })
    }
}