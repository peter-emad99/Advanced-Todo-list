import Storage from "./modules/Storage.js";
import List from "./modules/List.js";
// import Sortable from "../../node_modules/sortablejs/modular/sortable.esm.js";
// import Sortable from "sortablejs";
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

/* ----------------------------------- dnd ---------------------------------- */

let sortablelists = document.querySelectorAll(".tasks");
sortablelists.forEach((list) => {
	let sortable = Sortable.create(list, {
		group: {
			name: "sortableLists",
			// pull: "clone",
			// revertClone: true,
		},

		// sort: true, // sorting inside list
		// delay: 100, // time in milliseconds to define when the sorting should start
		// delayOnTouchOnly: false, // only delay if user is using touch
		// touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
		// disabled: true, // Disables the sortable if set to true.
		// store: {
		// 	/**
		// 	 * Get the order of elements. Called once during initialization.
		// 	 * @param   {Sortable}  sortable
		// 	 * @returns {Array}
		// 	 */
		// 	get: function (sortable) {
		// 		var order = localStorage.getItem(sortable.options.group.name);
		// 		return order ? order.split("|") : [];
		// 	},

		// 	/**
		// 	 * Save the order of elements. Called onEnd (when the item is dropped).
		// 	 * @param {Sortable}  sortable
		// 	 */
		// 	set: function (sortable) {
		// 		var order = sortable.toArray();
		// 		localStorage.setItem(sortable.options.group.name, order.join("|"));
		// 	},
		// }, // @see Store
		animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
		// easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
		handle: ".handle", // Drag handle selector within list items
		// filter: ".remove_task_btn", // Selectors that do not lead to dragging (String or Function)
		// preventOnFilter: false, // Call `event.preventDefault()` when triggered `filter`
		// draggable: ".task", // Specifies which items inside the element should be draggable

		dataIdAttr: "data-id", // HTML attribute that is used by the `toArray()` method

		ghostClass: "ghost", // Class name for the drop placeholder
		chosenClass: "chosen", // Class name for the chosen item
		dragClass: "drag", // Class name for the dragging item

		// swapThreshold: 1, // Threshold of the swap zone
		// invertSwap: false, // Will always use inverted swap zone if set to true
		// invertedSwapThreshold: 1, // Threshold of the inverted swap zone (will be set to swapThreshold value by default)
		// direction: "horizontal", // Direction of Sortable (will be detected automatically if not given)

		// forceFallback: false, // ignore the HTML5 DnD behaviour and force the fallback to kick in

		// fallbackClass: "sortable-fallback", // Class name for the cloned DOM Element when using forceFallback
		// fallbackOnBody: false, // Appends the cloned DOM Element into the Document's Body
		// fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.

		// dragoverBubble: true,
		// removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
		// emptyInsertThreshold: 5, // px, distance mouse must be from empty sortable to insert drag element into it
	});
	// var order = sortable.toArray();
	// sortable.sort(order.reverse(), true); // apply
});
