import { TOP_TEN_KEYWORDS } from "../data/consts.js";
import { showElement, hideElement } from "./util/toggleElement.js";

function PopularKeywords() {
	this.searchBox = document.querySelector(".search_box");
	this.wrapRoll = document.querySelector(".wrap_roll_keywords");
	this.searchInput = document.querySelector(".search_input");
	this.popularSearch = document.querySelector(".popular_search");
	this.popRankUlList = document.querySelectorAll(".pop_rank");
	this.relContainer = document.querySelector(".rel_search");
	this.rankItems = TOP_TEN_KEYWORDS;
	this.onEvent();
	this.makeRankList();
}

PopularKeywords.prototype.onEvent = function () {
	let searchActivationTimer;
	this.searchBox.addEventListener("click", this.activateSearch.bind(this));
	this.searchBox.addEventListener("mouseleave", () => {
		searchActivationTimer = setTimeout(this.deActivateSearch.bind(this), 500);
	});

	this.searchBox.addEventListener("mouseenter", () => {
		clearTimeout(searchActivationTimer);
	});
};

PopularKeywords.prototype.makeRankList = function () {
	const ITEM_COUNT_1 = 5;
	const ITEM_COUNT_2 = 10;
	for (let i = 0; i < ITEM_COUNT_1; i++) {
		const li = document.createElement("li");
		li.innerHTML = `<a> <strong>${this.rankItems[i].rank}</strong>   ${this.rankItems[i].name}</a>`;
		this.popRankUlList[0].appendChild(li);
	}

	for (let i = 5; i < ITEM_COUNT_2; i++) {
		const li = document.createElement("li");
		li.innerHTML = `<a> <strong>${this.rankItems[i].rank}</strong>   ${this.rankItems[i].name}</a>`;
		this.popRankUlList[1].appendChild(li);
	}
};

PopularKeywords.prototype.activateSearch = function () {
	hideElement(this.wrapRoll);
	showElement(this.searchInput);
	showElement(this.popularSearch);
	hideElement(this.relContainer);
	this.searchInput.focus();
	this.searchBox.style.border = `red solid 1px`;
};

PopularKeywords.prototype.deActivateSearch = function () {
	showElement(this.wrapRoll);
	hideElement(this.searchInput);
	hideElement(this.popularSearch);
	hideElement(this.relContainer);
	this.searchInput.blur();
	this.searchBox.style.border = `#ececec solid 1px`;
};

export { PopularKeywords };
