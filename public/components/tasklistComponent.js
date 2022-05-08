// Creating a add task function
// Initialise inputs from HTML (Add task list functionality)
const addTaskForm = document.getElementById("taskForm");
const addTaskButton = document.querySelector("#taskForm > button");

// Add task input fields
const taskNameInput = document.getElementById("taskName");
const priorityInput = document.getElementById("priority");
const difficultyInput = document.getElementById("difficulty");
const subjectInput = document.getElementById("subject");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const taskDescriptionInput = document.getElementById("description");

// Task list
const taskListContainer = document.getElementById("taskList");

// Initialise task list array
let taskListArray = [];

// Event listener on the submit form button
addTaskForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let taskName = taskNameInput.value;
	let priority = priorityInput.value;
	let difficulty = difficultyInput.value;
	let subject = subjectInput.value;
	let hours = hoursInput.value;
	let minutes = minutesInput.value;
	let description = taskDescriptionInput.value;

	let task = createTaskObject(
		taskName,
		priority,
		difficulty,
		subject,
		hours,
		minutes,
		description
	);
	taskListArray.push(task);
	renderTasks(task);
	addTaskForm.reset();
});

// Function that takes in parameters to create and return 1 task object
const createTaskObject = (
	taskName,
	priority,
	difficulty,
	subject,
	hours,
	minutes,
	description
) => {
	let currentDate = new Date();
	let day = currentDate.getDate().toString();
	let month = (currentDate.getMonth() + 1).toString();
	let year = currentDate.getFullYear().toString();

	return {
		id: Date.now(),
		createdDate: day + " / " + month + " / " + year,
		taskName,
		priority,
		difficulty,
		subject,
		estimatedDuration: hours + " hrs / " + minutes + " minutes",
		description
	};
};

// Renders the current new task to the DOM
const renderTasks = (task) => {
	updateEmpty();
	let item = document.createElement("li");
	item.setAttribute("data-id", task.id);
	// Add the css class to the item container
	item.classList.add("taskListItem");
	// item.innerHTML = "<p>" + task.taskName + "</p>";

	// Create task tags div
	let taskTagsDiv = document.createElement("div");
	taskTagsDiv.className += "taskTags";
	// Create task details container
	let taskDetailsContainer = document.createElement("div");
	taskDetailsContainer.classList.add("taskDetails");

	// Manipulate the HTML structure of task deatils container to suit the needs of this list
	taskDetailsContainer.innerHTML = `
		<ul>
			<li>
				<p class="label">Task Name:</p>
				<p>${task.taskName}</p>
			</li>
			<li>
				<p class="label">Subject:</p>
				<p>${task.subject}</p>
			</li>
			<li>
				<p class="label">Date Created:</p>
				<p>${task.createdDate}</p>
			</li>
			<li>
				<p class="label">Estimated Duration:</p>
				<p>${task.estimatedDuration}</p>
			</li>
		</ul>
	`;

	// Creating the functionality for displaying the tags of priority and difficulty
	// Create 2 spans to and check the value of each. add class name green, orange or red to change tag color
	let difficultyTag = document.createElement("span");
	let priorityTag = document.createElement("span");

	// Create the text node for the span
	let difficultyTagText = document.createTextNode(task.difficulty);
	let priorityTagText = document.createTextNode(task.priority);

	// Add initial class to spans
	difficultyTag.classList.add("taskTag");
	priorityTag.classList.add("taskTag");

	// Append text nodes to span
	difficultyTag.appendChild(difficultyTagText);
	priorityTag.appendChild(priorityTagText);

	// Depending on the colour add classname to spans
	// Difficulty
	if (task.difficulty === "Easy") {
		difficultyTag.classList.add("green");
	} else if (task.difficulty === "Medium") {
		difficultyTag.classList.add("orange");
	} else {
		difficultyTag.classList.add("red");
	}

	// Priority
	if (task.priority === "Low Priority") {
		priorityTag.classList.add("green");
	} else if (task.priority === "Medium Priority") {
		priorityTag.classList.add("orange");
	} else {
		priorityTag.classList.add("red");
	}

	taskTagsDiv.appendChild(difficultyTag);
	taskTagsDiv.appendChild(priorityTag);
	// Append the tags into the tasktags div
	item.appendChild(taskTagsDiv);
	item.appendChild(taskDetailsContainer);

	taskListContainer.appendChild(item);

	// Creating a delete button associated with specific task
	// let delButton = document.createElement("button");
	// let delButtonText = document.createTextNode("Delete Task");
	// delButton.appendChild(delButtonText);
	// item.append(delButton);

	// // Event listener for additional dom elements
	// delButton.addEventListener("click", (e) => {
	// 	e.preventDefault();
	// 	let id = e.target.parentElement.getAttribute("data-id");
	// 	let index = taskListArray.findIndex((task) => task.id === Number(id));
	// 	removeItemFromArray(taskListArray, index);
	// 	item.remove();
	// 	console.log(taskListArray);
	// 	updateEmpty();
	// });

	addTaskForm.reset();
};

const removeItemFromArray = (arr, index) => {
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
};

const updateEmpty = () => {
	if (taskListArray.length > 0) {
		document.getElementById("emptyListText").style.display = "none";
	} else {
		document.getElementById("emptyListText").style.display = "block";
	}
};

const capitaliseFirstLetter = (inputString) => {
	return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};
