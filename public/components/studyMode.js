import * as Navigation from "./navigation";
import * as Tracker from "./flowTimeTracker";

const studyModeContainer = document.getElementById("studyMode");
const taskViewer = document.getElementById("taskViewer");
const tracker = document.getElementById("flowTimeTracker");

//  E stands for element
let taskNameDOM = document.getElementById("taskNameDOM");
let subjectE = document.getElementById("subjectE");
let difficultyTextE = document.getElementById("difficultyStudy");

// Timer ref
let elapsedDurationE = document.getElementById("elapsedDuration");

let estimatedDurationE = document.getElementById("estimatedDuration");
let interruptionsCounterE = document.getElementById("interruptionsCounter");
let totalBreakDurationE = document.getElementById("totalBreakDuration");

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

	let elapsedM =
		taskObject.elapsedMinutesSaved < 10
			? "0" + taskObject.elapsedMinutesSaved
			: taskObject.elapsedMinutesSaved;
	let elapsedS =
		taskObject.elapsedSecondsSaved < 10
			? "0" + taskObject.elapsedSecondsSaved
			: taskObject.elapsedSecondsSaved;
	elapsedDurationE.innerHTML = `${taskObject.elapsedHoursSaved}:${elapsedM}:${elapsedS}`;

	interruptionsCounterE.innerHTML = taskObject.interruptionCounter.toString();

	let breakM =
		taskObject.totalBreakMinutes < 10
			? "0" + taskObject.totalBreakMinutes
			: taskObject.totalBreakMinutes;
	let breakS =
		taskObject.totalBreakSeconds < 10
			? "0" + taskObject.totalBreakSeconds
			: taskObject.totalBreakSeconds;

	totalBreakDurationE.innerHTML = `${taskObject.totalBreakHours}:${breakM}:${breakS}`;

	let currentSessionCounter = 0;
	let isPauseDisabled = true;

	let [seconds, elapsedMinutes, elapsedHours] = [
		taskObject.elapsedSecondsSaved,
		taskObject.elapsedMinutesSaved,
		taskObject.elapsedHoursSaved
	];

	let [breakSeconds, breakMinutes, breakHours] = [
		taskObject.totalBreakSeconds,
		taskObject.totalBreakMinutes,
		taskObject.totalBreakHours
	];
	let counter = null;
	let breakCounter = null;

	// Check if pause button should be disabled
	disablePause(isPauseDisabled);
	// https://www.foolishdeveloper.com/2021/10/simple-stopwatch-using-javascript.html

	// Button event listeners
	startButton.addEventListener("click", () => {
		clearInterval(breakCounter);
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
			if (breakCounter !== null) {
				clearInterval(breakCounter);
			}
			breakCounter = setInterval(runPauseTimer, 1000);
			// runPauseTimer();
			isRunning = false;
		}

		// console.log(interruptionCounter);
	});

	endSession.addEventListener("click", () => {
		// If users end session before pressing pause we need to stop the current session
		isRunning = false;
		clearInterval(counter);
		clearInterval(breakCounter);
		// Changes the status of the item when they press finish task
		// We need to save the completed date
		let currentDate = new Date();
		let day = currentDate.getDate().toString();
		let month = (currentDate.getMonth() + 1).toString();
		let year = currentDate.getFullYear().toString();

		let createdDay = taskObject.createdDay;
		let createdMonth = taskObject.createdMonth;
		let createdYear = taskObject.createdYear;

		let calculatedYear = 0;
		let calculatedMonth = 0;
		let calculatedDay = 0;
		let turnaroundTime;
		// Calculate the turnaround
		if (year > createdYear) {
			calculatedYear = year - createdYear;
		}
		if (month > createdMonth) {
			calculatedMonth = month - createdMonth;
		}

		if (day > createdDay) {
			calculatedDay = day - createdDay;
		}
		if (calculatedYear > 0) {
			turnaroundTime = `${calculatedDay}d ${calculatedMonth}m ${calculatedYear}`;
		} else if (calculatedMonth > 0) {
			turnaroundTime = `${calculatedDay}d ${calculatedMonth}m`;
		} else if (calculatedDay >= 0) {
			turnaroundTime = `${calculatedDay}d`;
		}

		let date = `${day}/${month}/${year}`;
		console.log(turnaroundTime);
		editTaskInStorage(taskObject.id, "completedDate", date);
		editTaskInStorage(taskObject.id, "turnAround", turnaroundTime);
		editTaskInStorage(taskObject.id, "taskStatus", "Completed");
		Tracker.openTracker();
	});

	const runPauseTimer = () => {
		breakSeconds++;
		if (breakSeconds == 60) {
			breakSeconds = 0;
			breakMinutes++;
			if (breakMinutes == 60) {
				breakMinutes = 0;
				breakHours++;
			}
		}
		// console.log(breakSeconds, breakMinutes);
		let m = breakMinutes < 10 ? "0" + breakMinutes : breakMinutes;
		let s = breakSeconds < 10 ? "0" + breakSeconds : breakSeconds;

		let currentBreakDuration = `${breakHours}:${m}:${s}`;
		// console.log(currentBreakDuration);
		totalBreakDurationE.innerHTML = currentBreakDuration;

		editTaskInStorage(taskObject.id, "totalBreakMinutes", breakMinutes);
		editTaskInStorage(taskObject.id, "totalBreakHours", breakHours);
		editTaskInStorage(taskObject.id, "totalBreakSeconds", breakSeconds);
	};

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
		let elapsedM = elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes;
		let elapsedS = seconds < 10 ? "0" + seconds : seconds;

		elapsedDurationE.innerHTML = `${elapsedHours}:${elapsedM}:${elapsedS}`;
		// let m = elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes;

		// elapsedDurationE.innerHTML = `${elapsedHours} hrs ${m} minutes ${seconds}`;

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
			console.log(field + "Field does not exist in task");
		}
	} else {
		console.log("Task not found in edit task in storage");
	}
};

const disablePause = (isPausedDisabled) => {
	if (isPausedDisabled == true) {
		pauseButton.disabled = true;
		pauseButton.classList.add("disabledButton");
		// console.log("Pause is disabled");
	} else {
		pauseButton.disabled = false;
		pauseButton.classList.remove("disabledButton");
		// console.log("Button is enabled");
	}
};
