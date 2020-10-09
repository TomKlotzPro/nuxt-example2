import Todo from '../models/todo.model.js'

export default function getTodos(req, res) {
    Todo.getAll()
        .then((todos) => {
            res.status(200).json(todos)
        })
}