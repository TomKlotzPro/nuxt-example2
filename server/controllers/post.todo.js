import Todo from '../models/todo.model.js'

export default function postTodos(req, res) {
    Todo.add(req.body.description,req.body.finished)
        .then((todo) => {
            res.status(200).json(todo)
        })
}