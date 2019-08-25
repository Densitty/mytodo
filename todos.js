//get the todo from storage
const todos = getSavedTodo();
const search = document.querySelector('.searchTodo');
const form = document.querySelector('#form');
const checkbox = document.querySelector('#checkbox');

//create a filter to search for any todo
const filters = {
	searchText: '',
	hideCompleted: false,
}

//call the renderTodos on loading the document and also call it other times in events
renderTodos(todos, filters)

//create the search parameter
search.addEventListener('input', e => {
	//anything we enter to the searchbar should be assigned as value to filters.searchText
	filters.searchText = e.target.value;
	//empty out the #todo before displaying another content on it by calling the empty summary function
	emptySummary();
	//after emptying out the #todo content, render the todos
	renderTodos(todos, filters);
})

//add todo on submission
form.addEventListener('submit', e => {
	e.preventDefault();
	todos.push({
		id: uuidv4(),
		text: e.target.elements.todo.value,
		completed: false
	});
	saveTodo(todos)
	emptySummary();
	e.target.elements.todo.value = '';
	renderTodos(todos, filters);
})

//using our checkbox to display the todos that are not completed
checkbox.addEventListener('change', e => {
	filters.hideCompleted = e.target.checked;
	emptySummary();
	renderTodos(todos, filters)
})