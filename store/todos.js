const state = () => ({
    todos: []
})

const getters = {
}

const mutations = {
    addTodo(state, todo) {
        const curr = state.todos.find(t => t.id === todo.id)
        if (!curr) {
            state.todos.push(todo)
        } else {
            curr.description = todo.description
            curr.finished = todo.finished
        }
    },
    deleteTodo(state, todoId) {
        console.log("todos" + state.todos)

        for (var i = 0; i < state.todos.length; i++) {
            if (state.todos[i].id === todoId) {
                console.log("todo" + todoId)
                state.todos.splice(i, 1)
            }
        }
    }
}

const actions = {
    async fetchAllTodos({ commit }) {
        const todos = await this.$axios.$get('/api/todos')
        todos.forEach(todo => commit('addTodo', todo))
    },
    async createTodo({ commit }, { description }) {
        const todo = await this.$axios.$post('/api/todo', {
            description,
            finished: false
        })
        commit('addTodo', todo)
    },
    async updateTodo({ commit }, { id, finished }) {
        const todo = await this.$axios.$put('/api/todo/' + id, {
            finished: finished
        })
        commit('addTodo', todo)
    },
    async deleteTodo({ commit }, { id }) {
        await this.$axios.$delete('/api/todo/' + id)
        commit('deleteTodo', id)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}