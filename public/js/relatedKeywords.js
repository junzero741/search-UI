function RelatedKeywords () {
    this.ul = document.querySelector(".pop_rel_keywords");
    this.searchInput = document.querySelector(".search_input");
    this.relContainer = document.querySelector(".rel_search");
    this.popularSearch = document.querySelector(".popular_search");
    this.cache = '';
    this.checkInput();
}

RelatedKeywords.prototype.checkInput = function() {
        const beforeInput = this.searchInput.value;
        this.timer(beforeInput);
}


RelatedKeywords.prototype.timer = function(beforeInput) {
    setTimeout(() => {
        if(this.searchInput.value === beforeInput && this.searchInput.value !== "") {
          console.log("입력멈춤");
          this.loadData(this.searchInput.value);
          this.checkInput();
          
        } else {
          console.log("입력변함 혹은 입력비어있음");
          this.checkInput();
        }

        if(this.searchInput.value === "") {
            this.relContainer.classList.add("hide");
 
          } else {
            this.relContainer.classList.remove("hide");
          }
    
      }, 500);
}




RelatedKeywords.prototype.loadData =function(input) {
    const url = `https://completion.amazon.com/api/2017/suggestions?session-id=135-3077052-6015425&customer-id=&request-id=DMRETXPQ3PZJQ5TKYSWX&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=undefined&prefix=${input}&event=onFocusWithSearchTerm&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615280967091`;
    
    if(this.cache === url) return;
    else {
        this.cache = url;
        fetch(url)
        .then((res) => res.json())
        .then((res) => this.fillSearch(res.suggestions));
    }
}


RelatedKeywords.prototype.fillSearch = function (suggestArr) {
    this.ul.innerHTML = "";
    suggestArr.forEach((el) => {
      const li = document.createElement("li");
      li.innerHTML = el.value;
      this.ul.appendChild(li);
    }) 
}

export {RelatedKeywords};