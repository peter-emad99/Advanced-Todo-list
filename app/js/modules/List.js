import { selectText } from "./Functions.js";
import Item from "./Item.js";
import Storage from "./Storage.js";

export default class List {
	/**@type {HTMLElement}  title*/
	title;
	listItems;
	addItemBtn;
	removeListBtn;
	constructor(title, id) {
		this.titleContent = title ?? "New List";
		this.id = id ?? Math.floor(Math.random() * 1000);
	}
	addListGeneral() {
		const list = document.querySelector(".listTemp").content.cloneNode(true);
		this.title = list.querySelector(".list__title");
		this.title.textContent = this.titleContent;
		this.title.addEventListener("blur", this.handleBlur.bind(this));
		this.title.addEventListener("keypress", (e) => {
			// console.log(e.key);
			if (e.key === "Enter") {
				e.currentTarget.blur();
				window.getSelection().removeAllRanges();
			}
		});
		this.listItems = list.querySelector(".tasks");
		this.addItemBtn = list.querySelector(".add_task_btn");
		this.addItemBtn.addEventListener("click", this.appendItem.bind(this));
		this.removeListBtn = list.querySelector(".remove_list_btn");
		this.removeListBtn.addEventListener("click", this.removeList.bind(this));
		const listsGroup = document.querySelector(".lists_group");
		listsGroup.appendChild(list);
	}
	addList() {
		this.addListGeneral();
		selectText(this.title);
	}
	addListFromStoarge() {
		this.addListGeneral();
	}
	handleBlur(e) {
		if (this.title.textContent !== this.titleContent) {
			this.title.textContent = this.title.textContent.trim();
			this.titleContent = this.title.textContent;
			Storage.updateList(this.id, this.titleContent);
		}
	}
	appendItem() {
		let item = new Item();
		let newItem = item.addItem();
		this.listItems.appendChild(newItem);
		Storage.setItem(this.id, item.itemTitleContent, item.id);
		selectText(item.itemTitle);
	}
	appendItemFromStorage(itemContent, itemId) {
		let item = new Item(itemContent, itemId);
		let newItem = item.addItem();
		this.listItems.appendChild(newItem);
	}
	removeList(e) {
		let list = e.currentTarget.closest(".list");
		Storage.removeList(this.id);
		list.remove();
	}
}

{
	/* <template class="listTemp">
	<div class="list">
		<div class="list__header">
			<h2 class="list__title" onclick="makeEditable(event)" onblur="handleBlur(event)">
				list 1
			</h2>
		</div>
		<div class="tasks"></div>
		<div class="list__footer">
			<button role="button" class="add_task_btn">
				+ Add New card
			</button>
			<button
				role="button"
				title="Remove this list"
				aria-label="Remove this list"
				class="remove_list_btn"
			>
				<svg
					width="14"
					height="18"
					viewBox="0 0 14 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path />
				</svg>
			</button>
		</div>
	</div>
</template>; */
}
