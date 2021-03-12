function RelatedKeywords() {
    this.ul = document.querySelector(".pop_rel_keywords");
    this.searchInput = document.querySelector(".search_input");
    this.relContainer = document.querySelector(".rel_search");
    this.popularSearch = document.querySelector(".popular_search");
    this.wrapRoll = document.querySelector(".wrap_roll_keywords");
    this.cache = '';
    this.listIdx = 0;
    this.time;
    this.onEvent();
    this.checkInput();
}



RelatedKeywords.prototype.onEvent = function () {
    this.searchInput.addEventListener("keydown", (e) => {

        this.bindedPrintKey = this.printKey.bind(this)
        this.bindedPrintKey(e);
    });
}

RelatedKeywords.prototype.printKey = function (e) {

    if (this.listIdx > 10) this.listIdx = 10;
    // if (this.listIdx < 0) this.listIdx = 1;

    if (e.key === "ArrowDown") {
        clearTimeout(this.time);
        this.searchInput.value = (this.ul.childNodes[this.listIdx].textContent);

        if (this.listIdx === 0) {
            this.ul.childNodes[this.listIdx].classList.add("selected");
        } else {
            this.ul.childNodes[this.listIdx - 1].classList.remove("selected");
            this.ul.childNodes[this.listIdx].classList.add("selected");
        }
        this.listIdx++;
    } else if (e.key === "ArrowUp") {
        clearTimeout(this.time);
        this.searchInput.value = (this.ul.childNodes[this.listIdx - 1].textContent);
        this.ul.childNodes[this.listIdx - 1].classList.add("selected");
        this.ul.childNodes[this.listIdx].classList.remove("selected");
        this.listIdx--;
    } 
}

RelatedKeywords.prototype.checkInput = function () {
    const beforeInput = this.searchInput.value;
    this.timer(beforeInput);
}


RelatedKeywords.prototype.timer = function (beforeInput) {
    this.time = setTimeout(() => {
        if (this.searchInput.value === beforeInput) {
            console.log("입력멈춤");
            this.loadData(this.searchInput.value);

        } else {
            console.log("입력변함 혹은 입력비어있음");

        }
        this.checkInput();
        this.showHide();
    }, 1000);
}

RelatedKeywords.prototype.showHide = function () {
    if (this.searchInput.value === "" || this.searchInput !== document.activeElement) {
        this.listIdx = 0;
        this.relContainer.classList.add("hide");
        this.popularSearch.classList.remove("hide");
        if (!this.wrapRoll.classList.contains("hide")) this.popularSearch.classList.add("hide");

    } else {
        this.popularSearch.classList.add("hide");
        this.relContainer.classList.remove("hide");
    }
}


RelatedKeywords.prototype.loadData = function (input) {
    const url = `https://completion.amazon.com/api/2017/suggestions?session-id=135-3077052-6015425&customer-id=&request-id=DMRETXPQ3PZJQ5TKYSWX&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=undefined&prefix=${input}&event=onFocusWithSearchTerm&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615280967091`;

    if (this.cache === url) return;

    if (this.cache !== url) {
        fetch(url)
            .then((res) => res.json())
            .then((res) => this.fillSearch(res.suggestions))
            .then(this.cache = url);
    }
}


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

        li.innerHTML = resultString;
        this.ul.appendChild(li);
    })

}

export { RelatedKeywords };