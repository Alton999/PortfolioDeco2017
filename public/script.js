import * as TaskList from "./components/tasklistComponent";

import * as Navigation from "./components/navigation";

import "./components/studyMode";

// Initialisations

// Navigation buttons
const studyModeToggle = document.getElementById("studyModeToggle");
const taskViewerToggle = document.getElementById("taskViewerToggle");

// Task study mode components
const studyModeContainer = document.getElementById("studyMode");
const taskViewer = document.getElementById("taskViewer");

// Add task form
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
// const taskListContainer = document.getElementById("taskListNew");

addTaskForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let taskName = taskNameInput.value;
	let priority = priorityInput.value;
	let difficulty = difficultyInput.value;
	let subject = subjectInput.value;
	let hours = hoursInput.value;
	let minutes = minutesInput.value;
	let description = taskDescriptionInput.value;

	let task = TaskList.createTaskObject(
		taskName,
		priority,
		difficulty,
		subject,
		hours,
		minutes,
		description
	);

	// Adds the task list array to the local storage object as a key and value pair
	TaskList.addToLocalStorage(task);
	TaskList.getFromLocalStorage(task.id);
	// renderTasks(getFromLocalStorage());
	addTaskForm.reset();
});

// Set initially study mode to not appear
studyModeContainer.style.display = "none";

// Add event listener for navigation buttons is here
studyModeToggle.addEventListener("click", (e) => {
	e.preventDefault();
	Navigation.navigateToPage(taskViewer, studyModeContainer);
});

taskViewerToggle.addEventListener("click", (e) => {
	e.preventDefault();
	Navigation.navigateToPage(studyModeContainer, taskViewer);
});
