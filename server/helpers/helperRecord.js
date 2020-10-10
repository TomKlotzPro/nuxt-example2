import Helper from './helper.js'
import path from 'path'

const todosFile = path.join(__dirname, '../data/todos.json')

export default class HelperRecord {
    /**
     * @param {string} id
     * @param {Array} records
     * @returns {Todo}
     */
    static getRecordById(id, records) {
        for (var i = 0; i < records.length; i++) {
            if (records[i].id === parseInt(id)) {
                return records[i]
            }
        }
        return null
    }

    /**
     * @param {Todo} record
     * @param {Array} records
     */
    static deleteRecord(record, records) {
        for (var i = 0; i < records.length; i++) {
            if (records[i] === record) {
                // Delete record
                records.splice(i, 1)
                // Save Data
                Helper.writeToFile(todosFile, records)
                return
            }
        }
    }

    /**
     * @param {Todo} record
     * @param {String} description
     * @param {Boolean} finished
     * @param {JSON} records
     * @returns {Todo}
     */
    static updateRecord(record, description = null, finished = null, records) {
        for (var i = 0; i < records.length; i++) {
            if (records[i] === record) {
                console.log(finished)
                // If description or finished is not null update field else return null
                if (description !== null && records[i].description !== description) records[i].description = description
                else if (finished !== null && records[i].finished !== finished) records[i].finished = finished
                else return null

                console.log("record save")
                // Save records
                Helper.writeToFile(todosFile, records)
                return records[i]
            }
        }
    }

    /**
     * @param {String} description
     * @param {Boolean} finished
     * @param {JSON} records
     * @returns {Todo}
     */
    static createRecord(description, finished = false, records) {
        //Create Record
        var record = {
            id: Helper.getNewId(records),
            description: description,
            finished: (finished === 'true')
        }
        // Add record to Json array
        records.push(record)

        // Save data
        Helper.writeToFile(todosFile, records)

        return record
    }

}