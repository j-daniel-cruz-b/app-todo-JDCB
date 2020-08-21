import { Todo } from './classes/todo.class.js'
import { todolist } from '../index.js'


//Referencias en el DOM
const divTodoList        = document.querySelector('.todo-list');
const txtInput           = document.querySelector('.new-todo');
const btnBorrarCompletos = document.querySelector('.clear-completed');
const ulFiltros          = document.querySelector('.filters');
const anchorFiltros      = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) => {

    const htmlTodo = `
    <li class= "${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
    <div class="view">
        <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

//Eventos

txtInput.addEventListener('keyup', ( evento ) => {

    if (evento.keyCode === 13 && txtInput.value.length > 0) {
        
        console.log( txtInput.value );
        const nuevoTodo = new Todo( txtInput.value );
        todolist.nuevoTodo ( nuevoTodo );

        crearTodoHTML(  nuevoTodo );
        
        txtInput.value = '';

    }

});

divTodoList.addEventListener('click', (evento) => {

    const nombreElemento = evento.target.localName;
    const todoElemento = evento.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if ( nombreElemento.includes('input') ) {
        todolist.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    } else if ( nombreElemento.includes('button') ) {
        todolist.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }


    console.log(todolist);
    
});

btnBorrarCompletos.addEventListener('click', () => {

    todolist.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        
        const elemento = divTodoList.children[i];

        if ( elemento.classList.contains('completed') ) {
            divTodoList.removeChild( elemento );
        }
        
    }

});

ulFiltros.addEventListener('click', (evento) => {

    const filtro = evento.target.text;

    if ( !filtro ) { return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected') );
    evento.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        
        elemento.classList.remove('hidden');
        const complet = elemento.classList.contains('completed');

        switch ( filtro ) {
            case 'Pendientes':
                if( complet ) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if( !complet ) {
                    elemento.classList.add('hidden');
                }
                break;

            default:
                break;
        }

    }

});