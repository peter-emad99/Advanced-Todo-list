export default class Storage {
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
	/* ------------------------------- remove list ------------------------------ */
	static removeList(listId) {
		const lists = this.read("lists");
		const list = lists.find((list) => list.id == listId);
		if (list) {
			console.log(listId);
			console.log(list);
			console.log(lists.indexOf(list));
			lists.splice(lists.indexOf(list), 1);
			this.save(lists);
		} else {
			throw new Error("there is no items to delete");
			return false;
		}
	}
	/* -------------------------------- getItem -------------------------------- */
	static getItem(listId, itemId) {
		const items = this.getListItems(listId);
		const item = items.find((item) => item.id == itemId);
		return item;
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
	static updateItem(itemId, itemNewContent) {
		const lists = this.read("lists");

		const [item, currentList] = lists.forEach((list) => {
			const item = list.items.find((item) => item.id == itemId);
			return [item, list];
		});

		if (!item) {
			throw new Error("there is no items to update");
			return false;
		}

		item.content = itemNewContent;
		this.save(lists);
		return true;
	}
	/* ------------------------------- deleteItem ------------------------------- */
	static deleteItem(itemId) {
		const lists = this.read("lists");

		lists.forEach((list) => {
			const item = list.items.find((item) => item.id == itemId);
			if (item) {
				console.log(item);
				list.items.splice(list.items.indexOf(item), 1);
			} else {
				throw new Error("there is no items to delete");
				return false;
			}
		});

		this.save(lists);
		return true;
	}
	/* ---------------------------------- Read --------------------------------- */
	static read(key) {
		let savedData = localStorage.getItem(key);
		if (!savedData) {
			throw new Error("no data to return");

			return;
		}
		return JSON.parse(savedData);
	}
	/* ---------------------------------- Save --------------------------------- */
	static save(data) {
		let dataToSave = JSON.stringify(data);
		localStorage.setItem("lists", dataToSave);
	}
	static removeAllLists() {
		localStorage.removeItem("lists");
	}
}
