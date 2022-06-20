import Storage from "./modules/Storage.js";
import List from "./modules/List.js";

/* ------------------------------- Add list btn ------------------------------- */
const addListBtn = document.querySelector(".add_list_btn");
addListBtn.addEventListener("click", handleAddList);
function handleAddList() {
	// let id = Math.floor(Math.random() * 10000);
	let list = new List();
	Storage.addList(list);
	list.addList();
}

/* ------------------------------- Remove list btn ------------------------------- */
const removeAllListsBtn = document.querySelector(".remove_all_lists_btn");
removeAllListsBtn.addEventListener("click", removeAllLists);
function removeAllLists() {
	let sure = window.confirm(
		"Are You sure you want to delete all lists,there is no undo to this action?"
	);
	if (sure) {
		const listsGroup = document.querySelector(".lists_group");
		while (listsGroup.firstChild) {
			listsGroup.firstChild.remove();
		}
		Storage.removeAllLists();
	} else {
		return;
	}
}
/* ------------------------------- add default lists btn ------------------------------- */
const addDefaultListsBtn = document.querySelector(".add_default_lists_btn");
addDefaultListsBtn.addEventListener("click", addDefaultLists);
function addDefaultLists(e) {
	Storage.addDefaultLists();
	updateUI();
}
/* -------------------------------- update UI ------------------------------- */
function updateUI() {
	let lists = Storage.read("lists");

	lists.forEach(({ title, id, items }) => {
		let list = new List(title, id);
		list.addListFromStoarge();
		items.forEach((item) => {
			list.appendItemFromStorage(item.content, item.id);
		});
	});
}
updateUI();

/* -------------------------------------------------------------------------- */
/*                                drag and drop                               */
/* -------------------------------------------------------------------------- */

// const draggableElements = document.querySelectorAll(".task");
// const dropZoneElements = document.querySelectorAll(".tasks");

// /* --------------- adding event listner to draggable elements --------------- */
// draggableElements.forEach(
// 	/**@param {HTMLElement} element */
// 	(element) => {
// 		element.addEventListener("dragstart", dragStart);
// 		element.addEventListener("drag", drag);
// 		element.addEventListener("dragend", dragEnd);
// 	}
// );
// dropZoneElements.forEach(
// 	/**@param {HTMLElement} element */
// 	(element) => {
// 		element.addEventListener("dragenter", dragEnter);
// 		element.addEventListener("dragover", dragOver);
// 		element.addEventListener("dragleave", dragLeave);
// 		element.addEventListener("drop", drop);
// 	}
// );
// /* -------------------------------- dragStart ------------------------------- */
// /**@param {DragEvent} e */
// function dragStart(e) {
// 	if (e.target.nodeType !== 1) {
// 		e.preventDefault();
// 		return;
// 	}
// 	e.currentTarget.classList.add("dragging");
// 	e.dataTransfer.setData("itemID", e.currentTarget.dataset.id);
// 	e.dataTransfer.setData("listID", e.currentTarget.closest(".list").dataset.id);
// }
// /* ---------------------------------- drag ---------------------------------- */
// /**@param {DragEvent} e */
// function drag(e) {}
// /* --------------------------------- dragEnd -------------------------------- */
// /**@param {DragEvent} e */
// function dragEnd(e) {}
// /* --------------------------------- dragEnter -------------------------------- */
// /**@param {DragEvent} e */
// function dragEnter(e) {
// 	e.preventDefault();
// }
// /* --------------------------------- dragOver -------------------------------- */
// let afterElement;
// /**@param {DragEvent} e */
// function dragOver(e) {
// 	e.preventDefault();
// 	let newList = document.querySelector(`[data-id="${e.target.closest(".list").dataset.id}"]`);
// 	const tasks = newList.querySelector(".tasks");
// 	const draggable = document.querySelector(".dragging");
// 	afterElement = getDragAfterElement(tasks, e.clientY);

// 	if (!draggable) {
// 		return;
// 	}
// 	if (afterElement == (null || undefined)) {
// 		tasks.appendChild(draggable);
// 		// afterElement = "lastElement"
// 	} else {
// 		// document.querySelector(`[data-after="true"]`).removeAttribute("data-after");
// 		// afterElement.before(draggable);

// 		tasks.insertBefore(draggable, afterElement);
// 	}
// 	// console.log(afterElement);
// 	// e.dataTransfer.setData("itemAfterID", afterElement.dataset.id);
// }
// /* --------------------------------- dragLeave -------------------------------- */
// /**@param {DragEvent} e */
// function dragLeave(e) {}
// /* --------------------------------- drop -------------------------------- */
// /**@param {DragEvent} e */
// function drop(e) {
// 	let newList = document.querySelector(`[data-id="${e.target.closest(".list").dataset.id}"]`);
// 	let oldList = document.querySelector(`[data-id="${e.dataTransfer.getData("listID")}"]`);
// 	let item = document.querySelector(`[data-id="${e.dataTransfer.getData("itemID")}"]`);
// 	Storage.updateItemPosition({ newList, oldList, item, afterElement });
// 	document.querySelector(".dragging").classList.remove("dragging");
// }
// /* -------------- get the element that is after the currently dragged element ------------ */
// function getDragAfterElement(container, y) {
// 	const draggableElements = [...container.querySelectorAll(".task:not(.dragging)")];

// 	return draggableElements.reduce(
// 		(closest, child) => {
// 			const box = child.getBoundingClientRect();
// 			const offset = y - (box.top + box.height / 2);
// 			if (offset < 0 && offset > closest.offset) {
// 				return { offset: offset, element: child };
// 			} else {
// 				return closest;
// 			}
// 		},
// 		{ offset: Number.NEGATIVE_INFINITY }
// 	).element;
// }
