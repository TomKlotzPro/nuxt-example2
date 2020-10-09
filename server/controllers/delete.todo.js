import Todo from '../models/todo.model.js'

export default function deleteTodo(req, res) {
    try {
        Todo.delete(req.params.todoId)
            .then((todo) => {
                if (todo === null) res.status(404).send({ message: 'Element not found' })
                else res.status(200).json(todo)
            })
    } catch {
        res.status(422).send({ message: 'Wrong URL parameter please use todoId' })
    }
}