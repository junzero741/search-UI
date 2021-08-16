import { TOP_TEN_KEYWORDS } from '../data/consts.js';

function RollingKeyword() {
  this.ol = document.querySelector('.list_roll_keywords');
  this.keywordList = TOP_TEN_KEYWORDS;
  this.addList();
  this.rolling();
}

RollingKeyword.prototype.addList = function () {
  this.keywordList.forEach((keyword) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="num_rank">${keyword.rank}</span> &nbsp; ${keyword.name}`;
    this.ol.appendChild(li);
  });
};

RollingKeyword.prototype.rolling = function () {
  let posY = 0;

  const MOVE_CLASS = 'move';
  const SHOW_TIME = 2000;
  const ROLL_SPACE = 30;
  const rollEnd = -ROLL_SPACE * this.keywordList.length;

  const roll = () => {
    setTimeout(() => {
      this.ol.classList.contains(MOVE_CLASS) || this.ol.classList.add(MOVE_CLASS);
      this.ol.style.top = `${posY}px`;
      if (posY > rollEnd) {
        posY -= ROLL_SPACE;
      } else {
        this.ol.classList.remove(MOVE_CLASS);
        posY = 0;
        this.ol.style.top = `${posY}px`;
      }
      roll();
    }, SHOW_TIME);
  };

  roll();
};

export { RollingKeyword };
