<!-- eslint-disable vue/no-unused-components -->
<template>
  <div>
    <h1>Todo List</h1>
    <Button @click="showAddForm = true" btnClass="btn-primary">Tambah </Button>
  
    <add-todo v-if="showAddForm" @todo-added="handleTodoAdded" @cancel-add="cancelAdd" />
    
    <edit-todo v-if="showEditForm" :todo="selectedTodo" @todo-edited="handleTodoEdited" @cancel-edit="cancelEdit" />
  </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Item v-for="todo in paginatedTodos" :key="todo.id" :todo="todo" @edit="editTodoForm" @delete="deleteTodoConfirm">
          <template v-slot:editButton>
            <Button btnClass="btn-edit" @click="editTodoForm(todo)">Edit</Button>
          </template>
          <template v-slot:deleteButton>
            <Button btnClass="btn-delete" @click="deleteTodo(todo.id)">Delete</Button>
          </template>
        </Item>
      </tbody>
    </table>
    
    <!-- Tombol navigasi -->
    <div>
      <Button @click="prevPage" :btnClass="{ 'btn-disabled': currentPage === 1 }">Prev</Button>
      <Button @click="nextPage" :btnClass="{ 'btn-disabled': currentPage === totalPages }">Next</Button>
    </div>
</template>

<script>
import axios from 'axios';
import AddTodo from './Add.vue';
import EditTodo from './Edit.vue';
import Button from '../components/Button.vue';
import Item from '../components/Item.vue';

export default {
  components: {
    AddTodo,
    EditTodo,
    Button,
    Item
  },
  data() {
    return {
      
      todos: [],
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      showAddForm: false,
      showEditForm: false
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
          params: {
            _page: this.currentPage,
            _limit: this.pageSize
          }
        });
        this.todos = [...this.todos, ...response.data];
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.pageSize);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async handleTodoAdded(todo) {
      this.todos.unshift(todo); 
      this.showAddForm = false; 
      window.alert('Todo berhasil ditambahkan'); 
    },
    async handleTodoEdited(editedTodo) {
      const index = this.todos.findIndex(todo => todo.id === editedTodo.id);
      if (index !== -1) {
        this.todos.splice(index, 1, editedTodo);
      }
      this.showEditForm = false; 
      this.notification = 'Todo berhasil diedit'; 
    },

    async editTodoForm(todo) {
      this.selectedTodo = todo; 
      this.showEditForm = true; 

    },
    async updateTodo() {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${this.editTodo.id}`, this.editTodo);
        const index = this.todos.findIndex(todo => todo.id === this.editTodo.id);
        if (index !== -1) {
          this.todos.splice(index, 1, response.data); 
        }
        this.editTodo.id = null;
        this.editTodo.title = '';
        this.editTodo.completed = false;
        this.showEditForm = false; 
        window.alert('Todo berhasil diedit'); 
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    async deleteTodo(todoId) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
        this.todos = this.todos.filter(todo => todo.id !== todoId); 
        window.alert('Todo berhasil dihapus');  
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchTodos();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchTodos();
      }
    },
    cancelAdd() {
      this.showAddForm = false;
    },
    cancelEdit() {
      this.showEditForm = false;
    },
  },
  computed: {
    paginatedTodos() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.todos.slice(startIndex, endIndex);
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #dddddd;
}



</style>
