import * as Navigation from "./navigation";

const studyModeContainer = document.getElementById("studyMode");
const taskViewer = document.getElementById("taskViewer");
const tracker = document.getElementById("flowTimeTracker");

// Getting the table element
const table = document.getElementById("trackerTable");

export const openTracker = () => {
	Navigation.navigateToPage(taskViewer, tracker);
	studyModeContainer.style.display = "none";
	let allTasks = getAllCompletedItems();
	allTasks.forEach((task) => {
		renderTableRow(task);
		console.log(task);
	});
};

// Gets all items in the array with tag of completed and returns an array
const getAllCompletedItems = () => {
	let completedTaskArray = [];

	for (const key in localStorage) {
		if (key.slice(0, 5) === "Task:") {
			let task = JSON.parse(localStorage.getItem(key));

			if (task.taskStatus === "Completed") {
				// console.log(task);
				completedTaskArray.push(task);
			}
		}
	}
	return completedTaskArray;
};

const renderTableRow = (task) => {
	const tableRow = document.createElement("tr");
	tableRow.innerHTML = `
		<td>${task.createdDate}</td>
		<td>${task.completedDate}</td>
		<td>${task.turnAround}</td>
		<td>${task.taskName}</td>
		<td>${task.subject}</td>
		<td>${task.elapsedHoursSaved} hrs ${task.elapsedMinutesSaved} mins</td>
		<td>${task.interruptionCounter}</td>
		<td>${task.difficulty}</td>
		<td class="flowEff">72%</td>
	`;

	table.appendChild(tableRow);
};
