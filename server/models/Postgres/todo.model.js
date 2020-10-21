import PostgresStore from '../../postgres-store.js'


export default class Todo {
    /** @type {Number} */
    id
    /** @type {String} */
    description
    /** @type {Boolean} */
    finished

    /**
    * @returns {Promise<Todo>}
    */
    static async getAll(description, finished = false) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM todos ;`
        })
        return result.rows
    }

    /**
    * @param {String} description
    * @param {Boolean} [finished=false]
    * @returns {Promise<Todo>}
    */
    static async add(description, finished = false) {
        const result = await PostgresStore.client.query({
            text: `INSERT INTO todos (description, finished) VALUES ($1, $2)
            RETURNING *`,
            values: [description, finished]
        })
        return result.rows[0]
    }

    /**
    * @param {String} id
    * @returns {Promise<Todo>}
    */
    static async delete(id) {
        const result = await PostgresStore.client.query({
            text: `DELETE FROM todos WHERE id=` + id + `;`
        })
        return result.rows[0]
    }

    /**
    * @param {String} id
    * @param {Boolean} [finished=null]
    * @returns {Promise<Todo>}
    */
    static async update(id, finished = null) {

        await PostgresStore.client.query({
            text: `UPDATE todos SET finished = ` + finished + ` WHERE id =` + id + `;`
        })

        const todo = await PostgresStore.client.query({
            text: `SELECT * FROM todos WHERE id =` + id + `;`
        })

        return todo.rows[0]
    }
}