import * as Navigation from "./navigation";

const studyModeContainer = document.getElementById("studyMode");
const taskViewer = document.getElementById("taskViewer");
const tracker = document.getElementById("flowTimeTracker");

export const openTracker = () => {
	Navigation.navigateToPage(taskViewer, tracker);
	studyModeContainer.style.display = "none";
	let allTasks = getAllCompletedItems();
	allTasks.forEach((task) => {
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

const renderTableRow = () => {};
