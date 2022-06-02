import "./addTaskModalComponent";

import * as StudyMode from "./studyMode";

// // Task list
let taskListContainerNew = document.getElementById("taskListNew");
let taskListContainerProgress = document.getElementById("taskListProgress");
let taskListContainerCompleted = document.getElementById("taskListCompleted");

// Function that takes in parameters to create and return 1 task object

// Renders the current new task to the DOM
const renderTask = (task, renderContainer) => {
	updateEmpty();

	// console.log("From render", allTasks);
	// Every time the render tasks function is called we would want to loop over the array and display all values in our local storage
	// console.log(task.difficulty);
	const item = document.createElement("li");
	item.setAttribute("data-id", task.id);
	// Add the css class to the item container
	item.classList.add("taskListItem");
	// item.innerHTML = "<p>" + task.taskName + "</p>";

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
					<p class="label">Task:</p>
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
	// Append the ctags into the tasktags div
	item.appendChild(taskTagsDiv);
	item.appendChild(taskDetailsContainer);

	// Creating buttons container
	// let buttonsContainer = document.createElement("div");
	// buttonsContainer.className += "actionButtonContainer";

	let studyButton = document.createElement("button");
	let studyButtonText = document.createTextNode("Study Now");
	studyButton.className += "studyButton";
	studyButton.appendChild(studyButtonText);
	item.append(studyButton);
	// buttonsContainer.appendChild(studyButton);

	// Creating a delete button associated with specific task
	let delButton = document.createElement("button");
	let delButtonText = document.createTextNode("Delete Task");
	delButton.className += "delButton";

	delButton.appendChild(delButtonText);
	// buttonsContainer.appendChild(delButton);
	item.append(delButton);

	// // Event listener for additional dom elements
	delButton.addEventListener("click", (e) => {
		e.preventDefault();
		let id = e.target.parentElement.getAttribute("data-id");
		localStorage.removeItem("Task: " + id.toString());

		item.remove();

		updateEmpty();
	});

	// studyButton.setAttribute("onclick", OpenStudyMode());
	studyButton.addEventListener("click", (e) => {
		e.preventDefault();
		let id = e.target.parentElement.getAttribute("data-id");
		const key = "Task: " + id.toString();
		StudyMode.openStudyMode(key);
		// studyModeContainer.style.display = "block";
		// taskViewer.style.display = "none";
		// console.log(id);
	});

	renderContainer.appendChild(item);
	// console.log(renderContainer);
	// addTaskForm.reset();
};

const updateEmpty = () => {
	counter = 0;
	for (let i = 0; i < localStorage.length; i++) {
		let currentKey = localStorage.key(i);
		// console.log(currentKey);
		// console.log(localStorage.getItem(currentKey));
		// Checks if its actually a task item in the local storage
		if (currentKey.slice(0, 5) === "Task:") {
			let taskStatus = JSON.parse(localStorage.getItem(currentKey)).taskStatus;

			// Needs to check if there is any items in the new category
			if (taskStatus === "new") {
				// console.log("Found new");
				counter += 1;
			}
		}
	}
	// console.log(counter);
	if (counter > 0) {
		document.getElementById("emptyListText").style.display = "none";
		// console.log("more than 0 elements ");
	} else {
		document.getElementById("emptyListText").style.display = "block";
		// console.log("0elements ");
	}
};

// Add to local storage capability
export const addToLocalStorage = (task) => {
	localStorage.setItem("Task: " + task.id.toString(), JSON.stringify(task));
};

export const getAndRenderFromLocalStorage = (key) => {
	let task = JSON.parse(localStorage.getItem(key));
	// console.log(key);
	// Checks to see where the progress of the items are;
	if (task.taskStatus === "new") {
		renderTask(task, taskListContainerNew);
	} else if (task.taskStatus === "In progress") {
		renderTask(task, taskListContainerProgress);
	} else if (task.taskStatus === "Completed") {
		renderTask(task, taskListContainerCompleted);
	} else {
		console.log("Unknown placement of item, rendered to new tasks");
		renderTask(task, taskListContainerNew);
	}
};

// renders all elements after refresh

window.onload = (e) => {
	e.preventDefault();
	updateEmpty();
	for (const key in localStorage) {
		// console.log(key, key.slice(0))
		// Checks if keys is related to tasks
		if (key.slice(0, 5) === "Task:") {
			getAndRenderFromLocalStorage(key);
		}
	}
};
