// Modal components for add Task
let addTaskModal = document.getElementById("addTaskForm");
let addTaskModalOpen = document.getElementById("openNewTaskButton");

let closeBtn = document.getElementsByClassName("close")[1];

addTaskModalOpen.onclick = () => {
	addTaskModal.style.display = "block";
};

closeBtn.onclick = () => {
	addTaskModal.style.display = "none";
};

window.onclick = (e) => {
	if (e.target === addTaskModal) {
		addTaskModal.style.display = "none";
	}
};
