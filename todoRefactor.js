
//create a summary function and then call it 
const incompleteSummaryText = function (incompleteTodos) {
    const summaryText = document.createElement('h2');
    summaryText.textContent = `You have ${incompleteTodos.length} tasks to complete`;
    summaryText.style.color = 'red';
    summary.appendChild(summaryText);
}

//remove each todo by clicking the button
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id;
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

//grab each todo by its id
const toggleTodo = function (id) {
    const findTodo = todos.find(function (todo) {
        return todo.id === id
    })
    //flipping 
    if (findTodo != undefined) {
        findTodo.completed = !findTodo.completed
    }
}

const makeContent = function (todo, index) {
    /*const list = document.querySelector('#todo');
    const check = document.createElement('input');

    check.setAttribute('type', 'checkbox');
    list.appendChild(check)

    const button = document.createElement('button')
    const div = document.createElement('div');
    const para = document.createElement('span');

    para.textContent = `${index + 1}. ${todo.text}`;
    button.textContent = 'x';

    list.appendChild(para);
    list.appendChild(button);
    list.appendChild(div);
    console.log(list)
    return list;*/
    const div = document.createElement('div');
    const text = document.createElement('span');
    const button = document.createElement('button');
    const check = document.createElement('input');
    //setup the checkbox
    check.setAttribute('type', 'checkbox');
    check.checked = todo.completed;
    div.appendChild(check);
    //setup the text content rendered onto the DOM
    text.textContent = `${index + 1}. ${todo.text}`;
    div.appendChild(text);
    //create the content of the button dynamically created
    button.textContent = 'x';
    //attach button created to the div
    div.appendChild(button);
    button.setAttribute('class', 'remove');
    //delete each todo on the click of the button attached
    button.addEventListener('click', function () {
        //clear out the initial summary text
        emptySummary();
        //remove the todo clicked that matches the id presented
        removeTodo(todo.id);
        //rerender the todo and save the todos
        saveTodo(todos)
        renderTodos(todos, filters)
    })

    check.addEventListener('change', function (e) {
        emptySummary();
        /* this is my method of toggling comleted each todo as either done or not done
        if (e.target.checked) {
            todo.completed = true;
        } else {
            todo.completed = false;
        }*/
        //Another method is below function
        toggleTodo(todo.id);
        saveTodo(todos);
        renderTodos(todos, filters)
    })

    return div;
}

//manipulate the data display on checking the checkbox
const hideCompletedTasks = function (incompleteTodos) {
    document.querySelector('#todo').innerHTML = '';
    incompleteTodos.forEach(function (todo, index) {
        const para = makeContent(todo, index);
        document.querySelector('#todo').appendChild(para)
        // return div;
    });
}

//get the saved todos from our local storage if it exists and if not return an empty array
const getSavedTodo = function () {
    const todosJSON = localStorage.getItem('todos')
    if (todosJSON !== null) {
        return JSON.parse(todosJSON);
    } else {
        return [];
    }
}

//generate DOM structure function
const filteredTodoDOM = function (todo, index) {
    const div = makeContent(todo, index);
    return div;
}

//render the list by filtering out the matching todo upon searching
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    });

    document.querySelector('#todo').innerHTML = '';

    filteredTodos.forEach(function (todo, index) {
        const para = filteredTodoDOM(todo, index);
        document.querySelector('#todo').appendChild(para)
    });

    //Filter out the uncompleted todo
    //the incompletetodos should derive its data from the fitleredTodos array. If it does from the todos array, the dynamism on search will be taken away
    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    //call the summary function
    incompleteSummaryText(incompleteTodos);

    //choose to display todo on checking checkbox
    if (filters.hideCompleted) {
        hideCompletedTasks(incompleteTodos)
    } else {
        return filteredTodos
    }
}

//save to storage function
const saveTodo = function (todos) {
    return localStorage.setItem('todos', JSON.stringify(todos));
}

//get the summary to print an empty document
const emptySummary = function () {
    const summary = document.querySelector('#summary');
    summary.innerHTML = '';
}