import Storage from "./modules/Storage.js";
import List from "./modules/List.js";

/* ------------------------------- Add list btn ------------------------------- */
const addListBtn = document.querySelector(".add_list_btn");
addListBtn.addEventListener("click", handleAddList);
function handleAddList() {
	let id = Math.floor(Math.random() * 10000);
	let list = new List("New List", id);

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
/* -------------------------------- update UI ------------------------------- */
(function () {
	let lists = Storage.read("lists");

	lists.forEach(({ title, id, items }) => {
		let list = new List(title, id);
		list.addListFromStoarge();
		items.forEach((item) => {
			list.appendItemFromStorage(item.content, item.id);
		});
	});
})();
