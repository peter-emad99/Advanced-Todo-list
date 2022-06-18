export { selectText };
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
