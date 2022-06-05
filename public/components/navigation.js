let taskViewerToggle = document.getElementById("taskViewerToggle");
let flowTimeTrackerToggle = document.getElementById("flowTimeTrackerToggle");

// Task study mode components
const studyModeContainer = document.getElementById("studyMode");
const tracker = document.getElementById("flowTimeTracker");
const taskViewer = document.getElementById("taskViewer");

import * as Tracker from "./flowTimeTracker";

export const navigateToPage = (currentPage, routedPage, flex) => {
	currentPage.style.display = "none";
	if (flex === "flex") {
		routedPage.style.display = "flex";
	} else {
		routedPage.style.display = "block";
	}
};

taskViewerToggle.addEventListener("click", (e) => {
	e.preventDefault();
	navigateToPage(studyModeContainer, taskViewer, "notFlex");
	tracker.style.display = "none";
	// Change the active state on the buttons

	taskViewerToggle.className += "active";
	flowTimeTrackerToggle.classList.remove("active");

	location.reload();
});

flowTimeTrackerToggle.addEventListener("click", (e) => {
	e.preventDefault();
	if (tracker.style.display === "none") {
		Tracker.openTracker();
		flowTimeTrackerToggle.className += "active";
		taskViewerToggle.classList.remove("active");
	}
});

// Set initially study mode to not appear
studyModeContainer.style.display = "none";

// Set initially for task tracker to not appear
tracker.style.display = "none";
