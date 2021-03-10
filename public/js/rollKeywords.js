function RollingKeyword () {
    this.ol = document.querySelector(".list_roll_keywords");
    this.keywordList = ["미니가습기", "수분크림", "모니터받침대", "블루투스이어폰", "헤어마스크", "연필꽂이", "귀걸이", "샤워타올", "남성벨트", "포스터액자"];
    this.addList(10);
    this.rolling(2000);
}

RollingKeyword.prototype.addList = function(count) {
    for(let i = 0; i < count; i++) {
        const li = document.createElement("li");
        li.innerHTML = `<span class="num_rank">${i+1}</span> &nbsp; ${this.keywordList[i]}`;
        this.ol.appendChild(li);
    }
}

RollingKeyword.prototype.rolling = function(time) {
    let move = 0;
    const rollSpace = 30;
    const rollEnd = -330;
    const roll = () => {
        setTimeout(() => {
            this.ol.style.transition = `all 0.3s`;
            this.ol.style.top = `${move}px`;   
            if(move > rollEnd) {
                move -= rollSpace;
            } else {
                this.ol.style.transition = `all 0s`;
                move = 0;
                this.ol.style.top = `${move}px`;  
            }
            roll();
        }, time); 
    }
    roll();
}

export {RollingKeyword};