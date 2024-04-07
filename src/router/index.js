import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '../views/HelloWorld.vue';
import AddTodo from '../views/Add.vue';
import EditTodo from '../views/Edit.vue';

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/add',
    name: 'Add',
    component: AddTodo
  },
  {
    path: '/edit/:id',
    name: 'EditTodo',
    component: EditTodo
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
