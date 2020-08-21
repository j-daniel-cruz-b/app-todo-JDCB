
import { Todo } from './todo.class.js'

export class TodoList {

    constructor () {
        // this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo ( _todo ) {
        this.todos.push(_todo);
        this.guardarLocalStorage();
    }

    eliminarTodo ( _id ) {
        
        this.todos = this.todos.filter( todo => todo.id != _id );
        this.guardarLocalStorage();

    }

    marcarCompletado ( _id ) {

        for (const todo of this.todos) {
            
            if( todo.id == _id){
                todo.completado = !todo.completado;
                break;

            }

        }
        this.guardarLocalStorage();

    }

    eliminarCompletados () {
        
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();

    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify( this.todos ));

    }

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo')) ?
                    JSON.parse(localStorage.getItem('todo')) 
                    : [] ;
        this.todos = this.todos.map( Todo.fromJSON );
    }


}