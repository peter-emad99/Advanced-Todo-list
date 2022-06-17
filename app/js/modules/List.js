import Item from "./Item.js";
import Storage from "./Storage.js";

export default class List {
	title;
	listItems;
	addItemBtn;
	removeListBtn;
	constructor(title, id) {
		this.titleContent = title;
		this.id = id;
	}
	addList() {
		const list = document.querySelector(".listTemp").content.cloneNode(true);
		this.title = list.querySelector(".list__title");
		this.listItems = list.querySelector(".tasks");
		this.addItemBtn = list.querySelector(".add_task_btn");
		this.removeListBtn = list.querySelector(".remove_list_btn");
		this.title.textContent = this.titleContent;
		this.addItemBtn.addEventListener("click", this.appendItem.bind(this));
		this.removeListBtn.addEventListener("click", this.removeList.bind(this));
		const listsGroup = document.querySelector(".lists_group");
		listsGroup.appendChild(list);
	}
	appendItem(itemContent, itemId) {
		let item = new Item(itemContent, itemId);
		let newItem = item.addItem();
		this.listItems.appendChild(newItem);
		Storage.setItem(this.id, item.itemContent, item.id);
	}
	removeList(e) {
		let list = e.currentTarget.closest(".list");
		// console.log(this.id);
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
