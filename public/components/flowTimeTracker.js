import * as Navigation from "./navigation";

const studyModeContainer = document.getElementById("studyMode");
const taskViewer = document.getElementById("taskViewer");
const tracker = document.getElementById("flowTimeTracker");

// Getting the table element
const table = document.getElementById("trackerTable");

export const openTracker = () => {
	Navigation.navigateToPage(taskViewer, tracker, "notFlex");
	studyModeContainer.style.display = "none";
	for (const key in localStorage) {
		getAndRenderAnalytics(key);
	}
};

// Gets all items in the array with tag of completed and returns an array
const getAndRenderAnalytics = (key) => {
	if (key.slice(0, 5) === "Task:") {
		let task = JSON.parse(localStorage.getItem(key));
		if (task.taskStatus === "Completed") {
			renderTableRow(task);
		}
	}
};
const calcFlowEff = (totalElapsedDuration, totalBreakDuration) => {
	return Math.round(
		(totalElapsedDuration / (totalElapsedDuration + totalBreakDuration)) * 100
	);
};

const convertToSeconds = (hours, minutes, seconds) => {
	let temp = 0;
	temp += hours * 3600;
	temp += minutes * 60;
	temp += seconds;
	console.log(temp);
	return temp;
};

const renderTableRow = (task) => {
	// Code to calculate the flow efficiency
	// To get the flow efficiency we need to convert everything back into seconds
	let elapsedDurationS = convertToSeconds(
		task.elapsedHoursSaved,
		task.elapsedMinutesSaved,
		task.elapsedSecondsSaved
	);
	let totalBreakDurationS = convertToSeconds(
		task.totalBreakHours,
		task.totalBreakMinutes,
		task.totalBreakSeconds
	);

	let flowEff;
	if (elapsedDurationS > 10) {
		flowEff = calcFlowEff(elapsedDurationS, totalBreakDurationS);
	} else {
		console.log("elapsed duration is 0");
		flowEff = 0;
	}
	console.log(flowEff);
	const tableRow = document.createElement("tr");
	tableRow.innerHTML = `
		<td data-label="Task">${task.taskName}</td>
		<td data-label="Created Date">${task.createdDate}</td>
		<td data-label="Completed Date">${task.completedDate}</td>
		<td data-label="Turnaround">${task.turnAround}</td>
		<td data-label="Subject">${task.subject}</td>
		<td data-label="Total Duration">${produceTimeString(
			task.elapsedSecondsSaved,
			task.elapsedMinutesSaved,
			task.elapsedHoursSaved
		)}</td>
		<td data-label="Break Counter">${task.interruptionCounter}</td>
		<td data-label="Total Break Duration">${produceTimeString(
			task.totalBreakSeconds,
			task.totalBreakMinutes,
			task.totalBreakHours
		)}</td>
		<td data-label="Flow Efficiency" class="flowEff">${flowEff}%</td>
	`;

	table.appendChild(tableRow);
};

const produceTimeString = (seconds, minutes, hours) => {
	let elapsedM = minutes < 10 ? "0" + minutes : minutes;
	let elapsedS = seconds < 10 ? "0" + seconds : seconds;

	return `${hours}:${elapsedM}:${elapsedS}`;
};

window.onload = (e) => {
	e.preventDefault();
	for (const key in localStorage) {
		getAndRenderAnalytics(key);
	}
};
