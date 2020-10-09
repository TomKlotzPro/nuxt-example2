import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import HelperRecord from '../helpers/helperRecord.js'

const readFile = promisify(fs.readFile)
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
        // Load data

        const records = JSON.parse(await readFile(todosFile, 'utf8'))

        // Return records
        return records
    }

    /**
     * @param {String} description
     * @param {Boolean} [finished=false]
     * @returns {Promise<Todo>}
     */
    static async add(description, finished = false) {
        // Load data 
        const records = JSON.parse(await readFile(todosFile, 'utf8'))

        // Create record
        var createdRecord = HelperRecord.createRecord(description, finished, records)

        // Return Created record
        return createdRecord
    }

    /**
     * @param {String} id
     * @returns {Promise<Todo>}
     */
    static async delete(id) {
        // Load data
        var records = JSON.parse(await readFile(todosFile, 'utf8'))

        // Retrieve delete Record
        var deletedRecord = HelperRecord.getRecordById(id, records)

        // Early return
        if (deletedRecord === null) return null

        // Retrieve todos without delete record
        HelperRecord.deleteRecord(record, records)

        // Return deleted records
        return deletedRecord
    }

    /**
    * @param {String} id
    * @param {String} description
    * @param {Boolean} finished
    * @returns {Promise<Todo>}
    */
    static async update(id, description = null, finished = null) {
        // Load data
        var records = JSON.parse(await readFile(todosFile, 'utf8'))

        // Retrieve record
        var record = HelperRecord.getRecordById(id, records)

        // Early return if record is not found
        if (record === null) return null

        // Update record
        var updatedRecord = HelperRecord.updateRecord(record, description, finished, records)

        // Early return if nothing changed
        if (updatedRecord === null) return null

        // Return updated record
        return updatedRecord
    }

}