<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="form-container">
      <h2>Edit Todo</h2>
      <form @submit.prevent="handleEditTodo">
        <label for="editTitle">Title:</label>
        <input type="text" id="editTitle" v-model="editedTodo.title" required>
        <label for="editCompleted">Completed:</label>
        <input type="checkbox" id="editCompleted" v-model="editedTodo.completed">
        <div>
          <button type="submit">Simpan</button>
          <button type="button" @click="cancelEdit">Batal</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['todo'],
    data() {
      return {
        editedTodo: {
          title: '',
          completed: false
        }
      };
    },
    mounted() {
      this.editedTodo = { ...this.todo };
    },
    methods: {
      async handleEditTodo() {
        try {
          await axios.put(`https://jsonplaceholder.typicode.com/todos/${this.todo.id}`, this.editedTodo);
          this.$emit('todo-edited', this.editedTodo); 
        } catch (error) {
          console.error('Error editing todo:', error);
        }
      },
      cancelEdit() {
        this.$emit('cancel-edit'); 
      }
    }
  };
  </script>
  
  <style scoped>
 
 .form-container {
  margin-bottom: 20px;
}

.form-container label {
  display: block;
  margin-bottom: 8px;
}

.form-container input[type="text"],
.form-container input[type="checkbox"] {
  padding: 8px;
  margin-bottom: 8px;
}

.form-container button {
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
}

.form-container button[type="submit"] {
  background-color: #008CBA;
}

.form-container button[type="submit"]:hover,
.form-container button[type="button"]:hover {
  background-color: #45a049;
}

.form-container button[type="reset"] {
  background-color: #f44336;
}

.form-container button[type="reset"]:hover {
  background-color: #da190b;
}
  </style>
  