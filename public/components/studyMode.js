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
	let [seconds, elapsedMinutes, elapsedHours] = [0, 0, 0];
	let counter = null;

	// https://www.foolishdeveloper.com/2021/10/simple-stopwatch-using-javascript.html
	startButton.addEventListener("click", () => {
		if (counter !== null) {
			clearInterval(counter);
		}
		counter = setInterval(runTimer, 1000);
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

			isRunning = false;
		}

		// console.log(interruptionCounter);
	});

	const runTimer = () => {
		seconds++;
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
		console.log(seconds);
	};
};
