<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <tr>
      <td>{{ todo.id }}</td>
      <td>{{ todo.title }}</td>
      <td>{{ todo.completed ? 'Yes' : 'No' }}</td>
      <td>
        <slot name="editButton">
        <Button @click="editTodo" btnClass="btn-edit">Edit</Button>
      </slot>
      <slot name="deleteButton">
        <Button @click="deleteTodo" btnClass="btn-delete">Delete</Button>
      </slot>
      </td>
    </tr>
  </template>
  
  <script>
  import Button from './Button.vue';
  
  export default {
    props: {
      todo: {
        type: Object,
        requered: true
      },
    },
    components: {
      Button
    },
    methods: {
      editTodo() {
        this.$emit('edit', this.todo);
      },
      deleteTodo() {
        this.$emit('delete', this.todo.id);
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
  