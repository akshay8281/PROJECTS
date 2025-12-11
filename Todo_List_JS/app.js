// Function to add a new todo item
function addTodo () {
  const newTodoInput = document.getElementById('newTodoInput')
  const newTodoValue = newTodoInput.value.trim()

  if (newTodoValue !== '') {
    // Create a new list item for the todo
    const newTodoItem = document.createElement('li')
    newTodoItem.className = 'todo-item'

    // Create a checkbox for marking completion
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.addEventListener('change', function () {
      newTodoItem.classList.toggle('completed', checkbox.checked)
    })

    // Create a span to display the todo text
    const textSpan = document.createElement('span')
    textSpan.textContent = newTodoValue

    // Append checkbox and text span to the todo item
    newTodoItem.appendChild(checkbox)
    newTodoItem.appendChild(textSpan)

    // Append the new todo item to the todo list
    document.getElementById('todoList').appendChild(newTodoItem)

    // Clear the input field after adding the todo
    newTodoInput.value = ''
  }
}

// Function to clear the entire todo list
function clearTodoList () {
  document.getElementById('todoList').innerHTML = ''
}
