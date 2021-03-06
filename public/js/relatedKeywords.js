import { getRelSearchAPI } from "../data/consts.js";

function RelatedKeywords() {
	this.ul = document.querySelector(".pop_rel_keywords");
	this.searchInput = document.querySelector(".search_input");
	this.relContainer = document.querySelector(".rel_search");
	this.popularSearch = document.querySelector(".popular_search");
	this.wrapRoll = document.querySelector(".wrap_roll_keywords");
	this.searchUrlCache = "";
	this.listIdx = 0;
	this.timer;
	this.onEvent();
}

RelatedKeywords.prototype.onEvent = function () {
	this.searchInput.addEventListener("keydown", (e) => {
		this.bindedPrintKey = this.printKey.bind(this);
		this.bindedPrintKey(e);
	});

	// debounce
	this.searchInput.addEventListener("input", (e) => {
		if (this.timer) {
			clearTimeout(this.timer);
		}

		this.timer = setTimeout(() => {
			this.loadData(this.searchInput.value);
		}, 1000);
	});
};

RelatedKeywords.prototype.printKey = function (e) {
	if (e.key === "ArrowDown") {
		console.log(this.listIdx, this.ul.childNodes.length);
		if (this.listIdx === this.ul.childNodes.length) {
			this.listIdx = this.ul.childNodes.length - 1;
			return;
		}

		this.searchInput.value = this.ul.childNodes[this.listIdx].textContent;

		if (this.listIdx === 0) {
			this.ul.childNodes[this.listIdx].classList.add("selected");
		} else {
			this.ul.childNodes[this.listIdx - 1].classList.remove("selected");
			this.ul.childNodes[this.listIdx].classList.add("selected");
		}
		if (this.listIdx < this.ul.childNodes.length - 1) {
			this.listIdx++;
		}
	}

	if (e.key === "ArrowUp") {
		console.log(this.listIdx);
		if (this.listIdx === 0) return;
		if (this.listIdx < 0) this.listIdx = 0;
		this.searchInput.value = this.ul.childNodes[this.listIdx - 1].textContent;
		this.ul.childNodes[this.listIdx - 1].classList.add("selected");
		this.ul.childNodes[this.listIdx].classList.remove("selected");
		this.listIdx--;
	}
};

RelatedKeywords.prototype.showHide = function () {
	if (
		this.searchInput.value === "" ||
		this.searchInput !== document.activeElement
	) {
		this.listIdx = 0;
		this.ul.innerHTML = "";
		this.relContainer.classList.add("hide");
		this.popularSearch.classList.remove("hide");
		if (!this.wrapRoll.classList.contains("hide"))
			this.popularSearch.classList.add("hide");
	} else {
		this.popularSearch.classList.add("hide");
		this.relContainer.classList.remove("hide");
	}
};

RelatedKeywords.prototype.loadData = function (input) {
	const url = getRelSearchAPI(input);

	if (this.searchUrlCache === url) return;

	if (this.cache !== url) {
		fetch(url)
			.then((res) => res.json())
			.then((res) => this.fillSearch(res.suggestions))
			.then((this.cache = url))
			.then(this.showHide());
	}
};

RelatedKeywords.prototype.fillSearch = function (suggestArr) {
	this.ul.innerHTML = "";
	this.listIdx = 0;
	const pattern = this.searchInput.value;
	const re = new RegExp(pattern, "g");

	suggestArr.forEach((el) => {
		const li = document.createElement("li");

		let searchString = el.value;
		let matchArray;
		let resultString = "<pre>";
		let first = 0;
		let last = 0;

		while ((matchArray = re.exec(searchString)) != null) {
			last = matchArray.index;
			resultString += searchString.substring(first, last);
			resultString += "<span class='found'>" + matchArray[0] + "</span>";
			first = re.lastIndex;
		}
		resultString += searchString.substring(first, searchString.length);
		resultString += "</pre>";

		li.innerHTML = "<a>" + resultString + "</a>";
		this.ul.appendChild(li);
	});
};

export { RelatedKeywords };
