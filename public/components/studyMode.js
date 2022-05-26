import * as Navigation from "./navigation";

const studyModeContainer = document.getElementById("studyMode");
const taskViewer = document.getElementById("taskViewer");

let taskNameDOM = document.getElementById("taskNameDOM");
let subjectE = document.getElementById("subjectE");
let difficultyTextE = document.getElementById("difficultyStudy");
let elapsedDurationE = document.getElementById("elapsedDuration");
let estimatedDurationE = document.getElementById("estimatedDuration");
let interruptionsCounterE = document.getElementById("interruptionsCounter");

export const openStudyMode = (taskObject) => {
	Navigation.navigateToPage(taskViewer, studyModeContainer);

	renderInfo(taskObject);
};

const renderInfo = (taskObject) => {
	// Initialise and gather the values from task object
	let taskNameValue = taskObject.taskName;
	let subjectValue = taskObject.subject;
	let difficultyValue = taskObject.difficulty;
	let estimatedDuration = taskObject.estimatedDuration;

	let elapsedDuration = 0;
	let interruptionsCounter = 0;

	// Manipulate the DOM to display the current task
	taskNameDOM.innerHTML = taskNameValue;
	subjectE.innerHTML = subjectValue;
	difficultyTextE.innerHTML = difficultyValue;
	estimatedDurationE.innerHTML = estimatedDuration;
	elapsedDurationE.innerHTML = elapsedDuration.toString();
	interruptionsCounterE.innerHTML = interruptionsCounter.toString();
	// console.log(taskName);
	console.log(taskObject);
};
