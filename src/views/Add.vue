<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="form-container">
      <h2>Tambah Todo</h2>
      <form @submit.prevent="handleAddTodo">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="newTodo.title" required>
        <label for="completed">Completed:</label>
        <input type="checkbox" id="completed" v-model="newTodo.completed">
        <div>
          <button type="submit">Simpan</button>
          <button type="button" @click="cancelAdd">Batal</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newTodo: {
          title: '',
          completed: false
        }
      };
    },
    methods: {
      async handleAddTodo() {
        try {
          const response = await axios.post('https://jsonplaceholder.typicode.com/todos', this.newTodo);
          this.$emit('todo-added', response.data); 
          this.newTodo.title = '';
          this.newTodo.completed = false;
        } catch (error) {
          console.error('Error adding todo:', error);
        } 
      },
      cancelAdd() {
        this.$emit('cancel-add');
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
  