import "./addTaskModalComponent";

import * as StudyMode from "./studyMode";

// // Task list
const taskListContainer = document.getElementById("taskListNew");

// Function that takes in parameters to create and return 1 task object
export const createTaskObject = (
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
const renderTask = (task) => {
	updateEmpty();

	// console.log("From render", allTasks);
	// Everytime the render tasks function is called we would want to loop over the array and display all values in our local storage
	console.log(task.difficulty);
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

	// Manipulate the HTML structure of task deatils container to suit the needs of this list
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
		// console.log(id);
		localStorage.removeItem("Task: " + id.toString());
		// let index = taskListArray.findIndex((task) => task.id === Number(id));
		// removeItemFromArray(taskListArray, index);
		item.remove();
		// addToLocalStorage(taskListArray);
		// console.log(taskListArray);
		// refreshRenders();
		updateEmpty();
		// getFromLocalStorage(id);
		// console.log("Button clicked");
	});

	// studyButton.setAttribute("onclick", OpenStudyMode());
	studyButton.addEventListener("click", (e) => {
		e.preventDefault();
		let id = e.target.parentElement.getAttribute("data-id");
		const key = "Task: " + id.toString();
		StudyMode.openStudyMode(JSON.parse(localStorage.getItem(key)));
		// studyModeContainer.style.display = "block";
		// taskViewer.style.display = "none";
		// console.log(id);
	});

	taskListContainer.appendChild(item);

	// addTaskForm.reset();
};

const updateEmpty = () => {
	counter = 0;
	for (let i = 0; i < localStorage.length; i++) {
		const currentKey = localStorage.key("i");
		// console.log(currentKey);
		if (currentKey.slice(0, 5) === "Task:") {
			counter += 1;
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

	// console.log("Task: " + task.id.toString());
};

export const getFromLocalStorage = (taskId) => {
	const key = "Task: " + taskId.toString();
	renderTask(JSON.parse(localStorage.getItem(key)));
};

// renders all elements after refresh

window.onload = (e) => {
	e.preventDefault();
	updateEmpty();
	for (const key in localStorage) {
		// console.log(key, key.slice(0))
		if (key.slice(0, 5) === "Task:") {
			renderTask(JSON.parse(localStorage.getItem(key)));
		}
	}
};
