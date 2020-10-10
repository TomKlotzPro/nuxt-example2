import Todo from '../models/todo.model.js'

export default function postTodos(req, res) {
    Todo.add(req.body.description, req.body.finished)
        .then((todo) => {
            if(todo === undefined) res.status(400).send({message : 'Missing parameters'})
            if(todo === null) res.status(405).send({message : 'Empty parameters'})
            else res.status(200).json(todo)
            
        })
}