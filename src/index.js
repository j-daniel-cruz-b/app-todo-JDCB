
import './styles.css'

import {Todo, TodoList} from './js/classes'
import { crearTodoHTML } from './js/componentes.js'

 export const todolist = new TodoList();

// todolist.todos.forEach(todo =>  crearTodoHTML( todo ) );
todolist.todos.forEach( crearTodoHTML );

console.log(todolist);
