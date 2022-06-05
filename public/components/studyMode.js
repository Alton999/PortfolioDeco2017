import * as Navigation from "./navigation";
import * as Tracker from "./flowTimeTracker";
import "./addMaterialsModalComponent";

const studyModeContainer = document.getElementById("studyMode");
const taskViewer = document.getElementById("taskViewer");
// const tracker = document.getElementById("flowTimeTracker");

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

// Getting the addMaterialsForm element
let materialsForm = document.getElementById("materialForm");
let pdfContainer = document.getElementById("pdfContainer");
let articleContainer = document.getElementById("articleContainer");
let bookContainer = document.getElementById("bookContainer");

export const openStudyMode = (key) => {
	// This function takes in the item key and changes the chosen field with the new value
	let taskObject = JSON.parse(localStorage.getItem(key));
	getAndRenderMaterials(key);
	// Accesses the submit button and adds new study materials to the task.
	materialsForm.addEventListener("submit", (e) => {
		let category = document.getElementById("category").value;
		let materialName = document.getElementById("materialName").value;
		let reference = document.getElementById("materialReference").value;

		let pageRange = null;
		// Check if page range is empty
		if (document.getElementById("pageStart").value !== "") {
			pageRange = `${document.getElementById("pageStart").value} - ${
				document.getElementById("pageEnd").value
			}`;
		}
		let id = `${materialName}:${Date.now()}`;

		e.preventDefault();
		let materialObj = {
			id: id,
			category: category,
			materialName: materialName,
			reference: reference,
			pageRange: pageRange
		};

		let materialsList = taskObject.totalMaterials;
		materialsList.push(materialObj);

		if (materialObj.category === "PDF") {
			console.log("Rendered PDF");
			renderMaterials(materialObj, pdfContainer);
		} else if (materialObj.category === "Article") {
			renderMaterials(materialObj, articleContainer);
		} else if (materialObj.category === "Book") {
			renderMaterials(materialObj, bookContainer);
		}

		// console.log(materialObj);
		// console.log(materialsList);

		editTaskInStorage(taskObject.id, "totalMaterials", materialsList);

		// After pressing the submit button we want to render the elements

		// getAndRenderMaterials(`Task: ${taskObject.id}`);
		materialsForm.reset();
	});

	Navigation.navigateToPage(taskViewer, studyModeContainer, "flex");

	// Create a is running variable to check if its running to disable the pause button
	let isRunning = false;

	// Check and change the colors of the bars

	if (taskObject.difficulty === "Easy") {
		changeDomColor(difficultyTextE, "greenBar");
	} else if (taskObject.difficulty === "Medium") {
		changeDomColor(difficultyTextE, "neutralBar");
	} else if (taskObject.difficulty === "Hard") {
		changeDomColor(difficultyTextE, "redBar");
	}
	checkInterruptionsCounter(taskObject.interruptionCounter);

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
	let isEndDisabled = true;

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
	checkElapsedDuration(
		taskObject.estimatedMinutes,
		taskObject.estimatedHours,
		elapsedMinutes,
		elapsedHours,
		elapsedDurationE
	);

	// Check if pause button should be disabled
	disableButton(isPauseDisabled, pauseButton);
	disableButton(isEndDisabled, endSession);
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
			checkInterruptionsCounter(taskObject.interruptionCounter);
			currentSessionCounter = 0;

			isPauseDisabled = true;
			disableButton(isPauseDisabled, pauseButton);

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
		disableButton(isPauseDisabled, pauseButton);
		disableButton(isEndDisabled, endSession);

		// Checking when to enable to pause button

		// 600 = 10 mins
		if (currentSessionCounter == 20) {
			isPauseDisabled = false;
			isEndDisabled = false;
			disableButton(isPauseDisabled, pauseButton);
			disableButton(isEndDisabled, endSession);
		}

		if (seconds == 60) {
			seconds = 0;
			elapsedMinutes++;
			if (elapsedMinutes == 60) {
				elapsedMinutes = 0;
				elapsedHours++;
			}
		}
		checkElapsedDuration(
			taskObject.estimatedMinutes,
			taskObject.estimatedHours,
			elapsedMinutes,
			elapsedHours,
			elapsedDurationE
		);
		// console.log(
		// 	taskObject.estimatedMinutes,
		// 	taskObject.estimatedHours,
		// 	elapsedMinutes,
		// 	elapsedHours
		// );

		// console.log(differenceInTiming);

		// Created representative strings
		// let h = elapsedHours < 10 ? "0" + elapsedHours : elapsedHours;
		let elapsedM = elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes;
		let elapsedS = seconds < 10 ? "0" + seconds : seconds;

		elapsedDurationE.innerHTML = `${elapsedHours}:${elapsedM}:${elapsedS}`;
		// let m = elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes;
		check;
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

const disableButton = (isButtonDisabled, buttonElement) => {
	if (isButtonDisabled == true) {
		buttonElement.disabled = true;
		buttonElement.classList.add("disabledButton");
		// console.log("Pause is disabled");
	} else {
		buttonElement.disabled = false;
		buttonElement.classList.remove("disabledButton");
		// console.log("Button is enabled");
	}
};
const changeDomColor = (element, className) => {
	element.className = className;
};

// Needs to check whether the interruptions is > 5 > 10 and display color accordingly
const checkInterruptionsCounter = (interruptionCounter) => {
	if (interruptionCounter < 5) {
		changeDomColor(interruptionsCounterE, "greenBar");
	} else if (interruptionCounter >= 5 && interruptionCounter < 10) {
		changeDomColor(interruptionsCounterE, "neutralBar");
	} else if (interruptionCounter >= 10) {
		changeDomColor(interruptionsCounterE, "redBar");
	}
};

// This function compares the estimated duration with the elapsed duration and displays warning colours if the elapsed duration gets too high

const checkElapsedDuration = (
	estimatedM,
	estimatedH,
	elapsedM,
	elapsedH,
	element
) => {
	// console.log(estimatedH, estimatedM, elapsedM, elapsedH);
	let difference;

	let totalEstimatedM = parseInt(estimatedH) * 60 + parseInt(estimatedM);
	let totalElapsedM = elapsedH * 60 + elapsedM;

	difference = totalEstimatedM - totalElapsedM;
	console.log(totalEstimatedM, totalElapsedM);
	console.log(difference);
	if (difference <= 0) {
		changeDomColor(element, "neutralBar");
		// if timing is 20 mins over it will turn red
	} else if (difference <= -20) {
		changeDomColor(element, "redBar");
	}
};

const renderMaterials = (material, renderContainer) => {
	let taskLabel;
	if (material.pageRange !== null) {
		taskLabel = `${material.materialName} <span class="pageRange">p.${material.pageRange}</span>`;
	} else {
		taskLabel = `${material.materialName}`;
	}
	let materialItem = document.createElement("li");
	materialItem.innerHTML = `
			<label for="${material.id}">
				<input id="${material.id}" type="checkbox" class="strikeThrough">
				<span>${taskLabel}</span>	
			</label>
			${
				material.reference !== ""
					? `<a href=${material.reference} target="_blank"><button>Open</button></a>`
					: ""
			}
			
	`;

	renderContainer.appendChild(materialItem);
};

export const getAndRenderMaterials = (key) => {
	if (key.slice(0, 5) === "Task:") {
		let task = JSON.parse(localStorage.getItem(key));
		// console.log(task.totalMaterials);
		task.totalMaterials.forEach((material) => {
			if (material.category === "PDF") {
				console.log("Rendered PDF");
				renderMaterials(material, pdfContainer);
			} else if (material.category === "Article") {
				renderMaterials(material, articleContainer);
			} else if (material.category === "Book") {
				renderMaterials(material, bookContainer);
			}
		});
	}
};
