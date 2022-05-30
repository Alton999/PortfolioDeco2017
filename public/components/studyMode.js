import * as Navigation from "./navigation";

const studyModeContainer = document.getElementById("studyMode");
const taskViewer = document.getElementById("taskViewer");

//  E stands for element
let taskNameDOM = document.getElementById("taskNameDOM");
let subjectE = document.getElementById("subjectE");
let difficultyTextE = document.getElementById("difficultyStudy");

// Timer ref
let elapsedDurationE = document.getElementById("elapsedDuration");

let estimatedDurationE = document.getElementById("estimatedDuration");
let interruptionsCounterE = document.getElementById("interruptionsCounter");
let dateCreatedE = document.getElementById("dateCreatedE");
let startButton = document.getElementById("startSession");
let pauseButton = document.getElementById("pauseSession");
let endSession = document.getElementById("endSession");

export const openStudyMode = (key) => {
	// This function takes in the item key and changes the chosen field with the new value
	let taskObject = JSON.parse(localStorage.getItem(key));
	Navigation.navigateToPage(taskViewer, studyModeContainer);

	// Create a is running variable to check if its running to disable the pause button
	let isRunning = false;
	// let interruptionCounter = taskObject.interruptionCounter;

	// Manipulate the DOM to display the current task
	taskNameDOM.innerHTML = taskObject.taskName;
	subjectE.innerHTML = taskObject.subject;
	difficultyTextE.innerHTML = taskObject.difficulty;
	estimatedDurationE.innerHTML = taskObject.estimatedDuration;
	dateCreatedE.innerHTML = taskObject.createdDate;
	elapsedDurationE.innerHTML = `${taskObject.elapsedHoursSaved} hrs 0${taskObject.elapsedMinutesSaved} minutes`;
	interruptionsCounterE.innerHTML = taskObject.interruptionCounter.toString();
	let currentSessionCounter = 0;
	let isPauseDisabled = true;
	let [seconds, elapsedMinutes, elapsedHours] = [0, 0, 0];
	let counter = null;

	// Check if pause button should be disabled
	disablePause(isPauseDisabled);
	// https://www.foolishdeveloper.com/2021/10/simple-stopwatch-using-javascript.html

	// Button event listeners
	startButton.addEventListener("click", () => {
		if (counter !== null) {
			clearInterval(counter);
		}
		counter = setInterval(runTimer, 1000);
		// disablePause(isPauseDisabled);
		isRunning = true;
	});

	pauseButton.addEventListener("click", () => {
		if (isRunning) {
			clearInterval(counter);
			taskObject.interruptionCounter++;
			interruptionsCounterE.innerHTML =
				taskObject.interruptionCounter.toString();

			// Need to update local storage
			// Update interruption counter
			editTaskInStorage(
				taskObject.id,
				"interruptionCounter",
				taskObject.interruptionCounter
			);

			currentSessionCounter = 0;

			isPauseDisabled = true;
			disablePause(isPauseDisabled);
			isRunning = false;
		}

		// console.log(interruptionCounter);
	});

	endSession.addEventListener("click", () => {});

	const runTimer = () => {
		seconds++;
		currentSessionCounter++;
		disablePause(isPauseDisabled);
		// Checking when to enable to pause button

		// 600 = 10 mins
		if (currentSessionCounter == 20) {
			isPauseDisabled = false;
			disablePause(isPauseDisabled);
		}

		if (seconds == 60) {
			seconds = 0;
			elapsedMinutes++;
			if (elapsedMinutes == 60) {
				elapsedMinutes = 0;
				elapsedHours++;
			}
		}

		// Created representative strings
		// let h = elapsedHours < 10 ? "0" + elapsedHours : elapsedHours;
		let m = elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes;

		elapsedDurationE.innerHTML = `${elapsedHours} hrs ${m} minutes`;
		// Update elapsed duration
		editTaskInStorage(taskObject.id, "elapsedHoursSaved", elapsedHours);
		editTaskInStorage(taskObject.id, "elapsedMinutesSaved", elapsedMinutes);
		editTaskInStorage(taskObject.id, "elapsedSecondsSaved", seconds);

		// Now I need to check if task is either in progress or finished or new
		editTaskInStorage(taskObject.id, "taskStatus", "In progress");
		// console.log(seconds);
	};
};

const editTaskInStorage = (key, field, newValue) => {
	const tempKey = "Task: " + key.toString();

	if (tempKey in localStorage) {
		let task = JSON.parse(localStorage.getItem(tempKey));
		if (field in task) {
			task[field] = newValue;
			// Set the new value
			localStorage.setItem(tempKey, JSON.stringify(task));
			// console.log(task);
		} else {
			console.log("Field does not exist in task");
		}
	} else {
		console.log("Task not found in edit task in storage");
	}
};

const disablePause = (isPausedDisabled) => {
	if (isPausedDisabled == true) {
		pauseButton.disabled = true;
		pauseButton.classList.add("disabledButton");
		console.log("Pause is disabled");
	} else {
		pauseButton.disabled = false;
		pauseButton.classList.remove("disabledButton");
		console.log("Button is enabled");
	}
};
