document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const themeToggle = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const taskCategory = document.getElementById('task-category');
    const dueDateInput = document.getElementById('due-date');
    const totalCount = document.getElementById('total-count');
    const completedCount = document.getElementById('completed-count');
    
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Function to save todos to localStorage
    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Function to render todos
    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            
            const todoText = document.createElement('span');
            todoText.className = 'todo-text';
            todoText.textContent = todo.text;
            if (todo.completed) {
                todoText.classList.add('completed');
            }
            
            // Add category tag
            const categoryTag = document.createElement('span');
            categoryTag.className = `category-tag category-${todo.category}`;
            categoryTag.textContent = todo.category;
            todoText.appendChild(categoryTag);

            // Add due date if exists
            if (todo.dueDate) {
                const dueDate = document.createElement('span');
                dueDate.className = 'due-date';
                const dueDateObj = new Date(todo.dueDate);
                const today = new Date();
                today.setHours(0,0,0,0);
                
                if (dueDateObj < today) {
                    dueDate.classList.add('overdue');
                }
                
                dueDate.textContent = `Due: ${new Date(todo.dueDate).toLocaleDateString()}`;
                todoText.appendChild(dueDate);
            }
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            
            // Delete todo
            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });
            
            // Toggle completion
            todoText.addEventListener('click', () => {
                todo.completed = !todo.completed;
                saveTodos();
                renderTodos();
            });
            
            li.appendChild(todoText);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });

        // Update statistics
        const completed = todos.filter(t => t.completed).length;
        totalCount.textContent = todos.length;
        completedCount.textContent = completed;
    };

    // Update theme toggle to use CSS variables correctly
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Update icon and store preference
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDarkMode 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Enhanced todo object structure
    const addTodo = () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            todos.push({
                text: todoText,
                completed: false,
                category: taskCategory.value,
                dueDate: dueDateInput.value,
                createdAt: new Date().toISOString()
            });
            todoInput.value = '';
            dueDateInput.value = '';
            saveTodos();
            renderTodos();
        }
    };

    // Event listeners
    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTodos = todos.filter(todo => 
            todo.text.toLowerCase().includes(searchTerm)
        );
        renderFilteredTodos(filteredTodos);
    });

    // Category filter
    categoryFilter.addEventListener('change', () => {
        const category = categoryFilter.value;
        const filteredTodos = category === 'all' 
            ? todos 
            : todos.filter(todo => todo.category === category);
        renderFilteredTodos(filteredTodos);
    });

    const renderFilteredTodos = (filteredTodos) => {
        todoList.innerHTML = '';
        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            
            const todoText = document.createElement('span');
            todoText.className = 'todo-text';
            todoText.textContent = todo.text;
            if (todo.completed) {
                todoText.classList.add('completed');
            }
            
            // Add category tag
            const categoryTag = document.createElement('span');
            categoryTag.className = `category-tag category-${todo.category}`;
            categoryTag.textContent = todo.category;
            todoText.appendChild(categoryTag);

            // Add due date if exists
            if (todo.dueDate) {
                const dueDate = document.createElement('span');
                dueDate.className = 'due-date';
                const dueDateObj = new Date(todo.dueDate);
                const today = new Date();
                today.setHours(0,0,0,0);
                
                if (dueDateObj < today) {
                    dueDate.classList.add('overdue');
                }
                
                dueDate.textContent = `Due: ${new Date(todo.dueDate).toLocaleDateString()}`;
                todoText.appendChild(dueDate);
            }
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            
            // Delete todo
            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });
            
            // Toggle completion
            todoText.addEventListener('click', () => {
                todo.completed = !todo.completed;
                saveTodos();
                renderTodos();
            });
            
            li.appendChild(todoText);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    };

    // Initial render
    renderTodos();
});
