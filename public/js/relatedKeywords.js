import { getRelSearchAPI } from '../data/consts.js';

function RelatedKeywords() {
  this.ul = document.querySelector('.pop_rel_keywords');
  this.searchInput = document.querySelector('.search_input');
  this.relContainer = document.querySelector('.rel_search');
  this.popularSearch = document.querySelector('.popular_search');
  this.wrapRoll = document.querySelector('.wrap_roll_keywords');
  this.cache = '';
  this.listIdx = 0;
  this.timeout;
  this.onEvent();
}

RelatedKeywords.prototype.onEvent = function () {
  this.searchInput.addEventListener('keydown', (e) => {
    this.bindedPrintKey = this.printKey.bind(this);
    this.bindedPrintKey(e);
  });
  this.searchInput.addEventListener('input', (e) => {
    if (this.timeout) clearTimeout(this.timeout);

    this.runSearch(this.searchInput.value)
      .then((input) => this.loadData(input))
      .then(this.showHide());
  });
};

RelatedKeywords.prototype.runSearch = function (input) {
  return new Promise((resolve, reject) => {
    this.timeout = setTimeout(() => {
      resolve(input);
    }, 1000);
  });
};

RelatedKeywords.prototype.printKey = function (e) {
  if (e.key === 'ArrowDown') {
    this.searchInput.value = this.ul.childNodes[this.listIdx].textContent;

    if (this.listIdx === 0) {
      this.ul.childNodes[this.listIdx].classList.add('selected');
    } else {
      this.ul.childNodes[this.listIdx - 1].classList.remove('selected');
      this.ul.childNodes[this.listIdx].classList.add('selected');
    }
    this.listIdx++;
    if (this.listIdx > this.ul.childNodes.length) this.listIdx = this.ul.childNodes.length;
  }
  if (e.key === 'ArrowUp') {
    this.searchInput.value = this.ul.childNodes[this.listIdx - 1].textContent;
    this.ul.childNodes[this.listIdx - 1].classList.add('selected');
    this.ul.childNodes[this.listIdx].classList.remove('selected');
    this.listIdx--;
    if (this.listIdx < 0) this.listIdx = 0;
  }
};

RelatedKeywords.prototype.showHide = function () {
  if (this.searchInput.value === '' || this.searchInput !== document.activeElement) {
    this.listIdx = 0;
    this.ul.innerHTML = '';
    this.relContainer.classList.add('hide');
    this.popularSearch.classList.remove('hide');
    if (!this.wrapRoll.classList.contains('hide')) this.popularSearch.classList.add('hide');
  } else {
    this.popularSearch.classList.add('hide');
    this.relContainer.classList.remove('hide');
  }
};

RelatedKeywords.prototype.loadData = function (input) {
  const url = getRelSearchAPI(input);

  if (this.cache === url) return;

  if (this.cache !== url) {
    fetch(url)
      .then((res) => res.json())
      .then((res) => this.fillSearch(res.suggestions))
      .then((this.cache = url));
  }
};

RelatedKeywords.prototype.fillSearch = function (suggestArr) {
  this.ul.innerHTML = '';
  this.listIdx = 0;
  const pattern = this.searchInput.value;
  const re = new RegExp(pattern, 'g');

  suggestArr.forEach((el) => {
    const li = document.createElement('li');

    let searchString = el.value;
    let matchArray;
    let resultString = '<pre>';
    let first = 0;
    let last = 0;

    while ((matchArray = re.exec(searchString)) != null) {
      last = matchArray.index;
      resultString += searchString.substring(first, last);
      resultString += "<span class='found'>" + matchArray[0] + '</span>';
      first = re.lastIndex;
    }
    resultString += searchString.substring(first, searchString.length);
    resultString += '</pre>';

    li.innerHTML = resultString;
    this.ul.appendChild(li);
  });
};

export { RelatedKeywords };
