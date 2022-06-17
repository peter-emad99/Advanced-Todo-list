import Storage from "./modules/Storage.js";
import List from "./modules/List.js";
import item from "./modules/Item.js";

// const lists = [
// 	{
// 		title: "list1",
// 		id: 1,
// 		items: [
// 			{
// 				content: "item1",
// 				id: 1,
// 			},
// 			{
// 				content: "item2",
// 				id: 2,
// 			},
// 		],
// 	},
// 	{
// 		title: "list2",
// 		id: 2,
// 		items: [
// 			{
// 				content: "item3",
// 				id: 1,
// 			},
// 			{
// 				content: "item4",
// 				id: 2,
// 			},
// 		],
// 	},
// ];

// Storage.save(lists);

// const list = document.querySelector(".taskTemp");
// console.log({ list });
// const newlist = list.content.cloneNode(true);
// console.log(newlist);
// const div = document.createElement("div");
// div.appendChild(newlist);
// console.log(div);

// console.log(Storage.read());
// console.log(Storage.getListItems(1));
// Storage.setItem(2, "taks3");
// Storage.setItem(2, "taks4");
// localStorage.clear();
// Storage.updateItem(2, 1, "taks54544");
// Storage.getListItems(2, 1);
// Storage.deleteItem(1);
let allLists = [];
/* ------------------------------- Add list btn ------------------------------- */
const addListBtn = document.querySelector(".add_list_btn");
addListBtn.addEventListener("click", handleAddList);
function handleAddList() {
	let id = Math.floor(Math.random() * 10000);
	let list = new List("List Title", id);
	// console.log(list);
	let listData = {
		title: list.titleContent,
		id: list.id,
		items: [],
	};
	// console.log(listData);
	allLists.push(listData);
	// console.log(lists);
	Storage.save(allLists);
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
		// console.clear();
		allLists = [];
		Storage.removeAllLists();
	} else {
		return;
	}
}
/* -------------------------------- update UI ------------------------------- */
(function () {
	let lists = Storage.read("lists");
	// console.log("🚀 ~ file: script.js ~ line 95 ~ lists", lists);
	allLists = [...lists];
	// console.log("🚀 ~ file: script.js ~ line 98 ~ aLLlists", aLLlists);

	lists.forEach(({ title, id, items }) => {
		let list = new List(title, id);
		list.addList();
		// items.forEach((item) => {
		// 	list.appendItem(item.content, item.id);
		// });
	});
})();
