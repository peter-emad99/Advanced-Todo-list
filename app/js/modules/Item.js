export default class Item {
	item;
	removeItemBtn;
	itemContent = "new task";
	id = Math.floor(Math.random() * 10000);

	constructor(content, id) {
		this.itemContent = content;
		this.id = id;
	}
	addItem() {
		const newItem = document.querySelector(".taskTemp").content.cloneNode(true);
		this.item = newItem.querySelector(".task__content");
		this.item.innerHtml = this.itemContent;
		this.removeItemBtn = newItem.querySelector(".remove_task_btn");
		this.removeItemBtn.addEventListener("click", this.removeItem.bind(this));

		return newItem;
	}
	removeItem(e) {
		e.currentTarget.parentElement.remove();
	}
}

{
	/* <template class="taskTemp">
	<div class="task">
		<h3 class="task__content"></h3>
		<button
			role="button"
			title="Remove this card"
			aria-label="Remove this card"
			class="remove_task_btn"
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
</template>; */
}
