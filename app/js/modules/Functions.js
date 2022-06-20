export { selectText, dragStart, drag, dragEnd, dragEnter, dragLeave, dragOver, drop };
import Storage from "./Storage.js";
function selectText(element) {
	document.activeElement.blur();
	element.focus();
	window.r;
	var sel, range;
	var el = element; //get element id
	if (window.getSelection && document.createRange) {
		//Browser compatibility
		sel = window.getSelection();
		sel.removeAllRanges(); //remove all ranges from selection
		if (sel.toString() == "") {
			//no text selection
			window.setTimeout(function () {
				range = document.createRange(); //range object
				range.selectNodeContents(el); //sets Range
				sel.removeAllRanges();
				sel.addRange(range); //add Range to a Selection.
			}, 1);
		}
	}
}

/* -------------------------------- dragStart ------------------------------- */
/**@param {DragEvent} e */
function dragStart(e) {
	if (e.target.nodeType !== 1) {
		e.preventDefault();
		return;
	}
	e.currentTarget.classList.add("dragging");
	e.dataTransfer.setData("itemID", e.currentTarget.dataset.id);
	e.dataTransfer.setData("listID", e.currentTarget.closest(".list").dataset.id);
}
/* ---------------------------------- drag ---------------------------------- */
/**@param {DragEvent} e */
function drag(e) {}
/* --------------------------------- dragEnd -------------------------------- */
/**@param {DragEvent} e */
function dragEnd(e) {}
/* --------------------------------- dragEnter -------------------------------- */
/**@param {DragEvent} e */
function dragEnter(e) {
	e.preventDefault();
}
/* --------------------------------- dragOver -------------------------------- */
let afterElement;
/**@param {DragEvent} e */
function dragOver(e) {
	e.preventDefault();
	let newList = document.querySelector(`[data-id="${e.target.closest(".list").dataset.id}"]`);
	const tasks = newList.querySelector(".tasks");
	const draggable = document.querySelector(".dragging");
	afterElement = getDragAfterElement(tasks, e.clientY);

	if (!draggable) {
		return;
	}
	if (afterElement == (null || undefined)) {
		tasks.appendChild(draggable);
		// afterElement = "lastElement"
	} else {
		// document.querySelector(`[data-after="true"]`).removeAttribute("data-after");
		// afterElement.before(draggable);

		tasks.insertBefore(draggable, afterElement);
	}
	// console.log(afterElement);
	// e.dataTransfer.setData("itemAfterID", afterElement.dataset.id);
}
/* --------------------------------- dragLeave -------------------------------- */
/**@param {DragEvent} e */
function dragLeave(e) {}
/* --------------------------------- drop -------------------------------- */
/**@param {DragEvent} e */
function drop(e) {
	let newList = document.querySelector(`[data-id="${e.target.closest(".list").dataset.id}"]`);
	let oldList = document.querySelector(`[data-id="${e.dataTransfer.getData("listID")}"]`);
	let item = document.querySelector(`[data-id="${e.dataTransfer.getData("itemID")}"]`);
	Storage.updateItemPosition({ newList, oldList, item, afterElement });
	document.querySelector(".dragging").classList.remove("dragging");
}
/* -------------- get the element that is after the currently dragged element ------------ */
function getDragAfterElement(container, y) {
	const draggableElements = [...container.querySelectorAll(".task:not(.dragging)")];

	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - (box.top + box.height / 2);
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
}
