import { TOP_TEN_KEYWORDS } from '../data/consts.js';

function PopularKeywords() {
  this.searchBox = document.querySelector('.search_box');
  this.wrapRoll = document.querySelector('.wrap_roll_keywords');
  this.searchInput = document.querySelector('.search_input');
  this.popularSearch = document.querySelector('.popular_search');
  this.popRankUlList = document.querySelectorAll('.pop_rank');
  this.relContainer = document.querySelector('.rel_search');
  this.rankItems = TOP_TEN_KEYWORDS;
  this.onEvent();
  this.makeRankList();
}

PopularKeywords.prototype.onEvent = function () {
  let timeout;
  this.searchBox.addEventListener('click', this.activateSearch.bind(this));
  this.searchBox.addEventListener('mouseleave', () => {
    timeout = setTimeout(this.deActivateSearch.bind(this), 500);
  });
  this.searchBox.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
  });
};

PopularKeywords.prototype.hide = function (elem) {
  elem.classList.add('hide');
};

PopularKeywords.prototype.show = function (elem) {
  elem.classList.remove('hide');
};

PopularKeywords.prototype.makeRankList = function () {
  const ITEM_COUNT_1 = 5;
  const ITEM_COUNT_2 = 10;
  for (let i = 0; i < ITEM_COUNT_1; i++) {
    const li = document.createElement('li');
    li.innerHTML = `<a> <strong>${this.rankItems[i].rank}</strong>   ${this.rankItems[i].name}</a>`;
    this.popRankUlList[0].appendChild(li);
  }

  for (let i = 5; i < ITEM_COUNT_2; i++) {
    const li = document.createElement('li');
    li.innerHTML = `<a> <strong>${this.rankItems[i].rank}</strong>   ${this.rankItems[i].name}</a>`;
    this.popRankUlList[1].appendChild(li);
  }
};

PopularKeywords.prototype.activateSearch = function () {
  this.hide(this.wrapRoll);
  this.show(this.searchInput);
  this.show(this.popularSearch);
  this.hide(this.relContainer);
  this.searchInput.focus();
  this.searchBox.style.border = `red solid 1px`;
};

PopularKeywords.prototype.deActivateSearch = function () {
  this.show(this.wrapRoll);
  this.hide(this.searchInput);
  this.hide(this.popularSearch);
  this.hide(this.relContainer);
  this.searchInput.blur();
  this.searchBox.style.border = `#ececec solid 1px`;
};

export { PopularKeywords };
