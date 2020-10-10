import fs from 'fs'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)

export default class Helper {

    /**
     * @param {String} path
     * @param {Array} data
     * @returns {Promise<>}
     */
    static async writeToFile(path, data) {
        const json = JSON.stringify(data, null, 2)

        try {
            await writeFile(path, json)
            console.log('Saved data to file.')
        } catch (error) {
            console.error(error)
        }

    }

    /**
     * @param {Array} data
     * @returns {Int}
     */
    static getNewId(data) {
        try {
            var lastObject = parseInt(JSON.stringify(data[data.length - 1]['id'], null, 2))
        } catch {
            console.log("Empty database")
        } finally {
            var lastObject = 0
        }

        return lastObject + 1
    }
}