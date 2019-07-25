const todos = getSavedTodos();

const search = document.querySelector('.searchTodo');
const form = document.querySelector('#form');

//Set our search parameter for filtering
const filters = {
	searchText: '',
	hideCompleted: false
};

//call the renderTodos function defined 
renderTodos(todos, filters);

//Listen for input event on our input tag
search.addEventListener('input', function (e) {
	filters.searchText = e.target.value;
	//document.querySelector('#todo').innerHTML = '';
	renderTodos(todos, filters);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	//on submitting the form, push data to the todos array
	todos.push({
		id: uuidv4(),
		text: e.target.elements.todo.value,
		completed: false
	});

	//call the function saving to local storage
	saveTodos(todos)

	e.target.elements.todo.value = '';
	renderTodos(todos, filters);
});

document.querySelector('#checkbox').addEventListener('change', function (e) {
	filters.hideCompleted = e.target.checked;
	renderTodos(todos, filters)
})
