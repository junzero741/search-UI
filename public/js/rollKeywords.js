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
  let move = 0;
  const SHOW_TIME = 2000;
  const ROLL_SPACE = 30;
  const ROLL_END = -330;
  const roll = () => {
    setTimeout(() => {
      this.ol.style.transition = `top 0.3s`;
      this.ol.style.top = `${move}px`;
      if (move > ROLL_END) {
        move -= ROLL_SPACE;
      } else {
        this.ol.style.transition = `top 0s`;
        move = 0;
        this.ol.style.top = `${move}px`;
      }
      roll();
    }, SHOW_TIME);
  };
  roll();
};

export { RollingKeyword };
