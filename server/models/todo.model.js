import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const todosFile = path.join(__dirname, '../data/todos.json')

export default class Todo {
    /** @type {Number} */
    id
    /** @type {String} */
    description
    /** @type {Boolean} */
    finished

    /**
     * @returns {Promise<Todo[]>}
     */
    static async getAll() {
        const todos = await readFile(todosFile, 'utf8')

        return JSON.parse(todos)
    }

    /**
     * @param {String} description
     * @param {Boolean} [finished=false]
     * @returns {Promise<Todo>}
     */
    static async add(description, finished = false) {
        const todos = JSON.parse(await readFile(todosFile, 'utf8'))
        todos.add({
            id: 6,
            description: description,
            finished : finished
        })
        // save the new version of the json file
        // return the newly created object to the user
        return {} // TO IMPLEMENT
    }

}