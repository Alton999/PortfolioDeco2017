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

// Task list
// const taskListContainer = document.getElementById("taskListNew");

addTaskForm.addEventListener("submit", (e) => {
	// Add task input fields
	e.preventDefault();
	let taskNameInput = document.getElementById("taskName").value;
	let priorityInput = document.getElementById("priority").value;
	let difficultyInput = document.getElementById("difficulty").value;
	let subjectInput = document.getElementById("subject").value;
	let hoursInput = document.getElementById("hours").value;
	let minutesInput = document.getElementById("minutes").value;
	let taskDescriptionInput = document.getElementById("description").value;
	let currentDate = new Date();
	let day = currentDate.getDate().toString();
	let month = (currentDate.getMonth() + 1).toString();
	let year = currentDate.getFullYear().toString();

	let task = {
		id: Date.now(),
		createdDate: day + " / " + month + " / " + year,
		taskName: taskNameInput,
		priority: priorityInput,
		difficulty: difficultyInput,
		subject: subjectInput,
		estimatedDuration: hoursInput + " hrs  " + minutesInput + " minutes",
		description: taskDescriptionInput,
		taskStatus: "new",
		elapsedHoursSaved: 0,
		elapsedMinutesSaved: 0,
		elapsedSecondsSaved: 0,
		interruptionCounter: 0,
		estimatedHours: hoursInput,
		estimatedMinutes: minutesInput
	};

	// Adds the task list array to the local storage object as a key and value pair
	TaskList.addToLocalStorage(task);

	TaskList.getAndRenderFromLocalStorage(`Task: ${task.id}`);

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
