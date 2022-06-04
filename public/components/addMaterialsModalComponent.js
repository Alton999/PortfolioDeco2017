let addMaterialModal = document.getElementById("addMaterialForm");
let addMaterialModalButton = document.getElementById("addMaterial");

let closeBtn = document.getElementsByClassName("close")[0];

addMaterialModalButton.onclick = () => {
	addMaterialModal.style.display = "block";
};

closeBtn.onclick = () => {
	addMaterialModal.style.display = "none";
};

window.onclick = (e) => {
	if (e.target === addMaterialModal) {
		addMaterialModal.style.display = "none";
	}
};
