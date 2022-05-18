// Navigation buttons
const studyModeToggle = document.getElementById("studyModeToggle");
const taskViewerToggle = document.getElementById("taskViewerToggle");

// Task study mode
const studyModeContainer = document.getElementById("studyMode");
const taskViewer = document.getElementById("taskViewer");

// Initialise to show kanban board first
studyModeContainer.style.display = "none";
studyModeToggle.addEventListener("click", (e) => {
	e.preventDefault();
	taskViewer.style.display = "none";
	studyModeContainer.style.display = "block";
});

taskViewerToggle.addEventListener("click", (e) => {
	e.preventDefault();
	taskViewer.style.display = "block";
	studyModeContainer.style.display = "none";
});
