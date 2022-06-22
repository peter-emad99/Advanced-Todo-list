export {
	selectText,
	dragStart,
	drag,
	dragEnd,
	dragEnter,
	dragLeave,
	dragOver,
	drop,
	dragLeaveItem,
	dragOverItem,
	dragEnterItem,
};
import Storage from "./Storage.js";
function selectText(element) {
	document.activeElement.blur();

	element.focus();
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
	e.dataTransfer.dropEffect = "move";
}
/* ---------------------------------- drag ---------------------------------- */
/**@param {DragEvent} e */
function drag(e) {
	e.currentTarget.classList.add("ghost");
}
/* --------------------------------- dragEnd -------------------------------- */
/**@param {DragEvent} e */
function dragEnd(e) {
	document.querySelector(".dragging").classList.remove("dragging", "ghost", "slide_in");
}
/* --------------------------------- dragEnter -------------------------------- */
/**@param {DragEvent} e */
function dragEnter(e) {
	e.preventDefault();
	// let dragging = document.querySelector(".dragging");
	// if (!dragging.classList.contains("slide_down")) {
	// 	console.log("enter");
	// 	console.log(!dragging.classList.contains("slide_down"));
	// 	dragging.classList.add("slide_down");
	// }
	this.querySelectorAll(".task:not(.dragging)").forEach((item) => {
		item.addEventListener("dragleave", dragLeaveItem);
		item.addEventListener("dragover", dragOverItem);
		item.addEventListener("dragenter", dragEnterItem);
		item.addEventListener("animationend", () => {
			if (item.classList.contains("slide_down")) {
				item.classList.remove("slide_down");
			}
		});
	});
}
/* --------------------------------- dragOver -------------------------------- */
let afterElement;
/**@param {DragEvent} e */
function dragOver(e) {
	e.preventDefault();
	let newList = document.querySelector(`[data-id="${e.target.closest(".list").dataset.id}"]`);
	const tasks = newList.querySelector(".tasks");
	const draggable = document.querySelector(".dragging");
	// if (!draggable.classList.contains("slide_in")) {
	// 	draggable.classList.add("slide_in");
	// }
	afterElement = getDragAfterElement(tasks, e.clientY);

	if (!draggable) {
		return;
	}
	if (afterElement == undefined) {
		tasks.appendChild(draggable);
	} else {
		// afterElement.before(draggable);
		tasks.insertBefore(draggable, afterElement);
	}
}
/* --------------------------------- dragLeave -------------------------------- */
/**@param {DragEvent} e */
function dragLeave(e) {
	// let dragging = document.querySelector(".dragging");
	// console.log(dragging);
	// if (dragging.classList.contains("slide_down")) {
	// 	dragging.classList.remove("slide_down");
	// }
}
/* --------------------------------- drop -------------------------------- */
/**@param {DragEvent} e */
function drop(e) {
	let newList = document.querySelector(`[data-id="${e.target.closest(".list").dataset.id}"]`);
	let oldList = document.querySelector(`[data-id="${e.dataTransfer.getData("listID")}"]`);
	let item = document.querySelector(`[data-id="${e.dataTransfer.getData("itemID")}"]`);
	Storage.updateItemPosition({ newList, oldList, item, afterElement });
	item.classList.add("slide_up");
	// document.querySelector(".dragging").classList.remove("dragging");
	// removeClassAfterAnimation(".slide_up");
	item.addEventListener("animationend", () => {
		item.classList.remove("slide_up");
	});
	this.querySelectorAll(".task").forEach((item) => {
		item.removeEventListener("dragleave", dragLeaveItem);
		item.removeEventListener("dragover", dragOverItem);
		item.removeEventListener("dragenter", dragEnterItem);
	});
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

/* ------------- adding event listner to items to add animation ------------- */

/**@param {DragEvent} e */
function dragOverItem(e) {}

/**@param {DragEvent} e */
function dragEnterItem(e) {}

/**@param {DragEvent} e */
function dragLeaveItem(e) {
	let item = e.currentTarget;

	if (!item.classList.contains("slide_down")) {
		item.classList.add("slide_down");
	}
}
