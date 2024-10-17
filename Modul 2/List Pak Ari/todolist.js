const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItems = document.querySelector('.todo-items');

let todos = [];
let editIndex = null; // Variable to track which todo is being edited

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (editIndex !== null) {
        // If we're editing, update the todo
        updateTodo(editIndex, todoInput.value);
    } else {
        addTodo(todoInput.value);
    }
    todoInput.value = ''; // Clear input after adding or editing
});

function addTodo(item) {
    if (item != '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        todos.push(todo);
        addToLocalStorage(todos);
    }
}

function tampilkanTodos(todos) {
    todoItems.innerHTML = '';
    todos.forEach(function(item) {
        const checked = item.completed ? 'checked' : '';
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed) {
            li.classList.add('checked');
        }
        li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}> ${item.name} 
                        <button class="edit-button">Edit</button>
                        <button class="delete-button">X</button>`;
        todoItems.append(li);
    });
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    tampilkanTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        tampilkanTodos(todos);
    }
}

function toggle(id) {
    todos.forEach(function(item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
}

function updateTodo(index, newValue) {
    if (newValue.trim() !== '') { 
        todos[index].name = newValue; 
        editIndex = null; 
        addToLocalStorage(todos); 
    }
}

getFromLocalStorage();

todoItems.addEventListener('click', function(event) {
    const id = event.target.parentElement.getAttribute('data-key');
    
    // Handle checkbox
    if (event.target.type === 'checkbox') {
        toggle(id);
    }

    // Handle tombol delete
    if (event.target.classList.contains('delete-button')) {
        deleteTodo(id);
    }

    // Handle tombol edit
    if (event.target.classList.contains('edit-button')) {
        editIndex = todos.findIndex(todo => todo.id == id); // Cari index todo yang akan diedit
        if (editIndex !== -1) {
            todoInput.value = todos[editIndex].name; // Tampilkan nilai todo yang diedit di input
        }
    }
});
