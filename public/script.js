import * as TaskList from "./components/tasklistComponent";

import * as Navigation from "./components/navigation";

import * as Tracker from "./components/flowTimeTracker";

import "./components/studyMode";

// import "./components/flowTimeTracker"

// Initialisations

// Getting the task form to set display none when add button is clicked
const addTaskModal = document.getElementById("addTaskForm");

// Navigation buttons
// const studyModeToggle = document.getElementById("studyModeToggle");
const taskViewerToggle = document.getElementById("taskViewerToggle");
const flowTimeTrackerToggle = document.getElementById("flowTimeTrackerToggle");

// Task study mode components
const studyModeContainer = document.getElementById("studyMode");
const tracker = document.getElementById("flowTimeTracker");
const taskViewer = document.getElementById("taskViewer");

// Add task form
const addTaskForm = document.getElementById("taskForm");
// const addTaskButton = document.querySelector("#taskForm > button");

// Task list
// const taskListContainer = document.getElementById("taskListNew");

addTaskForm.addEventListener("submit", (e) => {
	addTaskModal.style.display = "none";
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
		createdDay: day,
		createdMonth: month,
		createdYear: year,
		createdDate: `${day}/${month}/${year}`,
		taskName: taskNameInput,
		priority: priorityInput,
		difficulty: difficultyInput,
		subject: subjectInput,
		estimatedDuration: hoursInput + " hrs  " + minutesInput + " minutes",
		estimatedHours: hoursInput,
		estimatedMinutes: minutesInput,
		description: taskDescriptionInput,
		taskStatus: "new",
		elapsedHoursSaved: 0,
		elapsedMinutesSaved: 0,
		elapsedSecondsSaved: 0,
		interruptionCounter: 0,
		completedDate: null,
		turnAround: null,
		totalBreakMinutes: 0,
		totalBreakHours: 0,
		totalBreakSeconds: 0,
		totalMaterials: []
	};

	// Adds the task list array to the local storage object as a key and value pair
	TaskList.addToLocalStorage(task);

	TaskList.getAndRenderFromLocalStorage(`Task: ${task.id}`);

	addTaskForm.reset();
});

// Set initially study mode to not appear
studyModeContainer.style.display = "none";

// Set initially for task tracker to not appear
tracker.style.display = "none";

// Add event listener for navigation buttons is here
// studyModeToggle.addEventListener("click", (e) => {
// 	e.preventDefault();
// 	Navigation.navigateToPage(taskViewer, studyModeContainer);
// 	tracker.style.display = "none";
// });

taskViewerToggle.addEventListener("click", (e) => {
	e.preventDefault();
	Navigation.navigateToPage(studyModeContainer, taskViewer);
	tracker.style.display = "none";
	location.reload();
});

flowTimeTrackerToggle.addEventListener("click", (e) => {
	e.preventDefault();

	if (tracker.style.display === "none") {
		Tracker.openTracker();
	}
});
