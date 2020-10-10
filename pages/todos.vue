<template>
  <div>
    <div v-for="todo in todos" :key="todo.id">
      <h2>{{ todo.description }}</h2>

      <v-checkbox
        :input-value="todo.finished"
        @change="updateItem(todo.id, !todo.finished)"
      />
      <v-form>
        <v-btn depressed color="error" @click="deleteItem(todo.id)">
          Delete task
        </v-btn>
      </v-form>
    </div>
    <v-form>
      <v-text-field
        v-model="newItem.description"
        placeholder="What do you need to do ?"
        required
      />
      <v-btn @click="addItem"> Submit </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    newItem: {
      description: "",
    },
  }),
  computed: {
    ...mapState("todos", ["todos"]),
  },
  async created() {
    await this.fetchAllTodos();
  },
  methods: {
    ...mapActions("todos", [
      "fetchAllTodos",
      "createTodo",
      "updateTodo",
      "deleteTodo",
    ]),
    async addItem() {
      await this.createTodo({
        description: this.newItem.description,
      });
    },
    async updateItem(id, finished) {
      await this.updateTodo({
        id: id,
        finished: finished,
      });
    },
    async deleteItem(id) {
      await this.deleteTodo({
        id: id,
      });
    },
  },
};
</script>