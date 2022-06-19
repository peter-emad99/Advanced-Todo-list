export default class Storage {
	static addList(list) {
		let listData = {
			title: list.titleContent,
			id: list.id,
			items: [],
		};
		/**  @type {Array} lists*/
		let lists = Storage.read("lists");
		lists.push(listData);
		Storage.save(lists);
	}
	/* ------------------------------- remove list ------------------------------ */
	static removeList(listId) {
		const lists = this.read("lists");
		const list = lists.find((list) => list.id == listId);
		if (list) {
			lists.splice(lists.indexOf(list), 1);
			this.save(lists);
		} else {
			throw new Error("there is no items to delete");
			return false;
		}
	}
	static updateList(listId, newTitle) {
		const lists = this.read("lists");
		const list = lists.find((list) => list.id == listId);
		if (list) {
			list.title = newTitle;
			this.save(lists);
		} else {
			throw new Error("there is no items to delete");
			return false;
		}
	}

	/* --------------------------------- setItem -------------------------------- */
	static setItem(listId, itemContent, itemId) {
		const lists = this.read("lists");
		const list = lists.find((list) => list.id == listId);
		if (!list) {
			throw new Error("there is no list with this id");
			return false;
		}
		let item = {
			content: itemContent,
			id: itemId,
		};
		list.items.push(item);
		this.save(lists);
		return true;
	}
	/* ------------------------------- updateItem ------------------------------- */
	static updateItem(itemId, newItemContent) {
		const lists = this.read("lists");
		let item;
		lists.forEach((list) => {
			item = list.items.find((item) => item.id == itemId);

			if (item) {
				item.content = newItemContent;
				this.save(lists);
			}
		});

		return true;
	}
	/* ------------------------------- deleteItem ------------------------------- */
	static deleteItem(itemId) {
		const lists = this.read("lists");
		let item;
		lists.forEach((list) => {
			item = list.items.find((item) => item.id == itemId);

			if (item) {
				list.items.splice(list.items.indexOf(item), 1);
				this.save(lists);
			}
		});

		return true;
	}
	/* ---------------------------------- Read --------------------------------- */
	static read(key) {
		let savedData = localStorage.getItem(key);
		if (!savedData) {
			this.save(defaultLists);
			savedData = localStorage.getItem(key);
			return JSON.parse(savedData);
		}
		return JSON.parse(savedData);
	}
	/* ---------------------------------- Save --------------------------------- */
	static save(data) {
		let dataToSave = JSON.stringify(data);
		localStorage.setItem("lists", dataToSave);
	}
	/* ---------------------------------- Remove All lists --------------------------------- */
	static removeAllLists() {
		this.save([]);
		// localStorage.removeItem("lists");
	}
	/* ------------------------------ getListItems ------------------------------ */
	static getListItems(listId) {
		const lists = this.read("lists");
		const list = lists.find((list) => list.id == listId);
		if (!list) {
			throw new Error("there is no list with this id");
			return;
		}
		return list.items;
	}
	/* -------------------------------- getItem -------------------------------- */
	static getItem(listId, itemId) {
		const items = this.getListItems(listId);
		const item = items.find((item) => item.id == itemId);
		return item;
	}
}

let defaultLists = [
	{
		title: "to do",
		id: 5167,
		items: [
			{
				content: "task 1",
				id: 4625,
			},
			{
				content: "task 2",
				id: 2672,
			},
		],
	},
	{
		title: "doing",
		id: 8797,
		items: [
			{
				content: "task 1",
				id: 6370,
			},
			{
				content: "task 2",
				id: 5115,
			},
		],
	},
	{
		title: "done",
		id: 7485,
		items: [
			{
				content: "task 1",
				id: 5578,
			},
		],
	},
];
