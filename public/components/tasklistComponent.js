import "./addTaskModalComponent";

// import { openStudyMode } from "./studyModeComponent";

// Creating a add task function
// Initialise inputs from HTML (Add task list functionality)
const addTaskForm = document.getElementById("taskForm");
// const addTaskButton = document.querySelector("#taskForm > button");

// Add task input fields
const taskNameInput = document.getElementById("taskName");
const priorityInput = document.getElementById("priority");
const difficultyInput = document.getElementById("difficulty");
const subjectInput = document.getElementById("subject");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const taskDescriptionInput = document.getElementById("description");

// Task list
const taskListContainer = document.getElementById("taskListNew");

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

	// Adds the task list array to the local storage object as a key and value pair
	addToLocalStorage(taskListArray);
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
		estimatedDuration: hours + " hrs  " + minutes + " minutes",
		description,
		taskStatus: "new"
	};
};

// Renders the current new task to the DOM
const renderTasks = (allTasks) => {
	updateEmpty();

	// Everytime the render tasks function is called we would want to loop over the array and display all values in our local storage
	allTasks.forEach((task) => {
		// console.log(task);
		const item = document.createElement("li");
		item.setAttribute("data-id", task.id);
		// Add the css class to the item container
		item.classList.add("taskListItem");

		// Create task tags div
		const taskTagsDiv = document.createElement("div");
		taskTagsDiv.className += "taskTags";
		// Create task details container
		const taskDetailsContainer = document.createElement("div");
		taskDetailsContainer.classList.add("taskDetails");

		// Manipulate the HTML structure of task details container to suit the needs of this list

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
		const difficultyTag = document.createElement("span");
		const priorityTag = document.createElement("span");

		// Create the text node for the span
		const difficultyTagText = document.createTextNode(task.difficulty);
		const priorityTagText = document.createTextNode(task.priority);

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

		let buttonsContainer = document.createElement("div");
		buttonsContainer.className += "actionButtonContainer";

		// Creating a delete button associated with specific task
		let delButton = document.createElement("button");
		let delButtonText = document.createTextNode("Delete Task");
		delButton.className += "delButton";
		delButton.appendChild(delButtonText);
		buttonsContainer.append(delButton);

		let openStudyButton = document.createElement("button");
		let studyButtonText = document.createTextNode("Study");
		openStudyButton.className += "studyButton";
		openStudyButton.appendChild(studyButtonText);
		buttonsContainer.append(openStudyButton);
		item.appendChild(buttonsContainer);

		// // Event listener for additional dom elements
		delButton.addEventListener("click", (e) => {
			e.preventDefault();
			let id = e.target.parentElement.getAttribute("data-id");
			let index = taskListArray.findIndex((task) => task.id === Number(id));
			removeItemFromArray(taskListArray, index);
			item.remove();
			addToLocalStorage(taskListArray);
			console.log(taskListArray);
			updateEmpty();
		});

		// openStudyButton.addEventListener("click", (e) => {
		// 	e.preventDefault();
		// 	let id = e.target.parentElement.getAttribute("data-id");
		// 	let index = taskListArray.findIndex((task) => task.id === Number(id));
		// 	console.log(index);
		// 	// console.log(Number(id));
		// 	console.log(taskListArray);
		// });

		taskListContainer.appendChild(item);
	});

	addTaskForm.reset();
};

const removeItemFromArray = (arr, index) => {
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
};

const updateEmpty = () => {
	const reference = localStorage.getItem("allTasks");
	if (reference) {
		if (reference.length > 0) {
			document.getElementById("emptyListText").style.display = "none";
		} else {
			document.getElementById("emptyListText").style.display = "block";
		}
	}
};

const capitaliseFirstLetter = (inputString) => {
	return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

// Add to local storage capability
const addToLocalStorage = (allTasks) => {
	localStorage.setItem("allTasks", JSON.stringify(allTasks));
	console.log("Task added");
	renderTasks(allTasks);
};

const getFromLocalStorage = () => {
	const reference = localStorage.getItem("allTasks");

	// Checking if the reference exists
	if (reference) {
		allTasks = JSON.parse(reference);
		renderTasks(allTasks);
	} else {
		console.log("Key reference not found in local storage");
	}
};

getFromLocalStorage();
